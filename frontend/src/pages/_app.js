import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import { Navigation } from '@/components/navigation';
import { HelloNearContract, NetworkId } from '@/config';
import { NearContext, Wallet } from '@/wallets/near';


// Wallet instance
const wallet = new Wallet({ networkId: NetworkId });

// Optional: Create an access key so the user does not need to sign transactions. Read more about access keys here: https://docs.near.org/concepts/protocol/access-keys
//const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: HelloNearContract });

export default function MyApp({ Component, pageProps }) {
  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => { wallet.startUp(setSignedAccountId) }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <Navigation />
      <Component {...pageProps} />
    </NearContext.Provider>
  );
}
