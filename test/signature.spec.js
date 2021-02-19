import {
  createSignature,
  createSignMessage,
  removeEmptyProperties
} from '../src/signature.js'

import _Getters from '../src/getters.js'

import _messages from '../src/messages'
import boco from '../src/index'

describe(`Signing`, () => {
  const tx = {
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
  const txWithNulls = {
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
              x: undefined,
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

  it(`createSignature`, () => {
    const vectors = [
      {
        sequence: `0`,
        account_number: `1`,
        signature: `MEQCIE2f8y5lVAOZu/MDZX3aH+d0sgvTRVrEzdP60NHr7lKJAiBexCiaAsh35R25IhgJMBIp/AD2Lfuk57suV8gnqOSfzg==`,
        publicKey: `03ab1ebbb21aee35154e36aaebc25067177f783f7e967c9d6493e8920c05e40eb5`
      },
      {
        sequence: `1`,
        account_number: `1`,
        signature: `MEQCIE2f8y5lVAOZu/MDZX3aH+d0sgvTRVrEzdP60NHr7lKJAiBexCiaAsh35R25IhgJMBIp/AD2Lfuk57suV8gnqOSfzg==`,
        publicKey: `0243311589af63c2adda04fcd7792c038a05c12a4fe40351b3eb1612ff6b2e5a0e`
      }
    ]

    vectors.forEach(({ signature, sequence, account_number, publicKey }) =>
      expect(
        createSignature(signature, sequence, account_number, publicKey)
      ).toMatchObject({
        signature: signature.toString(`base64`),
        account_number,
        sequence,
        pub_key: {
          type: `tendermint/PubKeySecp256k1`,
          value: publicKey.toString(`base64`)
        }
      })
    )
  })

  it(`createSignMessage`, () => {
    const vectors = [
      {
        tx,
        sequence: `0`,
        accountNumber: `1`,
        chainId: `tendermint_test`,
        signMessage: `{"account_number":"1","chain_id":"tendermint_test","fee":{"amount":[{"amount":"0","denom":""}],"gas":"21906"},"memo":"","msgs":[{"type":"cosmos-sdk/Send","value":{"inputs":[{"address":"bocos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66","coins":[{"amount":"1","denom":"BCC"}]}],"outputs":[{"address":"bocos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt","coins":[{"amount":"1","denom":"BCC"}]}]}}],"sequence":"0"}`
      },
      {
        tx: txWithNulls,
        sequence: `0`,
        accountNumber: `1`,
        chainId: `tendermint_test`,
        signMessage: `{"account_number":"1","chain_id":"tendermint_test","fee":{"amount":[{"amount":"0","denom":""}],"gas":"21906"},"memo":"","msgs":[{"type":"cosmos-sdk/Send","value":{"inputs":[{"address":"bocos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66","coins":[{"amount":"1","denom":"BCC"}]}],"outputs":[{"address":"bocos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt","coins":[{"amount":"1","denom":"BCC"}]}]}}],"sequence":"0"}`
      }
    ]

    vectors.forEach(
      ({ tx, sequence, accountNumber, chainId, signMessage }) => {
        expect(
          createSignMessage(tx, { sequence, accountNumber, chainId })
        ).toBe(signMessage)
      }
    )
  })

  it(`removeEmptyProperties`, () => {
    expect(removeEmptyProperties({
      a: {
        b: undefined,
        c: 1
      },
      d: 'abc',
      e: {
        f: 'g'
      },
      h: null
    })).toEqual({
      a: {
        c: 1
      },
      d: 'abc',
      e: {
        f: 'g'
      }
    })
  })

  it(`getAllBankTxs`, async () => {
    const getters = _Getters('https://lcd.bococoin.com');
    await getters.bankTxs('boco14hf8tx04zcfk7p446vvfmuqu50kl8q8tgq8x0m')
      .then(txs => {console.log(txs)});


  })
  it(`createParameterChangeProposal`, async () => {

    const msg = _messages.ParameterChangeProposal(
      'boco14hf8tx04zcfk7p446vvfmuqu50kl8q8tgq8x0m',
      {
        title: 'test_change',
        description: 'test_desc',
        deposit: [
          {
            amount: '1000',
            denom: 'ubcc'
          }
        ],
        changes: [
          {
            subspace: "staking",
            key: "MaxValidators",
            subkey: "",
            value: "10000"
          }
        ]
      }
    );
    const b = new boco('https://lcd.bococoin.com', 'boco-01');
    var ret = await b.simulate('boco14hf8tx04zcfk7p446vvfmuqu50kl8q8tgq8x0m', {message: msg, memo: 'test_memo'})
    console.log('gas_estimate = ' + ret)
  })
})
