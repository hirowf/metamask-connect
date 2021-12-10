import React, { useState } from "react";
import { ethers } from "ethers";

declare const window: Window &
  typeof globalThis & {
    ethereum: any;
  };

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      setErrorMessage("Please install MetaMask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());

    window.ethereum.on("accountChanged", accountChangedHandler);
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  return (
    <div className="flex flex-col justify-items-center items-center">
      <h4> {"Connect to your M E T A M A S K 🦊🦊🦊"} </h4>

      <button
        className="bg-orange-400 rounded shadow-lg shadow-indigo-500/50 p-3"
        onClick={connectWalletHandler}
      >
        {connectButtonText} 🦊
      </button>
      <div className="accountDisplay">
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance: {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCard;
