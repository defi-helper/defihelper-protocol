const { strictEqual } = require('assert');
const assertions = require('truffle-assertions');
const { ethers } = require('hardhat');

describe('Balance.inspector', function () {
  let balance;
  let newInspector;
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  before(async function () {
    const Balance = await ethers.getContractFactory('Balance');
    balance = await Balance.deploy(zeroAddress, zeroAddress);
    await balance.deployed();

    [, newInspector] = await ethers.getSigners();
  });

  it('inspector: should return inspector oracle address', async function () {
    strictEqual(await balance.inspector(), zeroAddress, 'Invalid inspector address');
  });

  it('changeInspector: should change inspector oracle address', async function () {
    await balance.changeInspector(newInspector.address);

    strictEqual(await balance.inspector(), newInspector.address, 'Invalid inspector address');
  });

  it('changeInspector: should revert tx if not owner call', async function () {
    await assertions.reverts(
      balance.connect(newInspector).changeInspector(newInspector.address),
      'Ownable: caller is not the owner',
    );
  });
});
