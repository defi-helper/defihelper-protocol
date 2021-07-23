const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const timelock = await get('Timelock');
  if ((await read('Treasury', {}, 'owner')) === timelock.address) {
    return;
  }

  await execute('Treasury', {}, 'transferOwnership', timelock.address);
});
module.exports.tags = ['Protocol'];
