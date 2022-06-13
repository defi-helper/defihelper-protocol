const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { get, deploy } }) => {
  const governor = '0x0000000000000000000000000000000000000000';
  const governanceToken = await get('GovernanceToken');

  await deploy('Delegator', {
    contract: 'contracts/governance/Delegator.sol:Delegator',
    args: [governanceToken.address, governor],
  });
});
module.exports.tags = ['Protocol'];
