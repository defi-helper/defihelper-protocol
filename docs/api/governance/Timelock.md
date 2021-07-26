## Timelock





### Events
```solidity
NewAdmin(address newAdmin)
```





```solidity
NewPendingAdmin(address newPendingAdmin)
```





```solidity
NewDelay(uint256 newDelay)
```





```solidity
CancelTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)
```





```solidity
ExecuteTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)
```





```solidity
QueueTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)
```






### Variables
```solidity
uint256 GRACE_PERIOD
```

```solidity
uint256 MINIMUM_DELAY
```

```solidity
uint256 MAXIMUM_DELAY
```

```solidity
address admin
```

```solidity
address pendingAdmin
```

```solidity
uint256 delay
```

```solidity
mapping(bytes32 => bool) queuedTransactions
```


### Functions
```solidity
constructor(address admin_, uint256 delay_)
```





```solidity
receive()
```





```solidity
setDelay(uint256 delay_)
```





```solidity
acceptAdmin()
```





```solidity
setPendingAdmin(address pendingAdmin_)
```





```solidity
queueTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) → bytes32
```





```solidity
cancelTransaction(address target, uint256 value, string signature, bytes data, uint256 eta)
```





```solidity
executeTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) → bytes
```





