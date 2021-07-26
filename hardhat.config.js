require('@nomiclabs/hardhat-ethers');
require('hardhat-deploy');
require('dotenv').config();

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
    },
    local: {
      url: 'http://127.0.0.1:8545',
      gasPrice: 12000000000,
      accounts: {
        mnemonic: process.env.ETH_MNEMONIC,
      },
    },
    main: {
      url: process.env.ETH_MAIN,
      chainId: 1,
      gasPrice: 12000000000,
      blockGasLimit: 6000000,
      accounts: [process.env.ETH_MAIN_DEPLOYER],
    },
    ropsten: {
      url: process.env.ETH_ROPSTEN,
      chainId: 3,
      gasPrice: 12000000000,
      blockGasLimit: 6000000,
      accounts: [process.env.ETH_ROPSTEN_DEPLOYER],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
      3: 0,
    },
    inspector: {
      default: 1,
      1: 1,
      3: 1,
    },
    consumer1: {
      default: 2,
      1: 2,
      3: 2,
    },
    consumer2: {
      default: 3,
      1: 3,
      3: 3,
    },
    consumer3: {
      default: 4,
      1: 4,
      3: 4,
    },
  },
};
