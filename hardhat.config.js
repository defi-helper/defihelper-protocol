require('@nomiclabs/hardhat-ethers');
require('hardhat-deploy');
require('dotenv').config();

function maybeAccount(account) {
  return account ? [account] : [];
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      accounts: {
        mnemonic: process.env.ETH_MNEMONIC || '',
      },
    },
    local: {
      url: 'http://127.0.0.1:8545',
      gasPrice: 12000000000,
      accounts: {
        mnemonic: process.env.ETH_MNEMONIC || '',
      },
    },
    main: {
      url: process.env.ETH_MAIN_NODE || 'http://127.0.0.1:8545',
      chainId: 1,
      gasPrice: 12000000000,
      blockGasLimit: 6000000,
      accounts: [
        ...maybeAccount(process.env.ETH_MAIN_DEPLOYER),
        ...maybeAccount(process.env.ETH_MAIN_INSPECTOR),
        ...maybeAccount(process.env.ETH_MAIN_CONSUMER1),
        ...maybeAccount(process.env.ETH_MAIN_CONSUMER2),
        ...maybeAccount(process.env.ETH_MAIN_CONSUMER3),
      ],
    },
    ropsten: {
      url: process.env.ETH_ROPSTEN_NODE || 'http://127.0.0.1:8545',
      chainId: 3,
      gasPrice: 12000000000,
      blockGasLimit: 6000000,
      accounts: [
        ...maybeAccount(process.env.ETH_ROPSTEN_DEPLOYER),
        ...maybeAccount(process.env.ETH_ROPSTEN_INSPECTOR),
        ...maybeAccount(process.env.ETH_ROPSTEN_CONSUMER1),
        ...maybeAccount(process.env.ETH_ROPSTEN_CONSUMER2),
        ...maybeAccount(process.env.ETH_ROPSTEN_CONSUMER3),
      ],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
      3: 0,
      56: 0,
    },
    priceFeed: {
      default: '0x0000000000000000000000000000000000000000',
      1: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
      3: '0x64125B3eDF8C778c0814A6cd368a133764B1e156',
      56: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
    },
    inspector: {
      default: 1,
      1: 1,
      3: 1,
      56: 1,
    },
    consumer1: {
      default: 2,
      1: 2,
      3: 2,
      56: 2,
    },
    consumer2: {
      default: 3,
      1: 3,
      3: 3,
      56: 3,
    },
    consumer3: {
      default: 4,
      1: 4,
      3: 4,
      56: 4,
    },
  },
};
