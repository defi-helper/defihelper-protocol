const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const gov = await get('GovernorMultisig');
  if ((await read('BuyLiquidity', {}, 'owner')) === gov.address) {
    return;
  }

  await execute('BuyLiquidity', {}, 'transferOwnership', gov.address);
});
module.exports.tags = ['GovernanceOwner'];
