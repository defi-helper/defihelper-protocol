const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, execute } }) => {
  const { consumer1, consumer2, consumer3, inspector } = await getNamedAccounts();
  const expenditures = [
    { recipient: inspector, min: 1e18, target: 3e18 },
    { recipient: consumer1, min: 1e18, target: 3e18 },
    { recipient: consumer2, min: 1e18, target: 3e18 },
    { recipient: consumer3, min: 1e18, target: 3e18 },
  ];

  await expenditures.reduce(async (prev, { recipient, min, target }) => {
    await prev;
    const currentExpenditure = await read('Budget', {}, 'expenditures', recipient);
    if (currentExpenditure.target.toString() > 0) {
      return null;
    }

    return execute('Budget', {}, 'changeExpenditure', recipient, min.toString(), target.toString());
  }, Promise.resolve(null));
});
module.exports.tags = ['Protocol'];
