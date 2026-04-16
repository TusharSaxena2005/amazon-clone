import React from "react";
import { Link } from "react-router-dom";

function Navbar({ setSearch, cartCount }) {

  const user = localStorage.getItem("user");
  const address = localStorage.getItem("address");

  return (
    <div className="navbar">

      {/* LEFT LOGO */}
      <Link to="/" className="logo">amazon.in</Link>

      {/* ADDRESS */}
      <div className="nav-address">
        <p>Deliver to</p>
        <h4>{address || "Your Location"}</h4>
      </div>

      {/* SEARCH */}
      <input
        className="nav-search"
        placeholder="Search Amazon.in"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* RIGHT */}
      <div className="nav-right">

        <div>
          <Link to="/login">Hello, {user ? user.split("@")[0] : "Sign in"}</Link>
        </div>

        <Link to="/orders">Returns & Orders</Link>

        <Link to="/cart">
          Cart 🛒 <span className="cart-badge">{cartCount}</span>
        </Link>

      </div>

    </div>
  );
}

export default Navbar;