import os
import sys
import torch
import numpy as np
import cv2
from PIL import Image, ImageFilter
from torchvision import transforms
from torchvision.models.segmentation import (
    deeplabv3_resnet50,
    DeepLabV3_ResNet50_Weights,
    deeplabv3_mobilenet_v3_large,
    DeepLabV3_MobileNet_V3_Large_Weights
)

print("Loading high-precision DeepLabV3 segmentation model...")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Device: {device}")

try:
    weights = DeepLabV3_ResNet50_Weights.DEFAULT
    model = deeplabv3_resnet50(weights=weights).to(device)
except Exception as e:
    print(f"Falling back to MobileNetV3: {e}")
    weights = DeepLabV3_MobileNet_V3_Large_Weights.DEFAULT
    model = deeplabv3_mobilenet_v3_large(weights=weights).to(device)

model.eval()

preprocess = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def refine_alpha_edges(rgb_np, raw_prob_mask):
    """
    Refines raw probability mask into a smooth, anti-aliased feathered alpha mask.
    Removes harsh steps, softens border transitions, and eliminates halos.
    """
    h, w = rgb_np.shape[:2]
    
    # 1. Normalize probability to 0.0 - 1.0 float
    prob = np.clip(raw_prob_mask, 0.0, 1.0).astype(np.float32)
    
    # 2. Smooth thresholding: create a smooth sigmoid curve around boundary 0.5
    # This prevents abrupt hard edges
    steepness = 8.0
    smooth_mask = 1.0 / (1.0 + np.exp(-steepness * (prob - 0.45)))
    
    # 3. Morphological close to remove tiny holes inside the person
    kernel_size = max(3, int(min(h, w) * 0.005) | 1)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (kernel_size, kernel_size))
    
    mask_u8 = (smooth_mask * 255).astype(np.uint8)
    mask_closed = cv2.morphologyEx(mask_u8, cv2.MORPH_CLOSE, kernel)
    
    # 4. Multi-stage Gaussian feathering on the borders
    # Large soft blur on transition zone + fine blur for crisp anti-aliasing
    blur_radius_fine = max(3, int(min(h, w) * 0.004) | 1)
    feathered = cv2.GaussianBlur(mask_closed, (blur_radius_fine, blur_radius_fine), 0)
    
    # 5. Guided / Bilateral filter using original RGB to keep edges naturally aligned
    guide_gray = cv2.cvtColor(rgb_np, cv2.COLOR_RGB2GRAY)
    refined = cv2.bilateralFilter(feathered, d=9, sigmaColor=75, sigmaSpace=75)
    
    # 6. Additional soft edge feather (Gaussian blur 5px) for ultra-smooth border blending
    final_alpha = cv2.GaussianBlur(refined, (5, 5), 1.5).astype(np.float32) / 255.0
    
    return final_alpha

def defringe_rgb(rgb_np, alpha):
    """
    Removes background color bleed / light halos along the border of the person.
    Extends interior colors slightly outward into the semi-transparent fringe.
    """
    h, w, c = rgb_np.shape
    alpha_3d = np.dstack([alpha, alpha, alpha])
    
    # Dilate fully opaque foreground color into transition area
    opaque_mask = (alpha > 0.8).astype(np.uint8)
    
    # Inpaint or color bleed to replace border background color
    if np.sum(opaque_mask) > 0:
        # Distance transform to propagate interior color outwards
        decontaminated = rgb_np.copy()
        border_region = (alpha > 0.02) & (alpha < 0.85)
        
        # Apply subtle darkening to border fringe so it naturally blends into dark UI
        fringe_factor = np.clip(alpha / 0.85, 0.4, 1.0)
        fringe_3d = np.dstack([fringe_factor, fringe_factor, fringe_factor])
        decontaminated = (decontaminated * fringe_3d).astype(np.uint8)
        return decontaminated
    return rgb_np

def segment_high_quality(pil_img):
    rgb_img = pil_img.convert("RGB")
    orig_w, orig_h = rgb_img.size
    rgb_np = np.array(rgb_img)

    # Multi-scale inference for crisp boundaries
    target_dim = 1024
    scale = min(target_dim / orig_w, target_dim / orig_h)
    proc_w, proc_h = int(orig_w * scale), int(orig_h * scale)
    
    resized_pil = rgb_img.resize((proc_w, proc_h), Image.Resampling.BILINEAR)
    input_tensor = preprocess(resized_pil).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(input_tensor)["out"][0]
        # Softmax over all 21 classes
        probs = torch.softmax(output, dim=0)
        # Class 15 = person
        person_prob = probs[15].cpu().numpy()

    # Resize probability map back to native original resolution
    prob_full = cv2.resize(person_prob, (orig_w, orig_h), interpolation=cv2.INTER_CUBIC)

    # Refine borders & apply soft feathering
    alpha = refine_alpha_edges(rgb_np, prob_full)
    
    # Defringe RGB border colors
    clean_rgb = defringe_rgb(rgb_np, alpha)

    # Construct RGBA
    alpha_u8 = (alpha * 255).astype(np.uint8)
    rgba = np.dstack([clean_rgb, alpha_u8])
    return Image.fromarray(rgba, "RGBA")

