## Store





### Events
```solidity
ProductChanged(uint8 product, uint256 priceUSD)
```





```solidity
PriceFeedChanged(address priceFeed)
```





```solidity
Buy(uint8 product, address recipient)
```






### Variables
```solidity
contract Balance balance
```

```solidity
contract AggregatorV3Interface priceFeed
```

```solidity
mapping(uint8 => uint256) products
```


### Functions
```solidity
constructor(address _balance, address _priceFeed)
```





```solidity
changePriceFeed(address _priceFeed)
```

Change price feed oracle address.




**Arguments:**
- *_priceFeed* - New price feed oracle address.

```solidity
changeProduct(uint8 id, uint256 priceUSD)
```

Update product price.




**Arguments:**
- *id* - Product identificator.

- *priceUSD* - Product price in USD with price feed oracle decimals (zero if product is not for sale).

```solidity
pause()
```





```solidity
unpause()
```





```solidity
price(uint8 product) → uint256
```

Get current product price.




**Arguments:**
- *product* - Target product.


**Returns:**
- *Product* - price in ETH.

```solidity
buy(uint8 product, address recipient, uint256 priceMax, uint256 deadline)
```

Buy product.




**Arguments:**
- *product* - Target product.

- *recipient* - Product recipient.

- *priceMax* - Maximum price.

- *deadline* - Timestamp of deadline.

