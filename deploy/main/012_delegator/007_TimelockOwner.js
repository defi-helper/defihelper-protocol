const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { read, get, execute } }) => {
  const timelock = await get('Timelock');
  if ((await read('DelegatorDevelopment', {}, 'owner')) !== timelock.address) {
    await execute('DelegatorDevelopment', {}, 'transferOwnership', timelock.address);
  }
  if ((await read('DelegatorTeam', {}, 'owner')) !== timelock.address) {
    await execute('DelegatorTeam', {}, 'transferOwnership', timelock.address);
  }
  if ((await read('DelegatorMarketing', {}, 'owner')) !== timelock.address) {
    await execute('DelegatorMarketing', {}, 'transferOwnership', timelock.address);
  }
  if ((await read('DelegatorEarlyEcosystem', {}, 'owner')) !== timelock.address) {
    await execute('DelegatorEarlyEcosystem', {}, 'transferOwnership', timelock.address);
  }
  if ((await read('DelegatorAdvisors', {}, 'owner')) !== timelock.address) {
    await execute('DelegatorAdvisors', {}, 'transferOwnership', timelock.address);
  }
  if ((await read('DelegatorLiquidity', {}, 'owner')) !== timelock.address) {
    await execute('DelegatorLiquidity', {}, 'transferOwnership', timelock.address);
  }
});
module.exports.tags = ['GovernanceOwner'];
