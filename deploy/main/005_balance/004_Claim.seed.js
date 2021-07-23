const { ethers } = require('hardhat');
const { migration } = require('../../utils');

module.exports = migration(async ({ getNamedAccounts, utils: { get, read, execute, deploy } }) => {
  const { deployer, consumer1, inspector } = await getNamedAccounts();
  const balance = await get('Balance');
  const deposit = ethers.utils.parseEther('1');
  const refund = ethers.utils.parseEther('0.4');
  const claimGasFee = ethers.utils.parseEther('0.05');
  const claimProtocolFee = ethers.utils.parseEther('0.15');

  await execute('Balance', { value: deposit }, 'deposit', deployer);
  await execute('Balance', {}, 'refund', refund);

  await deploy('AutomateMock', {
    args: [balance.address, claimProtocolFee],
  });

  await execute('AutomateMock', { from: consumer1 }, 'sum', claimGasFee, 1, 1);
  await execute('AutomateMock', { from: consumer1 }, 'sum', claimGasFee, 1, 1);

  const lastBill = await read('Balance', {}, 'billCount');
  await execute('Balance', { from: inspector }, 'acceptClaims', [lastBill], [claimGasFee], [claimProtocolFee]);
});
module.exports.tags = ['Seed'];
