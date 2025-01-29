import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import NearLogo from '/public/near-logo.svg';
import { useWalletSelector } from '@near-wallet-selector/react-hook'

export const Navigation = () => {
  const { signedAccountId, walletSelector, modal } = useWalletSelector();
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (!walletSelector) return;

    if (signedAccountId) {
      setAction(() => walletSelector.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => modal.show);
      setLabel('Login');
    }
  }, [signedAccountId, walletSelector]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link href="/" passHref legacyBehavior>
          <Image priority src={NearLogo} alt="NEAR" width="30" height="24" className="d-inline-block align-text-top" />
        </Link>
        <div className="navbar-nav pt-1">
          <button className="btn btn-secondary" onClick={action}>
            {label}
          </button>
        </div>
      </div>
    </nav>
  );
};
