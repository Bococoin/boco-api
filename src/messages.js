// Bank
export function MsgSend (
  senderAddress,
  {
    toAddress,
    amounts // [{ denom, amount}]
  }
) {
  return {
    type: `cosmos-sdk/MsgSend`,
    value: {
      from_address: senderAddress,
      to_address: toAddress,
      amount: amounts.map(Coin)
    }
  }
}

// SignVerify
export function MsgSignMessage (
  senderAddress,
  {
    Message
  }
) {
  return {
    type: `cosmos-sdk/MsgSignMessage`,
    value: {
      signerAddress: senderAddress,
      message: Message
    }
  }
}

// Staking
export function MsgDelegate (
  senderAddress,
  {
    validatorAddress,
    amount,
    denom
  }
) {
  return {
    type: `cosmos-sdk/MsgDelegate`,
    value: {
      delegator_address: senderAddress,
      validator_address: validatorAddress,
      amount: Coin({ amount, denom })
    }
  }
}

export function MsgUndelegate (
  senderAddress,
  {
    validatorAddress,
    amount,
    denom
  }
) {
  return {
    type: `cosmos-sdk/MsgUndelegate`,
    value: {
      validator_address: validatorAddress,
      delegator_address: senderAddress,
      amount: Coin({ amount, denom })
    }
  }
}

export function MsgRedelegate (
  senderAddress,
  {
    validatorSourceAddress,
    validatorDestinationAddress,
    amount,
    denom
  }
) {
  return {
    type: `cosmos-sdk/MsgBeginRedelegate`,
    value: {
      delegator_address: senderAddress,
      validator_src_address: validatorSourceAddress,
      validator_dst_address: validatorDestinationAddress,
      amount: Coin({ amount, denom })
    }
  }
}

// Governance

export function MsgSubmitProposal (
  senderAddress,
  {
    proposalType,
    title,
    description,
    fundcycle,
    initialRequestedFunds,
    initialDeposits // [{ denom, amount }]
  }
) {
  return {
    type: `cosmos-sdk/MsgSubmitProposal`,
    value: {
      proposer: senderAddress,
      proposal_type: proposalType,
      title,
      description,
      funding_cycle: fundcycle,
      requested_fund: initialRequestedFunds.map(Coin),
      initial_deposit: initialDeposits.map(Coin)
    }
  }
}
export function MsgSubmitParameterChangeProposal (
  senderAddress,
  {
    title,
    description,
    deposit, // [{ denom, amount }]
    changes
  }
) {
  return {
    type: `cosmos-sdk/MsgSubmitProposal`,
    value: {
      content: {
        type: `cosmos-sdk/ParameterChangeProposal`,
        value: {
          title,
          description,
          changes,
        },
      },
      initial_deposit: deposit,
      proposer: senderAddress,
    }
  }
}
export function ParameterChangeProposal (
  senderAddress,
  {
    title,
    description,
    deposit, // [{ denom, amount }]
    changes
  }
) {
  return {
    type: `cosmos-sdk/ParameterChangeProposal`,
    value: {
      proposer: senderAddress,
      title,
      description,
      deposit: deposit,
      changes
    }
  }
}

export function MsgVote (
  senderAddress,
  {
    proposalId,
    option
  }
) {
  return {
    type: `cosmos-sdk/MsgVote`,
    value: {
      voter: senderAddress,
      proposal_id: proposalId,
      option
    }
  }
}

export function MsgDeposit (
  senderAddress,
  {
    proposalId,
    amounts // [{ denom, amount }]
  }
) {
  return {
    type: `cosmos-sdk/MsgDeposit`,
    value: {
      depositor: senderAddress,
      proposal_id: proposalId,
      amount: amounts.map(Coin)
    }
  }
}

export function MsgWithdrawDelegationReward (
  senderAddress,
  {
    validatorAddress
  }
) {
  return {
    type: `cosmos-sdk/MsgWithdrawDelegationReward`,
    value: {
      delegator_address: senderAddress,
      validator_address: validatorAddress
    }
  }
}

function Coin ({ amount, denom }) {
  return ({
    amount: String(amount),
    denom
  })
}

export default {
  'MsgSend': MsgSend,
  'MsgDelegate': MsgDelegate,
  'MsgUndelegate': MsgUndelegate,
  'MsgRedelegate': MsgRedelegate,
  'MsgSubmitProposal': MsgSubmitProposal,
  'MsgVote': MsgVote,
  'MsgDeposit': MsgDeposit,
  'MsgWithdrawDelegationReward': MsgWithdrawDelegationReward,
  'ParameterChangeProposal' : ParameterChangeProposal,
  'MsgSubmitParameterChangeProposal':MsgSubmitParameterChangeProposal
}
