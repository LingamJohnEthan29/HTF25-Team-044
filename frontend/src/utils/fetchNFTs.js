// frontend/src/utils/fetchNFTs.js

export const fetchNFTs = async (walletAddress) => {
  if (!walletAddress) return [];

  try {
    // Explicit backend URL
    const res = await fetch(`http://localhost:5000/api/nft/${encodeURIComponent(walletAddress)}`);
    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw new Error(text || `API error: ${res.status}`);
    }

    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Fetch NFTs error:", err);
    throw err;
  }
};
