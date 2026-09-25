import os
import sys
import torch
import numpy as np
from PIL import Image, ImageFilter, ImageOps
from torchvision import transforms
from torchvision.models.segmentation import deeplabv3_mobilenet_v3_large, DeepLabV3_MobileNet_V3_Large_Weights

print("Initializing Torchvision DeepLabV3 Person Segmentation...")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

weights = DeepLabV3_MobileNet_V3_Large_Weights.DEFAULT
model = deeplabv3_mobilenet_v3_large(weights=weights).to(device)
model.eval()

preprocess = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def remove_background(img: Image.Image) -> Image.Image:
    """Extracts the human subject with clean feathered alpha."""
    rgb_img = img.convert("RGB")
    orig_w, orig_h = rgb_img.size

    # Resize for fast, accurate inference
    max_dim = 1024
    scale = min(max_dim / orig_w, max_dim / orig_h)
    new_w, new_h = int(orig_w * scale), int(orig_h * scale)
    resized_img = rgb_img.resize((new_w, new_h), Image.Resampling.BILINEAR)

    input_tensor = preprocess(resized_img).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(input_tensor)["out"][0]
    
    # Class 15 is 'person' in PASCAL VOC / COCO segmentation
    person_mask = (output.argmax(0) == 15).byte().cpu().numpy()
    
    # Convert mask to full size PIL Image
    mask_img = Image.fromarray((person_mask * 255).astype(np.uint8), mode="L")
    mask_img = mask_img.resize((orig_w, orig_h), Image.Resampling.BILINEAR)
    
    # Smooth edges with slight Gaussian blur
    mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=2))

    # Apply alpha mask
    rgba_img = rgb_img.convert("RGBA")
    rgba_img.putalpha(mask_img)
    return rgba_img

def create_dark_studio_bg(width, height):
    """Creates a high-end dark studio background gradient for black & neon-orange UI."""
    y, x = np.ogrid[:height, :width]
    cx, cy = width / 2.0, height * 0.35
    max_radius = np.sqrt(cx**2 + cy**2)
    dist_from_center = np.sqrt((x - cx)**2 + (y - cy)**2)
    norm_dist = np.clip(dist_from_center / max_radius, 0, 1)

    # Gradient from subtle dark graphite/slate (24, 24, 34) at center to deep pure black (6, 6, 9)
    center_r, center_g, center_b = 26, 26, 36
    edge_r, edge_g, edge_b = 6, 6, 9

    r = (center_r * (1 - norm_dist) + edge_r * norm_dist).astype(np.uint8)
    g = (center_g * (1 - norm_dist) + edge_g * norm_dist).astype(np.uint8)
    b = (center_b * (1 - norm_dist) + edge_b * norm_dist).astype(np.uint8)
    a = np.full((height, width), 255, dtype=np.uint8)

    bg_array = np.dstack((r, g, b, a))
    return Image.fromarray(bg_array, "RGBA")

def process_leader_photo(input_path, output_trans_path, output_studio_path):
    print(f"\nProcessing photo: {input_path}")
    raw_img = Image.open(input_path)
    
    # Remove background
    cutout = remove_background(raw_img)
    cutout.save(output_trans_path, "PNG", optimize=True)
    print(f"  -> Saved transparent cutout: {output_trans_path}")

    # Find bounding box
    bbox = cutout.getbbox()
    if bbox:
        fg = cutout.crop(bbox)
    else:
        fg = cutout

    # Fixed studio frame (width: 800, height: 960 -> 5:6 portrait ratio)
    target_w, target_h = 800, 960
    studio_bg = create_dark_studio_bg(target_w, target_h)

    # Scale foreground to occupy 88-92% height with breathing room
    fg_w, fg_h = fg.size
    scale = min((target_w * 0.90) / fg_w, (target_h * 0.92) / fg_h)
    new_w = int(fg_w * scale)
    new_h = int(fg_h * scale)

    fg_resized = fg.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Center horizontally, align to bottom
    pos_x = (target_w - new_w) // 2
    pos_y = target_h - new_h

    studio_bg.paste(fg_resized, (pos_x, pos_y), fg_resized)

    # Add subtle bottom vignette to seamlessly merge shoulders into dark card bottom
    vignette = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    for i in range(120):
        alpha = int((i / 120.0)**2 * 180)
        y_pos = target_h - 120 + i
        vignette.paste((6, 6, 9, alpha), (0, y_pos, target_w, y_pos + 1))
    
    studio_bg = Image.alpha_composite(studio_bg, vignette)

    # Save studio backdrop JPG
    studio_bg.convert("RGB").save(output_studio_path, "JPEG", quality=95, optimize=True)
    print(f"  -> Saved studio portrait: {output_studio_path}")

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
            out_trans = os.path.join(pub_dir, trans_name)
            out_studio = os.path.join(pub_dir, studio_name)
            process_leader_photo(in_p, out_trans, out_studio)
        else:
            print(f"File not found: {in_p}")

    print("\nAll leader images processed successfully!")

if __name__ == "__main__":
    main()
