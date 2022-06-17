const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const timelock = await get('Timelock');
  if ((await read('Delegator', {}, 'owner')) === timelock.address) {
    return;
  }

  await execute('Delegator', {}, 'transferOwnership', timelock.address);
});
module.exports.tags = ['GovernanceOwner'];
