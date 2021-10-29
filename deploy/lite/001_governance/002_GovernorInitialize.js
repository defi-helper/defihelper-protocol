const hardhat = require('hardhat');
const { migration } = require('../../utils');

module.exports = migration(async ({ utils: { execute } }) => {
  const owners = JSON.parse(process.env[`${hardhat.network.name}_MULTISIG`] ?? '[]');
  if (owners.length === 0) throw new Error('Invalid owners count');

  const howManyOwnersDecide = Math.floor(owners.length * 0.75);
  await execute(
    'GovernorMultisig',
    {},
    'transferOwnershipWithHowMany',
    owners,
    howManyOwnersDecide >= 1 ? howManyOwnersDecide : 1,
  );
});
module.exports.tags = ['Governance'];
