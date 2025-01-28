import '@/styles/globals.css';
import '@near-wallet-selector/modal-ui/styles.css';

import { createContext, useEffect, useState } from 'react';

import { Navigation } from '@/components/navigation';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';

import { HelloNearContract, NetworkId } from '@/config';

/**
 * @typedef NearContext
 * @property {import('@near-wallet-selector/core').WalletSelector} selector The wallet selector
 * @property {string} signedAccountId The AccountId of the signed user
 * @property {import('@near-wallet-selector/modal-ui').Modal} modal The modal to show
 */

/** @type {import ('react').Context<NearContext>} */
export const NearContext = createContext({
  walletSelector: undefined,
  signedAccountId: '',
  modal: undefined,
});

// Optional: Create an access key so the user does not need to sign transactions. Read more about access keys here: https://docs.near.org/concepts/protocol/access-keys
//const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: HelloNearContract });

export default function MyApp({ Component, pageProps }) {
  const [signedAccountId, setSignedAccountId] = useState('');
  const [walletSelector, setSelector] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    setupWalletSelector({
      network: NetworkId,
      modules: [
        setupMyNearWallet(),
        setupMeteorWallet(),
      ],
    }).then(
      walletSelector => {
        const modal = setupModal(walletSelector, { contractId: '' });
        walletSelector.subscribeOnAccountChange((accountId) => setSignedAccountId(accountId));
        setSelector(walletSelector);
        setModal(modal);
      }
    )
  }, []);

  return (
    <NearContext.Provider value={{ walletSelector, modal, signedAccountId }}>
      <Navigation />
      <Component {...pageProps} />
    </NearContext.Provider>
  );
}
