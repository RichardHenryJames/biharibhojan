# 🔥 BihariBhojan — biharibhojan.com

> Authentic Bihari food, delivered hot. From coal-roasted **Litti Chokha** to slow-cooked **Champaran Handi Mutton**.

A complete, production-grade full-stack food-delivery website — frontend **and** backend — built with a modern, fully free tech stack.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![Prisma](https://img.shields.io/badge/Prisma-6-2D3748)

---

## ✨ Features

- **Stunning, on-brand design** — warm saffron/chili/masala palette, custom glassmorphism, Framer-Motion animations, steam/float/marquee micro-interactions, fully responsive.
- **Real menu** — 34 authentic Bihari dishes across 6 categories (Litti & Chokha, Bihari Thali, Champaran Special, Street & Snacks, Mithai & Sweets, Sharbat & Drinks), each with region, spice level, ratings, prep time & veg/non-veg markers.
- **Full cart system** — add/update/remove, `localStorage` persistence, animated drawer, free-delivery progress bar, live toast notifications.
- **Complete checkout** — delivery form with validation, COD/UPI payment selection, live order summary, order-success page.
- **Real backend** — REST API (`/api/products`, `/api/categories`, `/api/orders`) backed by a Prisma + **SQL Server / Azure SQL** database. Order totals are **recomputed server-side from trusted DB prices** (never trusts the client).
- **SEO-ready** — metadata, Open Graph, semantic HTML, dynamic favicon.

## 🧱 Tech stack

| Layer | Choice |
|------|--------|
| Framework | **Next.js 14** (App Router, RSC) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** + custom design system |
| Animation | **Framer Motion** |
| Icons | **lucide-react** |
| Database | **Azure SQL Database** (SQL Server) via **Prisma ORM** |
| Local DB | **SQL Server 2022** in Docker (mirrors prod) |
| Hosting | **Azure Container Apps** (scale-to-zero) |

## 🚀 Getting started (local)

```bash
npm install        # install dependencies
npm run db:up      # start local SQL Server (Docker)
npm run setup      # generate Prisma client, push schema & seed 34 dishes
npm run dev        # start dev server → http://localhost:3000
```

### Other scripts

```bash
npm run build      # production build (type-checks everything)
npm run start      # run the production server
npm run db:seed    # re-seed the menu
npm run db:reset   # wipe + recreate + re-seed the database
npm run db:down    # stop the local SQL Server container
```

## 📂 Project structure

```
src/
├─ app/
│  ├─ page.tsx              # Home
│  ├─ menu/                 # Menu (filter / search / sort)
│  ├─ about/                # Our Story
│  ├─ contact/              # Contact + FAQ
│  ├─ checkout/             # Checkout flow
│  ├─ order-success/        # Order confirmation
│  └─ api/                  # products · categories · orders
├─ components/              # Navbar, Footer, ProductCard, CartDrawer, …
├─ context/CartContext.tsx  # cart state + toasts (localStorage-persisted)
├─ data/menu.ts             # canonical Bihari menu (seed source of truth)
└─ lib/                     # prisma client, server data helpers, utils, types
prisma/
├─ schema.prisma            # Category · Product · Order models
└─ seed.ts                  # seed script
```

## ☁️ Deploying to Azure

The whole stack is defined as code in [`infra/main.bicep`](infra/main.bicep) and shipped by one script:

```powershell
az login
npm run azure:deploy        # provisions RG + builds image in-cloud + seeds DB + goes live
```

**What it provisions (cheap + scalable):**

| Resource | SKU | Role |
|---|---|---|
| Azure Container Apps | Consumption, scale-to-zero | Runs Next.js (FE + API) |
| Azure SQL Database | Basic (2 GB) | Data store |
| Azure Container Registry | Basic | Private image registry |
| Log Analytics | Pay-per-GB | Logs & metrics |

The Container App pulls its image from ACR via a **system-assigned managed identity** (no registry passwords), and the DB connection string is injected as a **Container App secret** (never in code). Local dev is unaffected — it keeps using the Docker SQL Server from `.env`.

### Custom domain

After the first deploy, bind `biharibhojan.com` to the Container App and Azure issues a free managed TLS certificate. You add the `A` + `asuid` TXT records (and a `www` CNAME) at your DNS host; Azure validates and secures it.

---

Made with ❤️ in Bihar · **biharibhojan.com**
