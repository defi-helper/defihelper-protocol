const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { get, deploy } }) => {
  const governorBravo = await get('GovernorBravo');

  await deploy('Timelock', {
    args: [
      governorBravo.address,
      60 * 2, // 2 minutes delay
    ]
  });
});
module.exports.tags = ['Governance'];
