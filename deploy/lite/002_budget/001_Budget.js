const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { deploy} }) => {
  await deploy('Budget', {});
});
module.exports.tags = ['Protocol'];
