const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { get, deploy } }) => {
  const governor = '0x9853372055811fA68ba489824dB417EbfF3F3Bdc';
  const governanceToken = await get('GovernanceToken');

  await deploy('DelegatorLiquidity', {
    contract: 'contracts/governance/Delegator.sol:Delegator',
    args: [governanceToken.address, governor],
  });
});
module.exports.tags = ['Protocol'];
