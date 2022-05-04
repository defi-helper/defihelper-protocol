const { migration } = require('../../utils');

module.exports = migration(async ({ getNamedAccounts, utils: { get, execute, deploy } }) => {
  await deploy('Storage', {});
});
module.exports.tags = ['Protocol'];
