const { Near, Account, Contract } = nearAPI;

describe("Hello NEAR", function () {
  let contract;

  beforeAll(async function () {
    // NOTE: nearlib and nearConfig are made available by near-cli/test_environment
    const near = await new Near(nearConfig);
    const user = await new Account(near.connection, nearConfig.contractName);
    contract = await new Contract(
      user,
      nearConfig.contractName,
      { viewMethods: ["get_greeting"], changeMethods: ["set_greeting"] });
  });

  describe("Greeter", function () {
    it("returns the default greeting", async () => {
      const message = await contract.get_greeting({ args: {} });
      expect(message).toBe("Hello");
    });
    it("should change the greeting", async () => {
      await contract.set_greeting({ args: { message: "howdy" } });
      const message = await contract.get_greeting();
      expect(message).toBe("howdy");
    });
  });
});