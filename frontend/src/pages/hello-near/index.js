import { Cards } from '@/components/cards';

import { useEffect, useState } from 'react';
import styles from '@/styles/app.module.css';

import { HelloNearContract } from '../../config';

import { useWalletSelector } from '@near-wallet-selector/react-hook';

export default function HelloNear() {
  const { signedAccountId, viewFunction, callFunction } = useWalletSelector();

  const [greeting, setGreeting] = useState('loading...');
  const [newGreeting, setNewGreeting] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    viewFunction({ contractId: HelloNearContract, method: 'get_greeting' }).then((greeting) => setGreeting(greeting));
  }, []);

  useEffect(() => {
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId]);

  const saveGreeting = async () => {
    // Try to store greeting, revert if it fails
    callFunction({ contractId: HelloNearContract, method: 'set_greeting', args: { greeting: newGreeting } })
      .then(async () => {
        const greeting = await viewFunction({ contractId: HelloNearContract, method: 'get_greeting' });
        setGreeting(greeting);
        setShowSpinner(false);
      });

    // Assume the transaction will be successful and update the UI optimistically
    setShowSpinner(true);
    setGreeting(newGreeting);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Interacting with the contract: &nbsp;
          <code className={styles.code}>{HelloNearContract}</code>
        </p>
      </div>

      <div className={styles.center}>
        <h1 className="w-100">
          The contract says: <code>{greeting}</code>
        </h1>
        <div className="input-group" hidden={!loggedIn}>
          <input
            type="text"
            className="form-control w-20"
            placeholder="Store a new greeting"
            onChange={(t) => setNewGreeting(t.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-secondary" onClick={saveGreeting}>
              <span hidden={showSpinner}> Save </span>
              <i className="spinner-border spinner-border-sm" hidden={!showSpinner}></i>
            </button>
          </div>
        </div>
        <div className="w-100 text-end align-text-center" hidden={loggedIn}>
          <p className="m-0"> Please login to change the greeting </p>
        </div>
      </div>
      <Cards />
    </main>
  );
}
