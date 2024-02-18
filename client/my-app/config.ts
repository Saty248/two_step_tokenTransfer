import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

import { type Chain } from "viem";
import { injected, metaMask } from "wagmi/connectors";

export const localhost1 = {
  id: 31337,
  name: "localhost1",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545/"] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://etherscan.io" },
  },
  contracts: {
    Nft1: { address: "0x5FbDB2315678afecb367f032d93F642f64180aa3" },
    FuncSelc: { address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" },
    SmartAccountDeployer: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    },
    ContractMapper: { address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9" },
  },
  testnet: true,
} as const satisfies Chain;

export const config = createConfig({
  chains: [localhost1],
  connectors: [injected()],
  transports: {
    [localhost1.id]: http("http://127.0.0.1:8545/"),
  },
});
