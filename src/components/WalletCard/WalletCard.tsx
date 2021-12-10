import React, { Fragment, useState } from "react";
import { ethers } from "ethers";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

declare const window: Window &
  typeof globalThis & {
    ethereum: any;
  };

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState([]);
  const [userBalance, setUserBalance] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");
  const [selectedAccount, setSelectedAccount] = useState("");

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

  const chainChangedHandler = () => {
    window.location.reload();
    window.ethereum.on("chainChanged", chainChangedHandler);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="w-50 flex">
        <div className="w-92 bg-white border-solid border-gray-100 shadow rounded">
          {defaultAccount}
        </div>
      </div>

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
    </>
  );
};

export default WalletCard;
