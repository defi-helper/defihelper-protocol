const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { deploy } }) => {
  await deploy('Vesting', {});
});
module.exports.tags = ['Protocol'];
