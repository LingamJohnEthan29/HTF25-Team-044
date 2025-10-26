import { useParams } from "react-router-dom";
import NFTCard from "../components/nftCard.js";

export default function NFTDetail() {
  const { tokenId } = useParams();

  // TODO: fetch single NFT by tokenId
  const nft = null; // placeholder

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">NFT Detail</h1>
      <p className="mb-4 text-gray-600">Token ID: {tokenId}</p>

      {nft ? (
        <NFTCard nft={nft} />
      ) : (
        <p className="text-gray-500">Loading or NFT not found...</p>
      )}
    </div>
  );
}
