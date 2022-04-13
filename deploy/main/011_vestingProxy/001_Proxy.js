const { migration } = require('../../utils');
const { ethers } = require('hardhat');

module.exports = migration(async ({ utils: { get, execute } }) => {
  const [vesting, gov] = await Promise.all([get('Vesting'), get('GovernanceToken')]);

  const receipt = await execute(
    'ProxyFactory',
    {
      gasLimit: 150000
    },
    'create',
    vesting.address,
    new ethers.utils.Interface(vesting.abi).encodeFunctionData('init', [gov.address]),
  );

  const createEvent = receipt.events.find(({ event }) => event === 'ProxyCreated');
  if (!createEvent) return;
  const { proxy } = createEvent.args;
  console.log('Proxy address: ', proxy);
});
module.exports.tags = ['Protocol'];
