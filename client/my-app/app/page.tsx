"use client";
import { WalletOptions } from "@/components/WalletOptions";
import { Account } from "@/components/accounts";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function Home() {
  const [isClient, setIsCLient] = useState(false);
  useEffect(() => {
    setIsCLient(true);
  }, []);
  return (
    <main className="flex justify-center items-center h-screen w-full">
      <div className=" sm:w-full sm:h-full md:w-1/2 md:h-1/2 rounded-lg border-[#3b444b] border-2 md:flex md:justify-center md:items-center">
        <div className="sm:hidden md:flex md:h-full md:w-1/2 ">
          <Image src="/lock-icon.svg" alt="" width={600} height={600} />
        </div>
        <div className="flex h-full w-1/2 border-l-[#3b444b] border-l-2 rounded-lg justify-center items-center">
          {isClient && <ConnectWallet />}
        </div>
      </div>
    </main>
  );
}
