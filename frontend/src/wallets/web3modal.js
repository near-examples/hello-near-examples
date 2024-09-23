import { NetworkId, EVMWalletChain } from '@/config';
import { http, createConfig } from "@wagmi/core";
import { walletConnect, injected } from "@wagmi/connectors";
import { createWeb3Modal } from "@web3modal/wagmi";

// see more here: https://docs.reown.com/appkit/react/core/installation#cloud-configuration
const reownProjectId = '5bb0fe33763b3bea40b8d69e4269b4ae';

const onMainnet = NetworkId == "mainnet";
const nearChain = {
    id: EVMWalletChain.chainId,
    name: `NEAR Protocol${ onMainnet ? "" : " Testnet"}`,
    nativeCurrency: {
    decimals: 18,
    name: "NEAR",
    symbol: "NEAR",
    },
    rpcUrls: {
    default: { http: [EVMWalletChain.ethRpcForNear] },
    public: { http: [EVMWalletChain.ethRpcForNear] },
    },
    blockExplorers: {
    default: {
        name: "NEAR Explorer",
        url: EVMWalletChain.walletExplorerUrl,
    },
    },
    testnet: !onMainnet,
};

const url = "http://localhost:3000";
const metadata = {
    name: "Onboard to NEAR Protocol",
    description: "Discover NEAR Protocol with Ethereum and NEAR wallets.",
    url: url,
    icons: [`${url}/near.svg`],
};

export const wagmiConfig = createConfig({
    chains: [nearChain],
    transports: {
        [nearChain.id]: http(),
    },
    connectors: [
        walletConnect({ projectId: reownProjectId, metadata, showQrModal: false }),
        injected({ shimDisconnect: true }),
    ],
});

export const web3Modal = createWeb3Modal({
    wagmiConfig: wagmiConfig,
    // Get a project ID at https://cloud.walletconnect.com
    projectId: reownProjectId,
});