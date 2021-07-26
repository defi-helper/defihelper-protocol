## GovernorBravo





### Variables
```solidity
string name
```

```solidity
uint256 MIN_PROPOSAL_THRESHOLD
```

```solidity
uint256 MAX_PROPOSAL_THRESHOLD
```

```solidity
uint256 MIN_VOTING_PERIOD
```

```solidity
uint256 MAX_VOTING_PERIOD
```

```solidity
uint256 MIN_VOTING_DELAY
```

```solidity
uint256 MAX_VOTING_DELAY
```

```solidity
uint256 quorumVotes
```

```solidity
uint256 proposalMaxOperations
```

```solidity
bytes32 DOMAIN_TYPEHASH
```

```solidity
bytes32 BALLOT_TYPEHASH
```


### Functions
```solidity
initialize(address timelock_, address governanceToken_, uint256 votingPeriod_, uint256 votingDelay_, uint256 proposalThreshold_)
```

Used to initialize the contract during delegator contructor




**Arguments:**
- *timelock_* - The address of the Timelock

- *governanceToken_* - The address of the governance token

- *votingPeriod_* - The initial voting period

- *votingDelay_* - The initial voting delay

- *proposalThreshold_* - The initial proposal threshold

```solidity
propose(address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, string description) → uint256
```

Function used to propose a new proposal. Sender must have delegates above the proposal threshold




**Arguments:**
- *targets* - Target addresses for proposal calls

- *values* - Eth values for proposal calls

- *signatures* - Function signatures for proposal calls

- *calldatas* - Calldatas for proposal calls

- *description* - String description of the proposal


**Returns:**
- *Proposal* - id of new proposal

```solidity
queue(uint256 proposalId)
```

Queues a proposal of state succeeded




**Arguments:**
- *proposalId* - The id of the proposal to queue

```solidity
execute(uint256 proposalId)
```

Executes a queued proposal if eta has passed




**Arguments:**
- *proposalId* - The id of the proposal to execute

```solidity
cancel(uint256 proposalId)
```

Cancels a proposal only if sender is the proposer, or proposer delegates dropped below proposal threshold




**Arguments:**
- *proposalId* - The id of the proposal to cancel

```solidity
getActions(uint256 proposalId) → address[] targets, uint256[] values, string[] signatures, bytes[] calldatas
```

Gets actions of a proposal




**Arguments:**
- *proposalId* - the id of the proposal


**Returns:**
- *targets* - Targets of the proposal actions

- *values* - Values of the proposal actions

- *signatures* - Signatures of the proposal actions

- *calldatas* - Calldatas of the proposal actions

```solidity
getReceipt(uint256 proposalId, address voter) → struct GovernorBravoDelegateStorageV1.Receipt
```

Gets the receipt for a voter on a given proposal




**Arguments:**
- *proposalId* - the id of proposal

- *voter* - The address of the voter


**Returns:**
- *The* - voting receipt

```solidity
state(uint256 proposalId) → enum GovernorBravoDelegateStorageV1.ProposalState
```

Gets the state of a proposal




**Arguments:**
- *proposalId* - The id of the proposal


**Returns:**
- *Proposal* - state

```solidity
castVote(uint256 proposalId, uint8 support)
```

Cast a vote for a proposal




**Arguments:**
- *proposalId* - The id of the proposal to vote on

- *support* - The support value for the vote. 0=against, 1=for, 2=abstain

```solidity
castVoteWithReason(uint256 proposalId, uint8 support, string reason)
```

Cast a vote for a proposal with a reason




**Arguments:**
- *proposalId* - The id of the proposal to vote on

- *support* - The support value for the vote. 0=against, 1=for, 2=abstain

- *reason* - The reason given for the vote by the voter

```solidity
castVoteBySig(uint256 proposalId, uint8 support, uint8 v, bytes32 r, bytes32 s)
```

Cast a vote for a proposal by signature


External function that accepts EIP-712 signatures for voting on proposals.

```solidity
_setVotingDelay(uint256 newVotingDelay)
```

Admin function for setting the voting delay




**Arguments:**
- *newVotingDelay* - new voting delay, in blocks

```solidity
_setVotingPeriod(uint256 newVotingPeriod)
```

Admin function for setting the voting period




**Arguments:**
- *newVotingPeriod* - new voting period, in blocks

```solidity
_setProposalThreshold(uint256 newProposalThreshold)
```

Admin function for setting the proposal threshold


newProposalThreshold must be greater than the hardcoded min


**Arguments:**
- *newProposalThreshold* - new proposal threshold

```solidity
_setPendingAdmin(address newPendingAdmin)
```

Begins transfer of admin rights. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.


Admin function to begin change of admin. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.


**Arguments:**
- *newPendingAdmin* - New pending admin.

```solidity
_acceptAdmin()
```

Accepts transfer of admin rights. msg.sender must be pendingAdmin


Admin function for pending admin to accept role and update admin

