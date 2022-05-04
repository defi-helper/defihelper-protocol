const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const timelock = await get('Timelock');
  if ((await read('Balance', {}, 'owner')) === timelock.address) {
    return;
  }

  await execute('Balance', {}, 'transferOwnership', timelock.address);
});
module.exports.tags = ['GovernanceOwner'];
