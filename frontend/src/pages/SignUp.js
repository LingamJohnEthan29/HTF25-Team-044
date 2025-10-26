// src/pages/SignUp.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aurora from "../components/react-bits/Aurora.js";

export default function SignUp() {
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!wallet) return setError("Wallet is required");
    try {
      const res = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: wallet }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message);
      navigate("/login");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden",backgroundColor:"black" }}>
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
        <h1 style={{ marginBottom: "1.5rem" }}>Sign Up</h1>
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
          onClick={handleSignUp}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#FF3232",
            color: "#fff",
            fontSize: "1rem",
          }}
        >
          Sign Up
        </button>
        {error && <p style={{ color: "#FF4D4D", marginTop: "1rem" }}>{error}</p>}
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#3A29FF", cursor: "pointer", textDecoration: "underline" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
