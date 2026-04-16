import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./api";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post(`${API_URL}/login`, {
      email,
      password
    })
    .then(() => {

      // ✅ SAVE USER
      localStorage.setItem("user", email);

      alert("Login success ");

      // ✅ REDIRECT ONLY ON SUCCESS
      navigate("/");

    })
    .catch(err => {
      console.log(err);
      alert("Invalid credentials ");
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;