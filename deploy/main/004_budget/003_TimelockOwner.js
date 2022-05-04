const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const timelock = await get('Timelock');
  if ((await read('Budget', {}, 'owner')) === timelock.address) {
    return;
  }

  await execute('Budget', {}, 'transferOwnership', timelock.address);
});
module.exports.tags = ['GovernanceOwner'];
