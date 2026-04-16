const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./db");
const allowedOrigins = [
  "https://amazon-clone-cgea.vercel.app",
  "http://localhost:3000",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("CORS origin not allowed"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend running ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});
app.post("/cart", (req, res) => {
  const { product_id, quantity } = req.body;

  db.query(
    "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
    [product_id, quantity],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Added to cart");
    }
  );
});
app.get("/cart", (req, res) => {
  db.query(
    `SELECT cart.id, products.name, products.price, cart.quantity 
     FROM cart 
     JOIN products ON cart.product_id = products.id`,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});
app.put("/cart/:id", (req, res) => {
  const { quantity } = req.body;

  db.query(
    "UPDATE cart SET quantity = ? WHERE id = ?",
    [quantity, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Quantity updated");
    }
  );
});
app.delete("/cart/:id", (req, res) => {
  db.query(
    "DELETE FROM cart WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Item removed");
    }
  );
});
app.post("/order", (req, res) => {
  const { total, address, payment } = req.body;

  if (!address) {
    return res.status(400).send("Address required ");
  }

  db.query(
    "INSERT INTO orders (total, address) VALUES (?, ?)",
    [total, address],
    (err, result) => {
      if (err) return res.status(500).send(err);

      const orderId = result.insertId;

      // cart clear
      db.query("DELETE FROM cart");

      res.json({ message: "Order placed", orderId });
    }
  );
});
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User registered ");
    }
  );
});
// login and signup routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length > 0) {
        res.send("Login success ");
      } else {
        res.status(401).send("Invalid credentials ");
      }
    }
  );
});
// add wishlist
app.post("/wishlist", (req, res) => {
  const { product_id } = req.body;

  db.query(
    "INSERT INTO wishlist (product_id) VALUES (?)",
    [product_id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Added to wishlist");
    }
  );
});

// get wishlist
app.get("/wishlist", (req, res) => {
  db.query(
    `SELECT wishlist.id, products.name, products.price, products.image
     FROM wishlist
     JOIN products ON wishlist.product_id = products.id`,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});
