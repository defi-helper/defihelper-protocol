const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { get, deploy } }) => {
  const governorBravo = await get('GovernorBravo');

  await deploy('Timelock', {
    args: [
      governorBravo.address,
      2 * 24 * 60 * 60, // 2 days delay
    ]
  });
});
module.exports.tags = ['Governance'];
