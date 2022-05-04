const { migration } = require('../../utils');

module.exports = migration(async ({ getNamedAccounts, utils: { get, execute, deploy } }) => {
  const [storage, treasury] = await Promise.all([get('Storage'), get('Treasury')]);
  const { priceFeed } = await getNamedAccounts();

  await deploy('BuyLiquidity', {
    args: [storage.address, treasury.address, priceFeed],
  });
});
module.exports.tags = ['Protocol'];
