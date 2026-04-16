import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./api";

function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/wishlist`)
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Wishlist </h2>

      {items.map(item => (
        <div key={item.id}>
          <img src={item.image} width="100" alt="" />
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;