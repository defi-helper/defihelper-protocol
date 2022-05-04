const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const gov = await get('GovernorMultisig');
  if ((await read('Balance', {}, 'owner')) === gov.address) {
    return;
  }

  await execute('Balance', {}, 'transferOwnership', gov.address);
});
module.exports.tags = ['GovernanceOwner'];
