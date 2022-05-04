const { migration } = require('../../utils');

module.exports = migration(async ({ getNamedAccounts, utils: { read, execute } }) => {
  const { consumer1, consumer2, consumer3 } = await getNamedAccounts();
  const consumers = await read('Balance', {}, 'consumers');

  if (!consumers.includes(consumer1)) {
    await execute('Balance', {}, 'addConsumer', consumer1);
  }
  if (!consumers.includes(consumer2)) {
    await execute('Balance', {}, 'addConsumer', consumer2);
  }
  if (!consumers.includes(consumer3)) {
    await execute('Balance', {}, 'addConsumer', consumer3);
  }
});
module.exports.tags = ['Protocol'];
