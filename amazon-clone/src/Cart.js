import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./api";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // fetch cart
  const fetchCart = () => {
    axios.get(`${API_URL}/cart`)
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // update qty
  const updateQty = (id, qty) => {
    axios.put(`${API_URL}/cart/${id}`, {
      quantity: qty
    }).then(() => fetchCart());
  };

  // delete item
  const deleteItem = (id) => {
    axios.delete(`${API_URL}/cart/${id}`)
      .then(() => fetchCart());
  };

  // total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>

      {cart.map(item => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                updateQty(item.id, e.target.value)
              }
            />

            <button onClick={() => deleteItem(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button onClick={() => navigate("/checkout", { state: { total } })}>
        Checkout
      </button>
    </div>
  );
}

export default Cart;