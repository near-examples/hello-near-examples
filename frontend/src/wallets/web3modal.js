import { NetworkId, EVMWalletChain } from '@/config';
import { reconnect, http, createConfig } from "@wagmi/core";
import { walletConnect, injected } from "@wagmi/connectors";
import { createWeb3Modal } from "@web3modal/wagmi";

// Config
const near = {
  id: EVMWalletChain.chainId,
  name: EVMWalletChain.name,
  nativeCurrency: {
    decimals: 18,
    name: "NEAR",
    symbol: "NEAR",
  },
  rpcUrls: {
    default: { http: [EVMWalletChain.rpc] },
    public: { http: [EVMWalletChain.rpc] },
  },
  blockExplorers: {
    default: {
      name: "NEAR Explorer",
      url: EVMWalletChain.explorer,
    },
  },
  testnet: NetworkId === "testnet",
};

// Get projectId from https://cloud.reown.com
// check https://docs.reown.com/cloud/relay for more details
const projectId = 'YOUR_PROJECT_ID';

export const wagmiConfig = createConfig({
  chains: [near],
  transports: { [near.id]: http() },
  connectors: [
    walletConnect({ projectId, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ],
});

// Preserve login state on page reload
reconnect(wagmiConfig);

// Modal for login
export const web3Modal = createWeb3Modal({ wagmiConfig, projectId });