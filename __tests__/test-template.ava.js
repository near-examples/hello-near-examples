import { Worker } from "near-workspaces";
import test from "ava";

test.beforeEach(async (t) => {
    // Init the worker and start a Sandbox server
    const worker = await Worker.init();

    // Prepare sandbox for tests, create accounts, deploy contracts, etc.
    const root = worker.rootAccount;

    // Deploy the counter contract.
    const contract = await root.devDeploy("./build/contract.wasm", {
        method: "init",
        args: {},
    });

    // Init the contract
    await contract.call(contract, "init", {});

    // Test users
    const ali = await root.createSubAccount("ali");
    const bob = await root.createSubAccount("bob");

    // Save state for test runs
    t.context.worker = worker;
    t.context.accounts = { root, contract, ali, bob };
});

// If the environment is reused, use test.after to replace test.afterEach
test.afterEach(async (t) => {
    await t.context.worker.tearDown().catch((error) => {
        console.log("Failed to tear down the worker:", error);
    });
});

test("returns the default greeting", async (t) => {
    const { contract } = t.context.accounts;
    const message = await contract.view("get_greeting", {});
    t.is(message, "Hello");
});

test("changes the message", async (t) => {
    const { root, contract } = t.context.accounts;
    await root.call(contract, "set_greeting", { message: "Howdy" });
    const message = await contract.view("get_greeting", {});
    t.is(message, "Howdy");
});
