const { migration } = require('../../utils');

module.exports = migration(async ({ getNamedAccounts, utils: { get, deploy } }) => {
  const treasury = await get('Treasury');

  await deploy('Balance', {
    args: [treasury.address],
  });
});
module.exports.tags = ['Protocol'];
