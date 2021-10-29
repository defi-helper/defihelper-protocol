const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const gov = await get('GovernorMultisig');
  if ((await read('Store', {}, 'owner')) === gov.address) {
    return;
  }

  await execute('Store', {}, 'transferOwnership', gov.address);
});
module.exports.tags = ['GovernanceOwner'];
