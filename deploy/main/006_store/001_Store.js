const { migration } = require('../../utils');

module.exports = migration(async ({ getNamedAccounts, utils: { get, execute, deploy } }) => {
  const balance = await get('Balance');
  let { priceFeed } = await getNamedAccounts();
  if (priceFeed === '0x0000000000000000000000000000000000000000') {
    await deploy('PriceFeedMock', {
      args: [8, 'ETH / USD', 3],
    });
    await execute('PriceFeedMock', {}, 'addRoundData', 50e8);
    const priceFeedMock = await get('PriceFeedMock');
    priceFeed = priceFeedMock.address;
  }

  await deploy('Store', {
    args: [balance.address, priceFeed],
  });
});
module.exports.tags = ['Protocol'];
