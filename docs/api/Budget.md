## Budget





### Events
```solidity
ExpenditureChanged(address recipient, uint256 min, uint256 target)
```





```solidity
Withdrawal(address recipient, uint256 amount)
```






### Variables
```solidity
uint256 MAXIMUM_RECIPIENT_COUNT
```



```solidity
mapping(address => struct Budget.Expenditure) expenditures
```



```solidity
struct EnumerableSet.AddressSet _recipients
```



```solidity
mapping(address => uint256) balanceOf
```



```solidity
uint256 totalSupply
```




### Functions
```solidity
receive()
```





```solidity
changeExpenditure(address recipient, uint256 min, uint256 target)
```

Change expenditure item.




**Arguments:**
- *recipient* - Recipient address.

- *min* - Minimal balance for payment.

- *target* - Target balance.

```solidity
transferETH(address payable recipient, uint256 amount)
```

Transfer ETH to recipient.




**Arguments:**
- *recipient* - Recipient.

- *amount* - Transfer amount.

```solidity
recipients() → address[]
```

Return all recipients addresses.




**Returns:**
- *Recipients* - addresses.

```solidity
deficitTo(address recipient) → uint256
```

Return balance deficit of recipient.




**Arguments:**
- *recipient* - Target recipient.


**Returns:**
- *Balance* - deficit of recipient.

```solidity
deficit() → uint256
```

Return summary balance deficit of all recipients.




**Returns:**
- *Summary* - balance deficit of all recipients.

```solidity
pay()
```

Pay ETH to all recipients with balance deficit.



```solidity
withdraw()
```

Withdraw ETH to recipient.



