const { migration } = require('../../utils');

module.exports = migration(async ({ getNamedAccounts, utils: { deploy } }) => {
  const { deployer } = await getNamedAccounts();

  await deploy('GovernanceToken', {
    args: [deployer],
  });
});
module.exports.tags = ['Governance'];
