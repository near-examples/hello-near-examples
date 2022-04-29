describe("Hello NEAR" , function(){

  let contract

  beforeAll(async function () {
    // NOTE: nearlib and nearConfig are made available by near-cli/test_environment
    const near = await nearlib.connect(nearConfig)
    const accountId = nearConfig.contractName
    contract = await near.loadContract(nearConfig.contractName, {
      viewMethods: ['get_greeting'],
      changeMethods: ['set_greeting'],
      sender: accountId
    })
  })
  
  describe("Greeter", function(){
    it('returns the default greeting', async () => {
      const message = await contract.get_greeting({args:{}})
      expect(message).toBe('Hello')
    })
  
    it('should change the greeting', async () => {
      await contract.set_greeting({args:{message:'howdy'}})
      const message = await contract.get_greeting()
      expect(message).toBe('howdy')
    })
  })
})