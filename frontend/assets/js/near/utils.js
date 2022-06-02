import { connect, Contract, WalletConnection } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'testnet')

// Initialize contract & set global variables
export async function initContract() {
  // Set a connection to the NEAR network
  const near = await connect(nearConfig)

  // Initialize a Wallet Object (to know if user is signedIn)
  window.walletConnection = new WalletConnection(near)

  // Initialize a Contract Object (to interact with the contract)
  window.contract = await new Contract(
    window.walletConnection.account(), // user's account
    nearConfig.contractName, // contract's account
    {
      viewMethods: ['get_greeting'],
      changeMethods: ['set_greeting'],
    })
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export async function setGreeting(message) {
  let response = await window.contract.set_greeting({
    args: { message: message }
  })
  return response
}

export async function getGreeting() {
  let greeting = await window.contract.get_greeting()
  return greeting;
}