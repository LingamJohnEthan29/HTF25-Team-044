import { motion } from "framer-motion";
import { useState } from "react";

export default function NFTCard({ nft }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-80 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="absolute inset-0 rounded-xl shadow-lg overflow-hidden"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-2"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={nft.image} // already filtered to have images
            alt={nft.title}
            className="w-36 h-36 object-cover rounded-lg" // Kept the smaller size
          />
          <h3 className="mt-2 font-semibold text-white text-center text-sm">{nft.title}</h3>
          <p className="text-xs text-gray-300 text-center mt-1">{nft.collection}</p>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-start bg-gray-800 text-white p-4 overflow-y-auto" // <-- FIX APPLIED HERE
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="font-semibold text-sm mb-2">{nft.title}</h3>
          <p className="text-xs text-gray-200 text-center">
            {nft.description || "No description available"}
          </p>
          <p className="text-xxs text-gray-400 mt-2">{nft.collection}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}