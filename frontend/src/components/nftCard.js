import PixelTransition from './react-bits/PixelTransition.js';

export default function NFTCard({ nft }) {
  const imageUrl =
    nft.image?.cachedUrl ||
    nft.raw?.metadata?.image?.replace("ipfs://", "https://ipfs.io/ipfs/") ||
    "/placeholder.png";

  const title =
    nft.name ||
    nft.raw?.metadata?.name ||
    `Token #${nft.tokenId}` ||
    "Untitled NFT";

  const creator =
    nft.contract?.openSeaMetadata?.twitterUsername ||
    nft.contract?.name ||
    "Unknown Creator";

  const collection =
    nft.collection?.name ||
    nft.contract?.openSeaMetadata?.collectionName ||
    "Unnamed Collection";

  const floorPrice = nft.contract?.openSeaMetadata?.floorPrice;

  const defaultCard = (
    <div className="hover:scale-[1.03] transition-transform duration-300">
      <img
        src={imageUrl}
        alt={title}
        className="rounded-lg w-full h-60 object-cover"
      />
      <div className="mt-3">
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        <p className="text-sm text-gray-500">Creator: {creator}</p>
        <p className="text-sm text-gray-600">Collection: {collection}</p>
      </div>
    </div>
  );

  const activeCard = (
    <div className="p-3 text-sm text-gray-200 bg-gray-900 rounded-xl">
      <p>Token ID: {nft.tokenId}</p>
      {floorPrice && <p>Floor Price: {floorPrice} ETH</p>}
      <p>Address: {nft.contract?.address}</p>
    </div>
  );

  return (
    <PixelTransition
      firstContent={defaultCard}
      secondContent={activeCard}
      gridSize={8}
      pixelColor="#9333ea"
      className="rounded-2xl shadow p-3 bg-white dark:bg-gray-800 hover:shadow-lg cursor-pointer"
    />
  );
}
