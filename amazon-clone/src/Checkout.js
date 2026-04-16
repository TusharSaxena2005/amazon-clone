import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "./api";
import "./App.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const total = location.state?.total || 0;

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const placeOrder = () => {
    if (!address) {
      alert("Please enter address ❌");
      return;
    }

    axios.post(`${API_URL}/order`, {
      total,
      address,
      payment
    })
    .then(res => {

      // ✅ SAVE ADDRESS
      localStorage.setItem("address", address);

      // ✅ REDIRECT TO SUCCESS PAGE
      navigate("/success", {
        state: { orderId: res.data.orderId }
      });

    })
    .catch(err => {
      console.log(err);
      alert("Order failed ❌");
    });
  };

  return (
    <div className="checkout-container">

      <div className="checkout-left">
        <h2>Checkout 🧾</h2>

        <div className="box">
          <h3>Shipping Address</h3>
          <textarea
            placeholder="Enter your full address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="box">
          <h3>Payment Method</h3>
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Card</option>
          </select>
        </div>
      </div>

      <div className="checkout-right">
        <h3>Order Summary</h3>

        <p>Items Total: ₹{total}</p>
        <p>Delivery: ₹0</p>

        <hr />

        <h2>Total: ₹{total}</h2>

        <button onClick={placeOrder}>
          Place Order
        </button>
      </div>

    </div>
  );
}

export default Checkout;