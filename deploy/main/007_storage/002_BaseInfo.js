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
    { method: 'setUint', key: 'DFH:Fee:Automate', value: 10e9 },
    ...[
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
