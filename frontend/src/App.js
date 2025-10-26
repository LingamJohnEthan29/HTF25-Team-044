import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homeScreen.js";
import NFTDetail from "../pages/NFTDetail.js";
import Wallet from "../pages/Wallet.js";
import Collection from "../pages/Collection.js";
import NotFound from "../pages/NotFound.js";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nft/:tokenId" element={<NFTDetail />} />
        <Route path="/wallet/:walletAddress" element={<Wallet />} />
        <Route path="/collection/:collectionName" element={<Collection />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
