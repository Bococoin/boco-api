# Boco API
Boco API is a library for interacting with applications built on the Boco Core.

## Install

```
yarn add @bocoplatform/boco-api
```

## Use

Simple example of how to send tokens.

```
import Boco from "@bocoplatform/boco-api"

const STARGATE_URL = "https://lcd.test.boco.bococoin.io"
const ADDRESS = "bocos1abcd1234"
const boco = Boco(STARGATE_URL, ADDRESS)

// create the transaction object
const msg = boco
  .MsgSend({toAddress: 'bocos1abcd09876', amounts: [{ denom: 'BCC', amount: 10 }})

// estimate the needed gas amount
const gasEstimate = await msg.simulate()

// create a signer
const ledgerSigner = ... // async (signMessage: string) => { signature: Buffer, publicKey: Buffer }

// send the transaction
const { included }= await msg.send({ gas: gasEstimate }, ledgerSigner)

// await tx to be included in a block
await included()
```

## API

If you want to query data only, you don't need to specify an address.

```
import { API } from "@bocoplatform/boco-api"

const STARGATE_URL = "https://lcd.test.boco.bococoin.io"

const api = API(STARGATE_URL)

const validators = await api.validators()
```

### Create a sign message to sign with on a Ledger or with any other signer

```
const { signWithPrivateKey } = require('@bococoin/boco-keys');
const { createSignMessage } = require('@bococoin/boco-api');

const stdTx = {
  msg: [
    {
      type: `cosmos-sdk/Send`,
      value: {
        inputs: [
          {
            address: `bocos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66`,
            coins: [{ denom: `BCC`, amount: `1` }]
          }
        ],
        outputs: [
          {
            address: `bocos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt`,
            coins: [{ denom: `BCC`, amount: `1` }]
          }
        ]
      }
    }
  ],
  fee: { amount: [{ denom: ``, amount: `0` }], gas: `21906` },
  signatures: null,
  memo: ``
}

const signMessage = createSignMessage(stdTx, { sequence, accountNumber, chainId });
const signature = signWithPrivateKey(signMessage, Buffer.from(wallet.privateKey, 'hex'));
```

### Create and sign a transaction from a message which then is ready to be broadcast

```
const { signWithPrivateKey } = require('@bocoplatform/boco-keys');
const { createSignedTransaction } = require('@bocoplatform/boco-api');

const sendMsg = {
  type: `cosmos-sdk/Send`,
  value: {
    inputs: [
      {
        address: `bocos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66`,
        coins: [{ denom: `BCC`, amount: `1` }]
      }
    ],
    outputs: [
      {
        address: `bocos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt`,
        coins: [{ denom: `BCC`, amount: `1` }]
      }
    ]
  }
}

const signer = signMessage = > signWithPrivateKey(signMessage, Buffer.from(wallet.privateKey, 'hex'))

const signMessage = createSignedTransaction({ gas: 1000, gasPrices = [{ amount: "10", denom: "ubcc" }], memo = `Hi from Boco Platform` }, [sendMsg], signer, chainId: "test-chain", accountNumber: 0, sequence: 12);
```
