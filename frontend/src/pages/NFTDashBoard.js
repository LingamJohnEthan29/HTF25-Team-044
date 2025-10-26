// src/pages/DashBoard.js
import { useState, useEffect } from "react";
import Aurora from "../components/react-bits/Aurora.js";
import NFTGallery from "../components/nftGallery.js";
import Loader from "../components/loader.js";
import ErrorMessage from "../components/error.js";
import { fetchNFTs } from "../utils/fetchNFTs.js";

export default function DashBoard() {
  const [wallet, setWallet] = useState("");
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserAndNFTs = async () => {
      try {
        // 1️⃣ Get the logged-in wallet from localStorage
        const storedWallet = localStorage.getItem("wallet");
        if (!storedWallet) {
          setError("Wallet not found. Please login again.");
          setLoading(false);
          return;
        }
        setWallet(storedWallet);

        // 2️⃣ Fetch NFTs from backend API
        const fetchedNFTs = await fetchNFTs(storedWallet);

        if (!fetchedNFTs || fetchedNFTs.length === 0) {
          setError("No NFTs found for this wallet.");
        } else {
          setNFTs(fetchedNFTs);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch NFTs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndNFTs();
  }, []);

  return (
    <div
      className="dashboard-container"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh", // <-- CHANGED from height
        // overflow: "hidden", // <-- REMOVED
        backgroundColor: "black",
      }}
    >
      {/* Aurora background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* --- PART 2: FIX CONTENT CENTERING --- */}
      <div
        className="dashboard-content"
        style={{
          position: "relative", // <-- CHANGED from absolute
          zIndex: 1, // <-- ADDED to ensure content is above Aurora
          width: "95%",
          maxWidth: "1200px",
          margin: "0 auto", // <-- ADDED for horizontal centering
          padding: "4rem 0", // <-- ADDED for top/bottom spacing
          textAlign: "center",
          color: "#fff",
          // REMOVED: top, left, transform
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "2rem",
            fontWeight: "900",
            textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
          }}
        >
          Your NFTs
        </h1>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && nfts.length > 0 && <NFTGallery nfts={nfts} />}
      </div>
    </div>
  );
}