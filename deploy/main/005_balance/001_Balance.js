const { migration } = require('../../utils');

module.exports = migration(async ({ getNamedAccounts, utils: { get, deploy } }) => {
  const treasury = await get('Treasury');
  const { inspector } = await getNamedAccounts();

  await deploy('Balance', {
    args: [treasury.address, inspector],
  });
});
module.exports.tags = ['Protocol'];
