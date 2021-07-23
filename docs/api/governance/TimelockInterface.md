## TimelockInterface





### Functions
```solidity
delay() → uint256
```





```solidity
GRACE_PERIOD() → uint256
```





```solidity
acceptAdmin()
```





```solidity
queuedTransactions(bytes32 hash) → bool
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





