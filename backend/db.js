const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "sneha",
  database: process.env.DB_NAME || "amazon_clone",
});

const initSchema = () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) DEFAULT '',
      price DECIMAL(10,2) NOT NULL,
      image VARCHAR(255)
    )`,
    `CREATE TABLE IF NOT EXISTS cart (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      total DECIMAL(10,2) NOT NULL,
      address VARCHAR(500) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS wishlist (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )`,
  ];

  const runQuery = (index) => {
    if (index >= queries.length) {
      seedProducts();
      return;
    }

    db.query(queries[index], (err) => {
      if (err) {
        console.error("Schema initialization error:", err);
      }
      runQuery(index + 1);
    });
  };

  runQuery(0);
};

const seedProducts = () => {
  const products = [
    [
      "Wireless Bluetooth Headphones",
      "electronics",
      1999.99,
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMXqmcicOGexxWIAg6fxQI3hMt81UBbTk24w&s"
    ],
    [
      "Casual Cotton Shirt",
      "fashion",
      799.0,
      "https://tiimg.tistatic.com/fp/2/007/743/washable-regular-fit-casual-wear-full-sleeves-spread-collar-plain-cotton-cargo-shirt-for-men--812.jpg"
    ],
    [
      "Modern Desk Lamp",
      "home",
      1299.5,
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3zPsUyf3whWMIf8djqIM_Z90m7TlDiwunDw&s"
    ],
    [
      "Smart Watch",
      "electronics",
      3499.0,
      "https://www.leafstudios.in/cdn/shop/files/1_1099cd20-7237-4bdf-a180-b7126de5ef3d_800x.png?v=1722230645"
    ],
    [
      "Running Shoes",
      "fashion",
      2599.0,
      "https://i5.walmartimages.com/seo/Damyuan-Running-Shoes-Men-Fashion-Sneakers-Slip-on-Casual-Walking-Shoes-Sport-Athletic-Shoes-Lightweight-Breathable-Comfortable_4114141f-7d26-4dd7-933d-babc24080395.516ad145e1a1d8d82a801ac48231950d.jpeg"
    ],
  ];

  db.query("SELECT COUNT(*) AS count FROM products", (err, result) => {
    if (err) {
      console.error("Product seed check error:", err);
      return;
    }

    if (result[0].count === 0) {
      const placeholders = products.map(() => "(?,?,?,?)").join(",");
      const values = products.flat();
      db.query(
        `INSERT INTO products (name, category, price, image) VALUES ${placeholders}`,
        values,
        (insertErr) => {
          if (insertErr) {
            console.error("Product seed insert error:", insertErr);
          } else {
            console.log("Default products seeded ✅");
          }
        }
      );
    }
  });
};

db.connect((err) => {
  if (err) {
    console.log("DB connection error", err);
  } else {
    console.log("MySQL Connected ✅");
    initSchema();
  }
});

module.exports = db;