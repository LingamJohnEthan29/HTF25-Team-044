import NFTCard from "./nftCard.js";

export default function NFTGallery({ nfts }) {
  if (!nfts || nfts.length === 0) {
    return <p className="text-center mt-6 text-white text-lg">No NFTs found.</p>;
  }

  return (
    <div className="w-full p-6 bg-transparent">
      <h2 className="text-2xl font-bold text-white mb-6">Your NFT Collection</h2>

      <div className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6
        "
      >
        {nfts.map((nft, index) => (
          <NFTCard key={index} nft={nft} />
        ))}
      </div>
    </div>
  );
}
