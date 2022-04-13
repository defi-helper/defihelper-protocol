const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { get, execute } }) => {
  const gov = await get('GovernanceToken');

  await execute('Vesting', {}, 'init', gov.address);
});
module.exports.tags = ['Protocol'];
