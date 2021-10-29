const { migration } = require('../../utils');
const hre = require('hardhat');

module.exports = migration(async ({ getNamedAccounts, utils: { deploy } }) => {
  const { deployer } = await getNamedAccounts();

  await deploy('Balance', {
    args: [deployer],
  });
});
module.exports.tags = ['Protocol'];
