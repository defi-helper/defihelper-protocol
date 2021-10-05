const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { deploy } }) => {
  await deploy('PriceFeedMockEthUsd', {
    contract: 'PriceFeedMock',
    args: [8, 'ETH / USD', 4],
  });
});
module.exports.tags = ['Mock', 'Ethereum'];
