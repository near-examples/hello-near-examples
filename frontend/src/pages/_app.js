import { useEffect } from 'react';

import '@/styles/globals.css';
import { Navigation } from '@/components/navigation';

import '@near-wallet-selector/modal-ui/styles.css';
import { useWalletSelector } from '@near-wallet-selector/react-hook'
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';

export default function MyApp({ Component, pageProps }) {

  const { setupWalletSelector } = useWalletSelector();

  useEffect(() => {
    setupWalletSelector({
      network: NetworkId,
      createAccessKeyFor: HelloNearContract,
      modules: [
        setupMyNearWallet(),
        setupMeteorWallet(),
      ],
    })
  }, []);

  return (<>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}
