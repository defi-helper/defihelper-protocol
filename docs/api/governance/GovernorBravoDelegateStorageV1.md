## GovernorBravoDelegateStorageV1

For future upgrades, do not change GovernorBravoDelegateStorageV1. Create a new
contract which implements GovernorBravoDelegateStorageV1 and following the naming convention
GovernorBravoDelegateStorageVX.



### Variables
```solidity
uint256 votingDelay
```

```solidity
uint256 votingPeriod
```

```solidity
uint256 proposalThreshold
```

```solidity
uint256 proposalCount
```

```solidity
contract TimelockInterface timelock
```

```solidity
contract GovernanceTokenInterface governanceToken
```

```solidity
mapping(uint256 => struct GovernorBravoDelegateStorageV1.Proposal) proposals
```

```solidity
mapping(address => uint256) latestProposalIds
```


