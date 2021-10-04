const { migration } = require('../../utils');
const { network } = require('hardhat');
const { utils } = require('ethers');

const defaultChainId = 31337;

module.exports = migration(async ({ utils: { get, execute } }) => {
  const { deployer } = await getNamedAccounts();
  const [timelock, govToken, governor, balance, treasury, budget, store] = await Promise.all([
    get('Timelock'),
    get('GovernanceToken'),
    get('GovernorBravo'),
    get('Balance'),
    get('Treasury'),
    get('Budget'),
    get('Store'),
  ]);
  const values = [
    { method: 'setAddress', key: 'DFH:Contract:Timelock', value: timelock.address },
    { method: 'setAddress', key: 'DFH:Contract:GovernanceToken', value: govToken.address },
    { method: 'setAddress', key: 'DFH:Contract:Governor', value: governor.address },
    { method: 'setAddress', key: 'DFH:Contract:Treasury', value: treasury.address },
    { method: 'setAddress', key: 'DFH:Contract:Budget', value: budget.address },
    { method: 'setAddress', key: 'DFH:Contract:Balance', value: balance.address },
    { method: 'setAddress', key: 'DFH:Contract:Store', value: store.address },
    { method: 'setAddress', key: 'DFH:Pauser', value: deployer },
    { method: 'setUint', key: 'DFH:Fee:Automate', value: 1e8 },
    ...[
      {
        method: 'setAddress',
        key: 'DFH:Fee:PriceFeed',
        value: {
          1: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
          4: '0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F',
          42: '	0x9326BFA02ADD2366b30bacB125260Af641031331',
          56: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
          97: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526',
          137: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
        }[network.config.chainId ?? defaultChainId],
      },
      {
        method: 'setAddress',
        key: 'UniswapV2:Contract:Router2',
        value: {
          1: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
          3: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
          4: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
          5: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
          42: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
          [defaultChainId]: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
        }[network.config.chainId ?? defaultChainId],
      },
      {
        method: 'setAddress',
        key: 'PancakeSwapV2:Contract:Router2',
        value: {
          56: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
          97: '0xd99d1c33f9fc3444f8101754abc46c52416550d1',
        }[network.config.chainId ?? defaultChainId],
      },
    ].filter(({ value }) => value !== undefined),
  ];

  await values.reduce(async (prev, { key, method, value }) => {
    await prev;
    return execute('Storage', {}, method, utils.keccak256(utils.toUtf8Bytes(key)), value);
  }, Promise.resolve(null));
});
module.exports.tags = ['Protocol'];
