## ProxyFactory





### Events
```solidity
ProxyCreated(address prototype, address proxy)
```






### Functions
```solidity
create(address prototype, bytes args) → address proxy
```

Create proxy contract by prototype.




**Arguments:**
- *prototype* - Address of prototype contract.

- *args* - Encoded call to the init function.

