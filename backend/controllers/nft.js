// backend/routes/nft.js
import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY;
if (!ALCHEMY_KEY) throw new Error("Missing ALCHEMY_API_KEY in .env");

const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/v3/${ALCHEMY_KEY}`;

// Fetch NFTs for a wallet
router.get('/:walletAddress', async (req, res) => {
  const wallet = req.params.walletAddress;

  try {
    const response = await axios.get(`${ALCHEMY_BASE_URL}/getNFTsForOwner`, {
      params: {
        owner: wallet,
        withMetadata: true
      }
    });

    const nfts = response.data.ownedNfts?.map(nft => ({
      title: nft.title || nft.metadata?.name || "Untitled",
      image:
        nft.media?.[0]?.gateway ||
        nft.metadata?.image?.replace("ipfs://", "https://ipfs.io/ipfs/") ||
        "https://via.placeholder.com/150",
      collection: nft.contractMetadata?.name || "Unknown Collection",
      tokenId: nft.id?.tokenId
    })) || [];

    res.json(nfts);
  } catch (err) {
    console.error("Error fetching NFTs:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch NFTs" });
  }
});

export default router;
