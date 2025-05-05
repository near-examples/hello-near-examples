import { injected, walletConnect } from '@wagmi/connectors';
import { reconnect } from '@wagmi/core';
import { createAppKit } from '@reown/appkit/react'
import { nearTestnet } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const projectId = '5bb0fe33763b3bea40b8d69e4269b4ae';

const connectors = [
  walletConnect({
    projectId,
    showQrModal: false, // showQrModal must be false
  }),
  injected({ shimDisconnect: true }),
];

export const wagmiAdapter = new WagmiAdapter({
  networks: [nearTestnet],
  connectors,
  projectId
})

// Preserve login state on page reload
reconnect(wagmiAdapter.wagmiConfig);

export const web3Modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [nearTestnet],
  defaultNetwork: nearTestnet,
  enableWalletConnect: true,
  features: {
    analytics: true,
    swaps: false,
    onramp: false,
    email: false, // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
    socials: false, // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
  },
  coinbasePreference: "eoaOnly", // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
});