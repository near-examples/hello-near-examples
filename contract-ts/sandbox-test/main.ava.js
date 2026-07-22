import anyTest from 'ava';
import { readFileSync } from 'fs';
import { Sandbox, DEFAULT_ACCOUNT_ID, DEFAULT_PRIVATE_KEY } from 'near-sandbox';
import { Account, JsonRpcProvider, KeyPair, KeyPairSigner, nearToYocto } from 'near-api-js';

/**
 *  @type {import('ava').TestFn<{sandbox: import('near-sandbox').Sandbox, provider: JsonRpcProvider, root: Account, contract: Account}>}
 */
const test = anyTest;

test.beforeEach(async (t) => {
  // Start a fresh sandbox for each test
  const sandbox = await Sandbox.start({});
  const provider = new JsonRpcProvider({ url: sandbox.rpcUrl });

  // All accounts share the sandbox genesis key for simplicity
  const keyPair = KeyPair.fromString(DEFAULT_PRIVATE_KEY);
  const signer = new KeyPairSigner(keyPair);

  const root = new Account(DEFAULT_ACCOUNT_ID, provider, signer);

  await root.createSubAccount({
    accountOrPrefix: 'contract',
    publicKey: keyPair.getPublicKey(),
    nearToTransfer: nearToYocto('30'),
  });

  const contract = new Account(`contract.${DEFAULT_ACCOUNT_ID}`, provider, signer);

  // Deploy the wasm file passed by the package.json test script
  await contract.deployContract(readFileSync(process.argv[2]));

  // Save state for test runs, it is unique for each test
  t.context = { sandbox, provider, root, contract };
});

test.afterEach.always(async (t) => {
  // Stop the sandbox and clean up temporary files
  await t.context.sandbox.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('returns the default greeting', async (t) => {
  const { provider, contract } = t.context;
  const greeting = await provider.callFunction({
    contractId: contract.accountId,
    method: 'get_greeting',
    args: {},
  });
  t.is(greeting, 'Hello');
});

test('changes the greeting', async (t) => {
  const { provider, root, contract } = t.context;
  await root.callFunction({
    contractId: contract.accountId,
    methodName: 'set_greeting',
    args: { greeting: 'Howdy' },
  });
  const greeting = await provider.callFunction({
    contractId: contract.accountId,
    method: 'get_greeting',
    args: {},
  });
  t.is(greeting, 'Howdy');
});
