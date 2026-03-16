# 🌿 LeafNest – Premium Plant Store

LeafNest is a full-stack ecommerce web application built for buying and selling plants online. It features a clean, modern green-themed UI designed specifically for a plant store — not a generic ecommerce template.

## 🛍️ What It Does

Users can browse 22+ plants across categories like Indoor, Outdoor, Tropical, and Succulents. Each product shows a real plant image, name, price, and an Add to Cart button. The full shopping flow is covered — from browsing to cart, checkout, payment, and order confirmation.

## 💳 Payment

Razorpay test mode is integrated for UPI, card, and netbanking payments. Cash on Delivery and Debit/Credit Card options are also available with full form validation.

## 🔐 Authentication

Users can sign up and log in securely. Passwords are hashed using PHP's `password_hash()`. A PHP/MySQL backend stores user data, orders, and products. localStorage fallback ensures the site works even without a backend running.

## 🛠️ Admin Panel

A protected admin dashboard lets you manage products, view orders, track analytics, and configure settings. Login required with credentials before accessing any admin feature.

## 🌱 Nursery Management

A dedicated nursery management system tracks plant batches, fertilizer schedules, watering logs, inventory, and tasks — useful for the plant seller side of the business.

## ⚙️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP
- **Database:** MySQL via XAMPP
- **Payments:** Razorpay (test mode)
- **Fonts:** Google Fonts – Poppins

## 🚀 Setup

1. Install XAMPP and start Apache + MySQL
2. Copy project to `C:/xampp/htdocs/leafnest/`
3. Import `database/leafnest.sql` in phpMyAdmin
4. Open `http://localhost/leafnest/`

## 🔑 Admin Access

- URL: `admin.html`
- Username: `admin`
- Password: `admin123`

---

> Built as a complete local full-stack project with real-world ecommerce features.
