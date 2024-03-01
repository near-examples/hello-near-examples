import { Worker, NearAccount } from 'near-workspaces';
import anyTest, { TestFn } from 'ava';
import { setDefaultResultOrder } from 'dns'; setDefaultResultOrder('ipv4first'); // temp fix for node >v17

// Global context
let worker: Worker;
let accounts: Record<string, NearAccount>;

const test = anyTest as TestFn<{}>;

test.before(async (t) => {
  // Init the worker and start a Sandbox server
  worker = await Worker.init();

  t.assert(false);
  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');
  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  accounts = { root, contract };
});

test.after.always(async (t) => {
  // Stop Sandbox server
  await worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('returns the default greeting', async (t) => {
  const { contract } = accounts;
  const greeting: string = await contract.view('get_greeting', {});
  t.is(greeting, 'Hello');
});

test('changes the greeting', async (t) => {
  const { root, contract } = accounts;
  await root.call(contract, 'set_greeting', { greeting: 'Howdy' });
  const greeting: string = await contract.view('get_greeting', {});
  t.is(greeting, 'Howdy');
});