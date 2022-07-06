const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { get, deploy } }) => {
  const governor = '0x1cBF533BB2A67B0057C93a678433f8370Fd97ebe';
  const governanceToken = await get('GovernanceToken');

  await deploy('DelegatorTeam', {
    contract: 'contracts/governance/Delegator.sol:Delegator',
    args: [governanceToken.address, governor],
  });
});
module.exports.tags = ['Protocol'];
