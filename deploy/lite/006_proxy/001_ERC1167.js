const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { deploy } }) => {
  await deploy('ERC1167', {});
});
module.exports.tags = ['Protocol'];
