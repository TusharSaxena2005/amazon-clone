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

        <h1 className="success-icon"></h1>

        <h2>Order Placed Successfully!</h2>

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