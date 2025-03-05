import { createAppKit } from "@reown/appkit/react";
import { nearTestnet } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { reconnect } from "@wagmi/core";

// Get your projectId at https://cloud.reown.com
const projectId = '5bb0fe33763b3bea40b8d69e4269b4ae';

const metadata = {
  name: "Hello near examples",
  description: "Examples demonstrating integrations with NEAR blockchain",
  url: "https://near.github.io/near-examples",
  icons: ["https://near.github.io/wallet-selector/favicon.ico"],
}

export const wagmiAdapter = new WagmiAdapter({
  networks: [nearTestnet],
  projectId,
  autoReconnect: true,
})

reconnect(wagmiAdapter.wagmiConfig);

export const web3Modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [nearTestnet],
  defaultNetwork: nearTestnet,
  enableWalletConnect: true,
  metadata,
  features: {
    analytics: true,
    socials: false,
    email: false
  },
  coinbasePreference: "eoaOnly", // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
});