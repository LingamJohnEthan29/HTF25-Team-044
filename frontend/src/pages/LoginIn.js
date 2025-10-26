// src/pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aurora from "../components/react-bits/Aurora.js";

export default function Login() {
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleWalletLogin = async () => {
    if (!wallet) return setError("Wallet is required");
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: wallet }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message);

      localStorage.setItem("wallet", wallet);
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", backgroundColor:"black" }}>
      <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.5} amplitude={1.0} speed={0.5} />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "2rem",
          borderRadius: "16px",
          width: "90%",
          maxWidth: "400px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "1.5rem" }}>Login</h1>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={handleWalletLogin}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#3A29FF",
            color: "#fff",
            fontSize: "1rem",
          }}
        >
          Connect Wallet
        </button>
        {error && <p style={{ color: "#FF4D4D", marginTop: "1rem" }}>{error}</p>}
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#FF94B4", cursor: "pointer", textDecoration: "underline" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
