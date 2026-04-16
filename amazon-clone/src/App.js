import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Navbar from "./components/Navbar";
import ProductDetail from "./ProductDetail";
import Login from "./Login";
import Signup from "./Signup";
import Orders from "./Orders";
import Wishlist from "./Wishlist";
import Success from "./Success";
import "./App.css";
import API_URL from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", "Sneha");
    }
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Products API error:", err.response?.data || err.message || err));
  }, []);

  const fetchCartCount = () => {
    axios.get(`${API_URL}/cart`)
      .then(res => setCartCount(res.data.length))
      .catch(err => console.error("Cart API error:", err.response?.data || err.message || err));
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const addToCart = (id) => {
    axios.post(`${API_URL}/cart`, {
      product_id: id,
      quantity: 1
    })
    .then(() => {
      alert("Added to cart");
      fetchCartCount();
    })
    .catch(err => console.log(err));
  };

  const addToWishlist = (id) => {
    axios.post(`${API_URL}/wishlist`, {
      product_id: id
    })
    .then(() => alert("Added to wishlist ❤️"))
    .catch(err => console.log(err));
  };

  return (
    <div className="container">

      <Navbar setSearch={setSearch} cartCount={cartCount} />

      <Routes>

        {/* HOME */}
        <Route path="/" element={
          <>
            <select
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: "10px", marginLeft: "10px" }}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
            </select>

            <div className="grid">
              {products
                .filter(p =>
                  p.name.toLowerCase().includes(search.toLowerCase())
                )
                .filter(p =>
                  category === "" || p.category === category
                )
                .map((p) => (
                  <div className="card" key={p.id}>
                 <img
  src={p.image || "https://via.placeholder.com/200"}
  alt={p.name}
  onClick={() => navigate(`/product/${p.id}`)}  
  style={{ cursor: "pointer" }}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/200";
  }}
/>
                    <h3>{p.name}</h3>
                    <p>₹{p.price}</p>

                    {/* ✅ BUTTON GROUP FIX */}
                    <div className="card-buttons">
                      <button
                        className="add-btn"
                        onClick={() => addToCart(p.id)}
                      >
                        Add to Cart
                      </button>

                      <button
                        className="wish-btn"
                        onClick={() => addToWishlist(p.id)}
                      >
                         Wishlist
                      </button>
                    </div>

                  </div>
                ))}
            </div>
          </>
        } />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/product/:id"
          element={
            <ProductDetail
              products={products}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
      
    </div>
  );
}

export default App;