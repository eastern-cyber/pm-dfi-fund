"use client";

// import { ThirdwebProvider } from "@thirdweb-dev/react";
// import { ChainId } from "@thirdweb-dev/sdk";
import { AccountProvider, AccountName, AccountAvatar, AccountBalance, AccountAddress, AccountBalanceInfo, ChainProvider, ChainIcon, TokenProvider, TokenIcon  } from "thirdweb/react";
import { base, polygonAmoy } from "thirdweb/chains";

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
  // clientId: "e8b864cf8d55fbd854f43ae53b6c824c",
  clientId: "e8b864cf8d55fbd854f43ae53b6c824c",
});

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(polygon),
  address: "0xca23b56486035e14F344d6eb591DC27274AF3F47",
});

const DFAST_POLYGON =
    "0xca23b56486035e14F344d6eb591DC27274AF3F47";

export default function Home() {

  const activeAccount = useActiveAccount();
  console.log("address", activeAccount?.address);

  const { data: contractMetadata } = useReadContract(
    getContractMetadata,
    {
      contract: contract,
    }
  );

  function Chain() {
    return (
      <ChainProvider chain={polygon}>
        <ChainIcon
          client={client}
          className="h-auto w-6 rounded-full p-1"
          loadingComponent={<span>Loading...</span>}
        />
      </ChainProvider>
    );
  }

  function Token() {
    return (
      <TokenProvider
        address={"0xca23b56486035e14F344d6eb591DC27274AF3F47"}
        client={client}
        chain={polygon}
      >
        <TokenIcon className="h-6 w-6 rounded-full mr-1" />
      </TokenProvider>
    );
  }

  function Account() {
    return (
      <div className="flex flex-col justify-items-center mt-4">
        <AccountProvider
          address={"0x5351D5D4AF2aFb480A0F260c482aAAaAD9B88Bd9"}
          client={client}
        >
          <div className="justify-items-center">
            <AccountAvatar
              className="flex flex-col justify-items-center w-20 h-20 rounded-full"
              loadingComponent={<span>Loading...</span>}
              resolverAddress={"0x5351D5D4AF2aFb480A0F260c482aAAaAD9B88Bd9"} resolverChain={base}
              socialType={"lens"} // Choose between: "farcaster" | "lens" | "ens"
              fallbackComponent={<img className="w-20 h-20 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgJDFLehkQpFnas_gqV8aGpJTzR26MIlsatrb458vJWIFM9KZpv0HXnSRsbHJ6VjLx4I&usqp=CAU"/>}
            />
          </div>
          <div className="justify-items-center">
            {/* You can choose between "ens", "lens" and "farcaster" */}
            <AccountName
              socialType="lens"
              loadingComponent={<span>Loading...</span>}
            />
          </div>
          <div className="flex justify-items-center mt-2">
            บัญชีผู้ใช้งาน : <Chain /> <AccountAddress />
          </div>
          <div className="flex justify-items-center mt-4">
            <Token />
            <AccountBalance
              chain={polygon}
              tokenAddress={DFAST_POLYGON}
              loadingComponent={<span>Loading...</span>}
              formatFn={(props: AccountBalanceInfo) =>
                `${props.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${props.symbol}`
              }
            />
          </div>
        </AccountProvider>
      </div>
    );
  }

if(!activeAccount)
  {
    return (
      <main className="p-4 pb-10 min-h-[100vh] flex justify-items-center container max-w-screen-lg mx-auto">
        <div className="py-20 justify-items-center">
          <div className="flex justify-items-center mb-20">
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
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 justify-items-center sm:items-start">
          <div className="justify-items-center p-4">
            <div className="justify-items-center p-4">
              <ConnectButton locale={"en_US"}
                client={client}
                chain={polygon}
              />
            </div>
            <div className="justify-items-center p-4">
              <Account />
            </div>
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
