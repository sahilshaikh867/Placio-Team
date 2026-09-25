# 🌟 PlacioBridge Technologies LLP — Leadership & Organizational Teams

Official Team & Leadership Showcase page designed to seamlessly integrate with [placiobridge.com](https://placiobridge.com). Built using **React 19**, **TanStack Start**, **Vite**, and **Tailwind CSS**, styled with high-density **Pure Black, Dark Gray, Neon Orange, and Metallic Silver** aesthetics.

[![React](https://img.shields.io/badge/React-19.3-blue?logo=react&logoColor=white)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack%20Start-1.168-orange?logo=tanstack)](https://tanstack.com/start)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🎨 Color Palette & Design System

- **Primary Colors**: Pure Black (`#050507`), Dark Charcoal (`#0c0c10`, `#111116`, `#16161d`).
- **Accent Colors**: High-impact Neon Orange (`#ff5500`, `#ff6600`, `#ff7722`) and Metallic Silver (`#e2e8f0`, `#cbd5e1`, `#94a3b8`).
- **Background**: Dark, strong textural feel with carbon mesh grid and subtle illuminated ambient glows.
- **Typography**: Bold, powerful sans-serif headings with high information density and condensed layout.
- **Layout**: Minimal whitespace, compact technical grids, high contrast, and responsive across all device breakpoints.

---

## 🏛️ Executive Hierarchy & Team Structure

### 👑 1. Core Leadership
- **Rajesh More** — *Founder & Visionary*
- **Pradeep Paygude** — *Co-Founder & Strategic Partner*
- **Dipankar Telgote** — *Co-Founder & Strategic Partner*
- **Sahil Shaikh** — *Chief Executive Officer (CEO)*

---

### 💼 2. C-Suite Executive Leadership
- **Pradeep Paygude** — *Chief Financial Officer (CFO)*
- **Pradeep Paygude** — *Chief Operating Officer (COO)*
- **Sahil Shaikh** — *Chief Technology Officer (CTO)*
- **Rushi Wagh** — *Chief Marketing Officer (CMO)*
- **Sayali Paygude** — *Chief Human Resources Officer (CHRO)*
- **Rajesh More** — *Chief Product Officer (CPO)*

---

### 👥 3. Departmental & Technical Teams (26 Placeholder Roles)

| Department | Executive Leader | Team Size | Designated Functional Roles |
| :--- | :--- | :---: | :--- |
| **Finance & Accounting** | Pradeep Paygude (CFO) | **3 Members** | Financial Analyst, Accounts & Treasury Specialist, Tax & Compliance Associate |
| **Operations & Delivery** | Pradeep Paygude (COO) | **3 Members** | Operations Lead, Process Optimization Specialist, Logistics & Facilities Coordinator |
| **Technology & Engineering** | Sahil Shaikh (CTO) | **10 Members** | Lead Architect, Sr. Backend Engineer, Sr. Frontend Engineer, Full Stack Engineer, Mobile App Developer, DevOps & Cloud Engineer, AI/ML Engineer, Cloud Systems Specialist, QA & Automation Lead, Cybersecurity & Compliance Engineer |
| **Marketing & Growth** | Rushi Wagh (CMO) | **3 Members** | Brand Strategist, Digital Growth Specialist, Content & Media Lead |
| **Human Resources & Talent** | Sayali Paygude (CHRO) | **4 Members** | Talent Acquisition Specialist, HR Operations Lead, Learning & Development Specialist, Employee Engagement Coordinator |
| **Product & Experience** | Rajesh More (CPO) | **3 Members** | Senior Product Manager, Lead UI/UX Designer, Product Analytics Specialist |

---

## 🖼️ How to Add Real Photos

Every card is integrated with the **`ImagePlaceholder`** component in [`src/components/team-page.tsx`](file:///c:/Users/user5/OneDrive/MY%20Drive/OneDrive/Pictures/Placio_B/team-genesis-react-source/team-genesis-react-source/src/components/team-page.tsx).

1. Put your images inside the `public/` directory (e.g. `public/images/rajesh-more.jpg`).
2. Open [`src/components/team-page.tsx`](file:///c:/Users/user5/OneDrive/MY%20Drive/OneDrive/Pictures/Placio_B/team-genesis-react-source/team-genesis-react-source/src/components/team-page.tsx).
3. Set the `photo` property to your image path:
   ```typescript
   {
     id: "founder",
     name: "Rajesh More",
     role: "Founder & Visionary",
     photo: "/images/rajesh-more.jpg", // <-- Set image path here
     ...
   }
   ```
4. The system will automatically render your high-resolution portrait image with smooth hover transitions.

---

## 🚀 Quick Start & Development

```bash
# Install dependencies
pnpm install

# Run local dev server (port 3000)
pnpm run dev -- --port 3000

# Build for production
pnpm run build
```
