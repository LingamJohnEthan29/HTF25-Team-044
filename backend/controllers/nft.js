// backend/routes/nft.js
import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY;
if (!ALCHEMY_KEY) throw new Error("Missing ALCHEMY_API_KEY in .env");

const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}`;

router.get('/:walletAddress', async (req, res) => {
  const wallet = req.params.walletAddress;

  try {
    const response = await axios.get(`${ALCHEMY_BASE_URL}/getNFTsForOwner`, {
      params: {
        owner: wallet,
        withMetadata: true,
        pageSize: 50,
      },
    });

    const nfts = response.data.ownedNfts
      ?.map((nft) => {
        const metadata = nft.metadata || nft.raw?.metadata || {};
        const mediaUrl =
          nft.media?.[0]?.gateway ||
          nft.image?.cachedUrl ||
          metadata.image ||
          metadata.image_url ||
          null;

        if (!mediaUrl) return null; // skip NFTs without images

        // Convert IPFS links to HTTP
        const imageUrl = mediaUrl.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");

        return {
          title: nft.title || metadata.name || null,
          image: imageUrl,
          collection:
            nft.collection?.name ||
            nft.contract?.name ||
            nft.contractMetadata?.name ||
            null,
        };
      })
      .filter((nft) => nft && nft.title && nft.image && nft.collection); // keep only valid NFTs

    res.json(nfts);
  } catch (err) {
    console.error("❌ Error fetching NFTs:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch NFTs from Alchemy" });
  }
});

export default router;
