const { migration } = require('../../utils');

module.exports = migration(async ({ getNamedAccounts, utils: { read, execute } }) => {
  const { inspector } = await getNamedAccounts();
  const inspectors = await read('Balance', {}, 'inspectors');

  if (!inspectors.includes(inspector)) {
    await execute('Balance', {}, 'addInspector', inspector);
  }
});
module.exports.tags = ['Protocol'];
