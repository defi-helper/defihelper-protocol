const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { deploy} }) => {
  await deploy('GovernorBravo', {});
});
module.exports.tags = ['Protocol'];
