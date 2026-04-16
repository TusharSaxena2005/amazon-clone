# 🛒 Amazon Clone (Full Stack E-Commerce Web App)

##  Description

This is a full-stack e-commerce web application inspired by Amazon's UI and functionality.
It allows users to browse products, add items to cart, manage wishlist, and place orders.

---

##  Tech Stack

### Frontend

* React.js
* CSS (Amazon-like UI)
* Axios

### Backend

* Node.js
* Express.js

### Database

* MySQL

---

##  Features

###  Product Listing Page

* Grid layout similar to Amazon
* Product cards with image, name, and price
* Search functionality
* Category filter

###  Product Detail Page

* Product image and details
* Price and stock information
* Add to Cart
* Buy Now option

###  Cart

* View added items
* Update quantity
* Remove items
* Total price calculation

###  Checkout

* Shipping address form
* Payment method selection
* Order placement

###  Order Confirmation

* Separate success page
* Displays Order ID

---

##  Bonus Features

* Login / Signup (basic)
* Wishlist functionality 
* Order history page
* Cart badge in navbar
* Amazon-like UI/UX

---

## 🗄 Database Design

### Tables:

* **products**
* **cart**
* **orders**
* **users**
* **wishlist**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/amazon-clone.git
cd amazon-clone
```

---

###  Frontend Setup

```bash
cd amazon-clone
npm install
npm start
```

---

###  Backend Setup

```bash
cd backend
npm install
node server.js
```

---

###  Database Setup

* Create MySQL database
* Create tables (products, cart, orders, users, wishlist)
* Insert sample data

---

##  API Endpoints

* GET /products
* POST /cart
* GET /cart
* PUT /cart/:id
* DELETE /cart/:id
* POST /order
* POST /login
* POST /signup
* GET /orders
* POST /wishlist

---

##  Assumptions

* Default user is assumed (no full authentication system)
* Payments are simulated (no real gateway integration)
* Static product data used for demo

---
