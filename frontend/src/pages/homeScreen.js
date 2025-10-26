// src/pages/Home.js
import { useNavigate } from "react-router-dom";
import Aurora from "../components/react-bits/Aurora.js";
import DecryptedText from "../components/react-bits/DecryptedText.js";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Aurora background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-logo">Cryptique</div>
        <nav className="navbar-links">
          <button onClick={() => navigate("/")} className="nav-btn">Home</button>
          <button onClick={() => navigate("/collections")} className="nav-btn">Collections</button>
          <button onClick={() => navigate("/wallet")} className="nav-btn">Wallets</button>
        </nav>
      </header>

      {/* Main content */}
      <main className="home-main">
        <DecryptedText
  text="Cryptique"
  animateOn="view"
  revealDirection="center"
  speed={80}
  maxIterations={30}
  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  className="home-title"
  parentClassName="all-letters"
  encryptedClassName="encrypted"
/>

        <div className="home-buttons">
          <button
            onClick={() => navigate("/login")}
            className="home-btn login-btn"
          >
            Login with Wallet
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="home-btn signup-btn"
          >
            Sign Up with Wallet
          </button>
        </div>
      </main>
    </div>
  );
}
