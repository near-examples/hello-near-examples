const contractPerNetwork = {
  mainnet: 'hello.near-examples.near',
  testnet: 'hello.near-examples.testnet',
};

const evmWalletChains = {
  testnet: {
    nearEnv: "testnet",
    chainId: 398,
    walletExplorerUrl: "https://eth-explorer-testnet.near.org",
    explorerUrl: "https://testnet.nearblocks.io",
    ethRpcForNear: "https://eth-rpc.testnet.near.org",
    nearNativeRpc: "https://rpc.testnet.near.org"
  },
  mainnet: {
    chainId: 397,
    nearEnv: "mainnet",
    walletExplorerUrl: "https://eth-explorer.near.org",
    explorerUrl: "https://nearblocks.io",
    ethRpcForNear: "https://eth-rpc.mainnet.near.org",
    nearNativeRpc: "https://rpc.mainnet.near.org"
  }
}

export const NetworkId = 'testnet';
export const HelloNearContract = contractPerNetwork[NetworkId];
export const EVMWalletChain = evmWalletChains[NetworkId];
