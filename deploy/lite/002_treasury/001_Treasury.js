const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { deploy} }) => {
  await deploy('Treasury', {});
});
module.exports.tags = ['Protocol'];
