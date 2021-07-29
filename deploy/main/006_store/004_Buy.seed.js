const { ethers } = require('hardhat');
const { migration } = require('../../utils');

module.exports = migration(async ({ getNamedAccounts, utils: { get, read, execute, deploy } }) => {
  const { deployer } = await getNamedAccounts();
  const productId = 1;

  const productPrice = await read('Store', {}, 'price', productId);
  await execute('Balance', { value: productPrice.toString() }, 'deposit', deployer);
  await execute(
    'Store',
    { from: deployer },
    'buy',
    productId,
    deployer,
    productPrice.toString(),
    Math.floor(Date.now() / 1000) + 100,
  );
});
module.exports.tags = ['Seed'];
