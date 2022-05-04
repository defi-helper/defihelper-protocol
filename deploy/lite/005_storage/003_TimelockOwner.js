const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const gov = await get('GovernorMultisig');
  if ((await read('Storage', {}, 'owner')) === gov.address) {
    return;
  }

  await execute('Storage', {}, 'transferOwnership', gov.address);
});
module.exports.tags = ['GovernanceOwner'];
