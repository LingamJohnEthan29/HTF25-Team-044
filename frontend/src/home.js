import { useState } from "react";
import NFTGallery from "./components/nftGallery.js";
import Loader from "./components/loader.js";
import ErrorMessage from "./components/error.js";
import { fetchNFTs } from "./utils/fetchNFTs.js";

export default function Home() {
  const [wallet, setWallet] = useState(""); // wallet address input
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchNFTs = async () => {
    if (!wallet) {
      setError("Please enter a wallet address.");
      return;
    }

    setLoading(true);
    setError("");
    setNFTs([]);

    try {
      const fetched = await fetchNFTs(wallet);
      if (!fetched || fetched.length === 0) {
        setError("No NFTs found for this wallet.");
      } else {
        setNFTs(fetched);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch NFTs. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">View Wallet NFTs</h1>

      {/* Wallet input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Enter wallet address (0x...)"
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={handleFetchNFTs}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {/* Loading, error, gallery */}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <NFTGallery nfts={nfts} />
    </div>
  );
}
