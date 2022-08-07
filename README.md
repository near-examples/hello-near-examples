# Hello Near JS Example

## Overview

This simple example will demonstrate how to integrate a smart contract into a decentralized application, and how to store and retrieve information to and from the NEAR blockchain with `call` and `view` methods.

## Installation & Setup

To clone run:

```bash
git clone https://github.com/near-examples/hello-near-js.git
```

enter the folder with:

```bash
cd hello-near-js
```

To download dependencies run:

```bash
yarn
```

or

```bash
npm i
```

## Building Your Smart Contract

The Smart Contract consists of two methods available for the user to call.

```javascript
    @call
    // Public method - accepts a greeting, such as "howdy", and records it
    set_greeting({ message }: { message: string }) {
        near.log(`Saving greeting ${message}`)
        this.message = message;
    }

    @view
    // Public method - returns the greeting saved, defaulting to DEFAULT_MESSAGE
    get_greeting(): string {
        return this.message;
    }

```

A `call` method stores or modifies information that exists in state on the NEAR blockchain. Call methods do incur a gas fee. `Call` methods return no values

A `view` method retrieves information stored on the blockchain. No fee is charged for a view method. View methods always return a value.

`NearBindgen` is a decorator that exposes the state and methods to the user.

To build your smart contract run

```bash
yarn build

```

or

```bash
npm run build
```

This build script will build and deploy your smart contract onto a dev account. Check the terminal logs t ofind the name of the dev account it was deployed to.

example:

```
dev-1659899566943-21539992274727
```

It will also initialize your smart contract for you.

## Calling methods from terminal

This will store the string `"hi user"` onto the NEAR blockchain using the change method defined earlier

```bash
near call <dev account> set_greeting '{"message":"hi user"}' --accountId <your-account-name.testnet>
```

This will return and display your stored message

```bash
near view <dev account> get_greeting '{}' --accountId <your-account.testnet>

```

## Running Frontend

To spin up the frontend run

```bash
yarn start
```

or

```bash
npm run start
```

From there you should be able to modify the greeting.
