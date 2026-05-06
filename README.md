# 🧁 Frosty Fluffs — Artisanal Bakery

A modern, full-stack bakery website built with **Next.js 16**, **Express**, and **Supabase**. Featuring premium animations with GSAP & Framer Motion, user authentication, a shopping cart, and an admin dashboard for managing products and site updates.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Express](https://img.shields.io/badge/Express-5-000?logo=express)
![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Features

### 🛍️ Customer-Facing
- **Animated Homepage** — Hero section with GSAP parallax, floating bakery emojis, count-up stats, and gradient blobs
- **Product Catalog** — Browse cakes, pastries, cookies, breads & beverages with category filtering and search
- **Product Details** — Individual product pages with rich descriptions and imagery
- **Custom Cake Orders** — Submit personalized cake requests with flavor, size, and design preferences
- **Shopping Cart** — Add, update, and remove items with a slide-out cart drawer
- **User Authentication** — Register and sign in with secure JWT-based authentication
- **Announcement Banner** — Dynamic site-wide banner for promotions and offers
- **Our Story** — Brand storytelling page with premium layout
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop

### 🔐 Admin Dashboard (`/admin`)
- **Product Management** — Add, edit, and delete products from the admin interface
- **Site Updates** — Update the global announcement banner in real-time
- **Role-Based Access** — Only users with the `admin` role can access the dashboard

---

## 🏗️ Tech Stack

| Layer       | Technology                                              |
|:------------|:--------------------------------------------------------|
| **Frontend**| Next.js 16 (App Router), React 19, TypeScript           |
| **Styling** | Tailwind CSS 4, Custom Design Tokens                    |
| **Animations** | GSAP, Framer Motion                                 |
| **Backend** | Express 5, Node.js                                      |
| **Database**| Supabase (PostgreSQL)                                   |
| **Auth**    | Supabase Auth + JWT                                     |
| **Fonts**   | Google Fonts (Outfit, Playfair Display, Pacifico, etc.) |

---

## 📁 Project Structure

```
frostyfluffs/
├── backend/                 # Express API server
│   ├── config/              # Supabase client & seed script
│   ├── controllers/         # Route handlers (auth, products, cart, orders, settings)
│   ├── data/                # Local settings storage (settings.json)
│   ├── middleware/          # Auth middleware & error handler
│   ├── routes/              # API route definitions
│   ├── server.js            # Express entry point
│   └── .env                 # Environment variables (not committed)
│
├── bakery-next/             # Next.js frontend
│   ├── public/              # Static assets (images, logos, videos)
│   └── src/
│       ├── app/             # Next.js App Router pages
│       │   ├── about/       # Our Story page
│       │   ├── admin/       # Admin Dashboard (protected)
│       │   ├── customize/   # Custom Cake Orders page
│       │   ├── products/    # Product catalog & detail pages
│       │   ├── globals.css  # Design tokens & utility classes
│       │   ├── layout.tsx   # Root layout with providers
│       │   └── page.tsx     # Homepage
│       ├── components/      # Reusable UI components
│       ├── context/         # React Context (Auth, Cart state)
│       └── services/        # API service layer
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ installed
- A **Supabase** project (free tier works)

### 1. Clone the Repository
```bash
git clone https://github.com/AfreenKhan92/Frostyfluff.git
cd Frostyfluff
```

### 2. Set Up the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Seed the database with sample data:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```

### 3. Set Up the Frontend
```bash
cd bakery-next
npm install
npm run dev
```

### 4. Open the App
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 👤 Default Accounts

| Role    | Email                    | Password     |
|:--------|:-------------------------|:-------------|
| Admin   | admin@frostyfluffs.com   | admin123456  |
| User    | test@frostyfluffs.com    | test123456   |

> These are created automatically when you run `npm run seed`.

---

## 🔌 API Endpoints

| Method   | Endpoint               | Access        | Description                |
|:---------|:-----------------------|:--------------|:---------------------------|
| `POST`   | `/api/auth/register`   | Public        | Register a new user        |
| `POST`   | `/api/auth/login`      | Public        | Login                      |
| `GET`    | `/api/auth/me`         | Protected     | Get current user           |
| `GET`    | `/api/products`        | Public        | List all products          |
| `GET`    | `/api/products/:id`    | Public        | Get product by ID          |
| `POST`   | `/api/products`        | Admin         | Create a product           |
| `PUT`    | `/api/products/:id`    | Admin         | Update a product           |
| `DELETE` | `/api/products/:id`    | Admin         | Delete a product           |
| `GET`    | `/api/cart`            | Protected     | Get user's cart            |
| `POST`   | `/api/cart`            | Protected     | Add item to cart           |
| `PUT`    | `/api/cart/:productId` | Protected     | Update cart item quantity   |
| `DELETE` | `/api/cart/:productId` | Protected     | Remove item from cart      |
| `DELETE` | `/api/cart`            | Protected     | Clear entire cart          |
| `POST`   | `/api/custom-cake`     | Protected     | Submit custom cake order   |
| `GET`    | `/api/settings`        | Public        | Get site settings          |
| `POST`   | `/api/settings`        | Admin         | Update a site setting      |

---

## 🎨 Design System

The project uses a custom Material Design 3-inspired color palette:

| Token              | Color     | Usage                     |
|:-------------------|:----------|:--------------------------|
| `bakery-cream`     | `#FDFBF7` | Background                |
| `bakery-pink`      | `#F8E5E5` | Soft accents              |
| `bakery-rose`      | `#f0c4c4` | Borders & highlights      |
| `bakery-brown`     | `#5C4033` | Primary text & headings   |
| `bakery-gold`      | `#D4AF37` | CTA buttons & accents     |
| `bakery-dark`      | `#2C1E16` | Dark overlays             |
| `primary`          | `#864e5a` | Brand primary             |
| `primary-container`| `#ffb7c5` | Soft primary fills        |

---

## 📜 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

<p align="center">
  Made with 🤍 by <strong>Afreen Khan</strong>
</p>
