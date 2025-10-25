import NFTCard from "./nftCard.js";

export default function NFTGallery({ nfts }) {
  if (!nfts || nfts.length === 0) {
    return <p className="text-center mt-6">No NFTs found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {nfts.map((nft, index) => (
        <NFTCard key={index} nft={nft} />
      ))}
    </div>
  );
}