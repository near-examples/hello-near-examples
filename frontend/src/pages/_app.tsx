import "@/styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";

import type { AppProps } from "next/app";
import { WalletSelectorProvider } from "@near-wallet-selector/react-hook";
import { Navigation } from "@/components/navigation";
import { HelloNearContract, NetworkId } from "@/config";

// Wallet setups
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupMeteorWalletApp } from "@near-wallet-selector/meteor-wallet-app";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupEthereumWallets } from "@near-wallet-selector/ethereum-wallets";
import { setupHotWallet } from "@near-wallet-selector/hot-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupSender } from "@near-wallet-selector/sender";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";

// Ethereum adapters
import { wagmiAdapter, web3Modal } from "@/wallets/web3modal";

// Types
import type { WalletModuleFactory } from "@near-wallet-selector/core";

const walletSelectorConfig = {
  network: NetworkId,
  modules: [
    setupEthereumWallets({ wagmiConfig: wagmiAdapter.wagmiConfig, web3Modal }),
    setupBitteWallet(),
    setupMeteorWallet(),
    setupMeteorWalletApp({ contractId: HelloNearContract }),
    setupHotWallet(),
    setupLedger(),
    setupSender(),
    setupHereWallet(),
    setupNearMobileWallet(),
    setupWelldoneWallet(),
    setupMyNearWallet(),
  ] as WalletModuleFactory[], // ✅ force correct typing
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletSelectorProvider config={walletSelectorConfig}>
      <Navigation />
      <Component {...pageProps} />
    </WalletSelectorProvider>
  );
}
