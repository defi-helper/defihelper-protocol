const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const products = [
    { id: 1, priceUSD: 10e8 },
    { id: 2, priceUSD: 100e8 },
  ];

  await products.reduce(async (prev, { id, priceUSD }) => {
    await prev;
    const currentPrice = await read('Store', {}, 'products', id);
    if (currentPrice.toString() > 0) {
      return null;
    }

    return execute('Store', {}, 'changeProduct', id, priceUSD);
  }, Promise.resolve(null));
});
module.exports.tags = ['Protocol'];
