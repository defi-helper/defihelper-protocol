## PriceFeedMock





### Variables
```solidity
uint8 decimals
```

```solidity
string description
```

```solidity
uint256 version
```

```solidity
mapping(uint80 => struct PriceFeedMock.Round) _rounds
```

```solidity
uint80 latestRound
```


### Functions
```solidity
constructor(uint8 _decimals, string _description, uint256 _version)
```





```solidity
addRoundData(int256 answer)
```





```solidity
getRoundData(uint80 _roundId) → uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound
```





```solidity
latestRoundData() → uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound
```





