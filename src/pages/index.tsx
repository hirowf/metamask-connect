import { Fragment } from "react";
import Head from "next/head";
import WalletCard from "../components/WalletCard/WalletCard";
import Header from "../components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <WalletCard />
    </>
  );
}
