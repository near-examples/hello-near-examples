// Type definitions
interface ContractPerNetwork {
  mainnet: string;
  testnet: string;
}

interface EVMWalletChain {
  chainId: number;
  name: string;
  explorer: string;
  rpc: string;
}

// Contract addresses per network
const contractPerNetwork: ContractPerNetwork = {
  mainnet: 'hello.near-examples.near',
  testnet: 'hello.near-examples.testnet',
};

// Chains for EVM Wallets
const evmWalletChains: Record<'mainnet' | 'testnet', EVMWalletChain> = {
  mainnet: {
    chainId: 397,
    name: 'Near Mainnet',
    explorer: 'https://eth-explorer.near.org',
    rpc: 'https://eth-rpc.mainnet.near.org',
  },
  testnet: {
    chainId: 398,
    name: 'Near Testnet',
    explorer: 'https://eth-explorer-testnet.near.org',
    rpc: 'https://eth-rpc.testnet.near.org',
  },
};

// Selected network
export const NetworkId: 'mainnet' | 'testnet' = 'testnet';

// Contract & EVM chain for the selected network
export const HelloNearContract: string = contractPerNetwork[NetworkId];
export const EVMWalletChain: EVMWalletChain = evmWalletChains[NetworkId];
