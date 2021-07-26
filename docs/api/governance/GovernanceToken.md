## GovernanceToken





### Events
```solidity
DelegateChanged(address delegator, address fromDelegate, address toDelegate)
```

An event thats emitted when an account changes its delegate



```solidity
DelegateVotesChanged(address delegate, uint256 previousBalance, uint256 newBalance)
```

An event thats emitted when a delegate account's vote balance changes



```solidity
Transfer(address from, address to, uint256 amount)
```

The standard EIP-20 transfer event



```solidity
Approval(address owner, address spender, uint256 amount)
```

The standard EIP-20 approval event




### Variables
```solidity
string name
```

```solidity
string symbol
```

```solidity
uint8 decimals
```

```solidity
uint256 totalSupply
```

```solidity
mapping(address => mapping(address => uint96)) allowances
```

```solidity
mapping(address => uint96) balances
```

```solidity
mapping(address => address) delegates
```

```solidity
mapping(address => mapping(uint32 => struct GovernanceToken.Checkpoint)) checkpoints
```

```solidity
mapping(address => uint32) numCheckpoints
```

```solidity
bytes32 DOMAIN_TYPEHASH
```

```solidity
bytes32 DELEGATION_TYPEHASH
```

```solidity
mapping(address => uint256) nonces
```


### Functions
```solidity
constructor(address account)
```

Construct a new GovernanceToken token




**Arguments:**
- *account* - The initial account to grant all the tokens

```solidity
mint(address account, uint256 amount)
```

Creates `amount` tokens and assigns them to `account`, increasing
the total supply.





**Arguments:**
- *account* - Recipient of created token.

- *amount* - Amount of token to be created.

```solidity
burn(address account, uint256 amount)
```





**Arguments:**
- *account* - Owner of removed token.

- *amount* - Amount of token to be removed.

```solidity
allowance(address account, address spender) → uint256
```

Get the number of tokens `spender` is approved to spend on behalf of `account`




**Arguments:**
- *account* - The address of the account holding the funds

- *spender* - The address of the account spending the funds


**Returns:**
- *The* - number of tokens approved

```solidity
approve(address spender, uint256 rawAmount) → bool
```

Approve `spender` to transfer up to `amount` from `src`


This will overwrite the approval amount for `spender`
 and is subject to issues noted [here](https://eips.ethereum.org/EIPS/eip-20#approve)


**Arguments:**
- *spender* - The address of the account which may transfer tokens

- *rawAmount* - The number of tokens that are approved (2^256-1 means infinite)


**Returns:**
- *Whether* - or not the approval succeeded

```solidity
balanceOf(address account) → uint256
```

Get the number of tokens held by the `account`




**Arguments:**
- *account* - The address of the account to get the balance of


**Returns:**
- *The* - number of tokens held

```solidity
transfer(address dst, uint256 rawAmount) → bool
```

Transfer `amount` tokens from `msg.sender` to `dst`




**Arguments:**
- *dst* - The address of the destination account

- *rawAmount* - The number of tokens to transfer


**Returns:**
- *Whether* - or not the transfer succeeded

```solidity
transferFrom(address src, address dst, uint256 rawAmount) → bool
```

Transfer `amount` tokens from `src` to `dst`




**Arguments:**
- *src* - The address of the source account

- *dst* - The address of the destination account

- *rawAmount* - The number of tokens to transfer


**Returns:**
- *Whether* - or not the transfer succeeded

```solidity
delegate(address delegatee)
```

Delegate votes from `msg.sender` to `delegatee`




**Arguments:**
- *delegatee* - The address to delegate votes to

```solidity
delegateBySig(address delegatee, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s)
```

Delegates votes from signatory to `delegatee`




**Arguments:**
- *delegatee* - The address to delegate votes to

- *nonce* - The contract state required to match the signature

- *expiry* - The time at which to expire the signature

- *v* - The recovery byte of the signature

- *r* - Half of the ECDSA signature pair

- *s* - Half of the ECDSA signature pair

```solidity
getCurrentVotes(address account) → uint96
```

Gets the current votes balance for `account`




**Arguments:**
- *account* - The address to get votes balance


**Returns:**
- *The* - number of current votes for `account`

```solidity
getPriorVotes(address account, uint256 blockNumber) → uint96
```

Determine the prior number of votes for an account as of a block number


Block number must be a finalized block or else this function will revert to prevent misinformation.


**Arguments:**
- *account* - The address of the account to check

- *blockNumber* - The block number to get the vote balance at


**Returns:**
- *The* - number of votes the account had as of the given block

