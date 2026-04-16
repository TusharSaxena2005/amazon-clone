import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./App.css";

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-detail">

      {/* LEFT IMAGE */}
      <div className="product-image">
        <img src={product.image || "https://via.placeholder.com/400"} alt={product.name} onError={(e) => { e.target.src = "https://via.placeholder.com/400" }} />
      </div>

      {/* RIGHT DETAILS */}
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <h3>₹{product.price}</h3>
        <p>Stock: {product.stock}</p>

        <button onClick={() => addToCart(product.id)}>
          Add to Cart
        </button>

      <button
  className="buy-btn"
  onClick={() =>
    navigate("/checkout", {
      state: { total: product.price }
    })
  }
>
  Buy Now
</button>
      </div>

    </div>
  );
}

export default ProductDetail;