const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { get, deploy } }) => {
  const governor = '0x401afFBFAE54260E51da27462e51b27524eaBa4A';
  const governanceToken = await get('GovernanceToken');

  await deploy('DelegatorDevelopment', {
    contract: 'contracts/governance/Delegator.sol:Delegator',
    args: [governanceToken.address, governor],
  });
});
module.exports.tags = ['Protocol'];
