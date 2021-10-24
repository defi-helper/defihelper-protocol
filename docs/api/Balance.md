## Balance





### Events
```solidity
TreasuryChanged(address treasury)
```





```solidity
InspectorAdded(address inspector)
```





```solidity
InspectorRemoved(address inspector)
```





```solidity
ConsumerAdded(address consumer)
```





```solidity
ConsumerRemoved(address consumer)
```





```solidity
Deposit(address recipient, uint256 amount)
```





```solidity
Refund(address recipient, uint256 amount)
```





```solidity
Claim(address account, uint256 bill, string description)
```





```solidity
AcceptClaim(uint256 bill)
```





```solidity
RejectClaim(uint256 bill)
```






### Variables
```solidity
uint256 MAXIMUM_INSPECTOR_COUNT
```

```solidity
uint256 MAXIMUM_CONSUMER_COUNT
```

```solidity
uint256 MAXIMUM_CLAIM_PACKAGE
```

```solidity
address payable treasury
```

```solidity
struct EnumerableSet.AddressSet _inspectors
```

```solidity
struct EnumerableSet.AddressSet _consumers
```

```solidity
mapping(address => uint256) balanceOf
```

```solidity
mapping(address => uint256) claimOf
```

```solidity
mapping(uint256 => struct Balance.Bill) bills
```

```solidity
uint256 billCount
```


### Functions
```solidity
constructor(address payable _treasury)
```





```solidity
changeTreasury(address payable _treasury)
```

Change treasury contract address.




**Arguments:**
- *_treasury* - New treasury contract address.

```solidity
addInspector(address inspector)
```

Add inspector.




**Arguments:**
- *inspector* - Added inspector.

```solidity
removeInspector(address inspector)
```

Remove inspector.




**Arguments:**
- *inspector* - Removed inspector.

```solidity
inspectors() → address[]
```

Get all inspectors.




**Returns:**
- *All* - inspectors addresses.

```solidity
addConsumer(address consumer)
```

Add consumer.




**Arguments:**
- *consumer* - Added consumer.

```solidity
removeConsumer(address consumer)
```

Remove consumer.




**Arguments:**
- *consumer* - Removed consumer.

```solidity
consumers() → address[]
```

Get all consumers.




**Returns:**
- *All* - consumers addresses.

```solidity
netBalanceOf(address account) → uint256
```

Get net balance of account.




**Arguments:**
- *account* - Target account.


**Returns:**
- *Net* - balance (balance minus claim).

```solidity
deposit(address recipient)
```

Deposit ETH to balance.




**Arguments:**
- *recipient* - Target recipient.

```solidity
refund(uint256 amount)
```

Refund ETH from balance.




**Arguments:**
- *amount* - Refunded amount.

```solidity
claim(address account, uint256 gasFee, uint256 protocolFee, string description) → uint256
```

Send claim.




**Arguments:**
- *account* - Target account.

- *gasFee* - Claim gas fee.

- *protocolFee* - Claim protocol fee.

- *description* - Claim description.

```solidity
acceptClaims(uint256[] _bills, uint256[] gasFees, uint256[] protocolFees)
```

Accept bills package.




**Arguments:**
- *_bills* - Target bills.

- *gasFees* - Confirmed claims gas fees by bills.

- *protocolFees* - Confirmed claims protocol fees by bills.

```solidity
rejectClaims(uint256[] _bills)
```

Reject bills package.




**Arguments:**
- *_bills* - Target bills.