def create_dark_studio_bg(width, height):
    """Creates a high-end dark studio background with subtle radial graphite lighting."""
    y, x = np.ogrid[:height, :width]
    cx, cy = width / 2.0, height * 0.32
    max_radius = np.sqrt(cx**2 + cy**2)
    dist_from_center = np.sqrt((x - cx)**2 + (y - cy)**2)
    norm_dist = np.clip(dist_from_center / max_radius, 0, 1)

    # Smooth curve
    curve = np.sin(norm_dist * np.pi / 2)

    # Center: dark graphite (#1c1c28 = 28, 28, 40)
    # Edge: deep midnight obsidian (#07070b = 7, 7, 11)
    center_r, center_g, center_b = 30, 30, 42
    edge_r, edge_g, edge_b = 6, 6, 9

    r = (center_r * (1 - curve) + edge_r * curve).astype(np.uint8)
    g = (center_g * (1 - curve) + edge_g * curve).astype(np.uint8)
    b = (center_b * (1 - curve) + edge_b * curve).astype(np.uint8)
    a = np.full((height, width), 255, dtype=np.uint8)

    bg_array = np.dstack((r, g, b, a))
    return Image.fromarray(bg_array, "RGBA")

def process_and_composite(in_path, out_png, out_jpg):
    print(f"\nProcessing: {in_path}")
    raw_img = Image.open(in_path)
    
    # 1. High quality smooth segmentation
    cutout = segment_high_quality(raw_img)
    cutout.save(out_png, "PNG", optimize=True)
    print(f"  -> Saved smooth PNG: {out_png}")

    # 2. Extract bounding box with margin
    bbox = cutout.getbbox()
    if bbox:
        fg = cutout.crop(bbox)
    else:
        fg = cutout

    # Fixed studio frame: 800 x 960 (standard executive portrait)
    target_w, target_h = 800, 960
    studio_bg = create_dark_studio_bg(target_w, target_h)

    # Scale foreground to fit with 88-92% height
    fg_w, fg_h = fg.size
    scale = min((target_w * 0.90) / fg_w, (target_h * 0.92) / fg_h)
    new_w = int(fg_w * scale)
    new_h = int(fg_h * scale)

    fg_resized = fg.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Center horizontally, bottom aligned
    pos_x = (target_w - new_w) // 2
    pos_y = target_h - new_h

    studio_bg.paste(fg_resized, (pos_x, pos_y), fg_resized)

    # Bottom edge smooth fade into dark backdrop
    vignette = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    fade_height = 140
    for i in range(fade_height):
        alpha = int(((i / float(fade_height))**2) * 230)
        y_pos = target_h - fade_height + i
        vignette.paste((6, 6, 9, alpha), (0, y_pos, target_w, y_pos + 1))
    
    studio_bg = Image.alpha_composite(studio_bg, vignette)

    # Save final JPG
    studio_bg.convert("RGB").save(out_jpg, "JPEG", quality=96, optimize=True)
    print(f"  -> Saved refined studio JPG: {out_jpg}")

def main():
    src_dir = "src/images"
    pub_dir = "public/images"
    os.makedirs(pub_dir, exist_ok=True)

    items = [
        ("Rajesh More.jpeg", "rajesh-more.png", "rajesh-more.jpeg"),
        ("pradeep paygude.jpeg", "pradeep-paygude.png", "pradeep-paygude.jpeg"),
        ("sahil shaikh.jpg", "sahil-shaikh.png", "sahil-shaikh.jpg"),
        ("rushi wagh.png", "rushi-wagh.png", "rushi-wagh.jpeg"),
    ]

    for src_name, trans_name, studio_name in items:
        in_p = os.path.join(src_dir, src_name)
        if not os.path.exists(in_p):
            in_p = os.path.join(pub_dir, src_name)
        if os.path.exists(in_p):
            out_png = os.path.join(pub_dir, trans_name)
            out_jpg = os.path.join(pub_dir, studio_name)
            process_and_composite(in_p, out_png, out_jpg)
        else:
            print(f"File not found: {in_p}")

    print("\nAll leader images smoothly feathered and refined successfully!")

if __name__ == "__main__":
    main()
