const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { execute } }) => {
  return execute('PriceFeedMockEthUsd', {}, 'addRoundData', 300000000000);
});
module.exports.tags = ['Mock', 'Ethereum'];
