import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders </h2>

      {orders.map(order => (
        <div key={order.id} style={{
          background: "white",
          padding: "15px",
          margin: "10px",
          borderRadius: "10px"
        }}>
          <p><b>Order ID:</b> {order.id}</p>
          <p>Total: ₹{order.total}</p>
          <p>Address: {order.address}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;