const bn = require('bignumber.js');
const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const timelock = await get('Timelock');
  const governanceToken = await get('GovernanceToken');
  if ((await read('GovernorBravo', {}, 'timelock')) !== '0x0000000000000000000000000000000000000000') {
    return;
  }

  await execute(
    'GovernorBravo',
    {},
    'initialize',
    timelock.address,
    governanceToken.address,
    5760, // Voting period - 24 hours with 15s for 1 block
    1, // Voting delay - 1 block
    new bn(3000000).multipliedBy(new bn(10).pow(18)).toString(10), // Proposal threshold - 3,000,000 DFH
  );
});
module.exports.tags = ['Governance'];
