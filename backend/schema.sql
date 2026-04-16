-- Database schema for the Amazon clone backend.
-- Run this against the database configured in backend/.env.

CREATE DATABASE IF NOT EXISTS amazon_clone;
USE amazon_clone;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT '',
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255)
);

INSERT INTO products (name, category, price, image)
SELECT * FROM (SELECT 'Wireless Bluetooth Headphones', 'electronics', 1999.99, 'https://via.placeholder.com/200x200.png?text=Headphones') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products);

INSERT INTO products (name, category, price, image)
SELECT * FROM (SELECT 'Casual Cotton Shirt', 'fashion', 799.00, 'https://via.placeholder.com/200x200.png?text=Shirt') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products);

INSERT INTO products (name, category, price, image)
SELECT * FROM (SELECT 'Modern Desk Lamp', 'home', 1299.50, 'https://via.placeholder.com/200x200.png?text=Lamp') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products);

INSERT INTO products (name, category, price, image)
SELECT * FROM (SELECT 'Smart Watch', 'electronics', 3499.00, 'https://via.placeholder.com/200x200.png?text=Watch') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products);

INSERT INTO products (name, category, price, image)
SELECT * FROM (SELECT 'Running Shoes', 'fashion', 2599.00, 'https://via.placeholder.com/200x200.png?text=Shoes') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products);

CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total DECIMAL(10,2) NOT NULL,
  address VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
