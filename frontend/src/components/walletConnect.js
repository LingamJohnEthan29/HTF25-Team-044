import { useState } from "react";

export default function WalletConnectButton({ onConnect }) {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
    onConnect(accounts[0]);
  };

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
    >
      {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
    </button>
  );
}
