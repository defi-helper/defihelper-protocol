const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const timelock = await get('Timelock');
  if ((await read('GovernanceToken', {}, 'owner')) === timelock.address) {
    return;
  }

  await execute('GovernanceToken', {}, 'transferOwnership', timelock.address);
});
module.exports.tags = ['GovernanceOwner'];
