const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const gov = await get('GovernorMultisig');
  if ((await read('Budget', {}, 'owner')) === gov.address) {
    return;
  }

  await execute('Budget', {}, 'transferOwnership', gov.address);
});
module.exports.tags = ['GovernanceOwner'];
