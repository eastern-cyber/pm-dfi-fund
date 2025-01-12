"use client";

import Image from "next/image";
import {
  createThirdwebClient,
  getContract,
} from "thirdweb";
import { defineChain, polygon } from "thirdweb/chains";
import { getContractMetadata } from "thirdweb/extensions/common";
import { ConnectButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: "e8b864cf8d55fbd854f43ae53b6c824c",
});

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(polygon),
  address: "0xca23b56486035e14F344d6eb591DC27274AF3F47",
});

export default function Home() {

  const account = useActiveAccount ();

const { data: contractMetadata } = useReadContract(
  getContractMetadata,
  {
    contract: contract,
  }
);

if(!account)
  {
    return (
      <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
        <div className="py-20">
          <div className="flex justify-center mb-20">
          <ConnectButton locale={"en_US"}
              client={client}
              wallets={[ inAppWallet ({
                auth: {
                  options: [
                    "email",
                    // "phone",
                  ]
                }
              }
              ) ]}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <ConnectButton locale={"en_US"}
              client={client}
              chain={polygon}
          />
      </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://dfi.fund/about/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://3k.aseanquality.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://dfi.fund"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to dfi.fund →
          </a>
        </footer>
      </div>
  );
}
