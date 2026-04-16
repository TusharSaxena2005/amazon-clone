import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.state?.orderId;

  return (
    <div className="success-wrapper">

      <div className="success-card">

        <h1>Order Placed Successfully!</h1>

        <p className="success-icon" aria-hidden="true"></p>

        <p>Thank you for shopping with us</p>

        <div className="order-id-box">
          <span>Your Order ID:</span>
          <h3>#{orderId}</h3>
        </div>

        <button onClick={() => navigate("/")}>
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

export default Success;