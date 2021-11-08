const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const gov = await get('GovernorMultisig');
  if ((await read('Treasury', {}, 'owner')) === gov.address) {
    return;
  }

  await execute('Treasury', {}, 'transferOwnership', gov.address);
});
module.exports.tags = ['GovernanceOwner'];
