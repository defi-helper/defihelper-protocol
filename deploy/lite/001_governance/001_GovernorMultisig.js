const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { deploy } }) => {
  await deploy('GovernorMultisig', {});
});
module.exports.tags = ['Governance'];
