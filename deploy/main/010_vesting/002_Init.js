const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { get, execute } }) => {
  const [gov, timelock] = await Promise.all([get('GovernanceToken'), get('Timelock')]);

  await execute('Vesting', {}, 'init', gov.address, timelock.address);
});
module.exports.tags = ['Protocol'];
