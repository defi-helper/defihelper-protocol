const { strictEqual } = require('assert');
const assertions = require('truffle-assertions');
const { ethers } = require('hardhat');
const bn = require('bignumber.js');

describe('Treasury.transferETH', function () {
  let treasury;
  let account, other;
  const transferAmount = ethers.utils.parseEther('1.0');
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  before(async function () {
    const Treasury = await ethers.getContractFactory('Treasury');
    treasury = await Treasury.deploy();
    await treasury.deployed();

    [account, other] = await ethers.getSigners();
    await account.sendTransaction({
      to: treasury.address,
      value: transferAmount,
    });
  });

  it('transferETH: should transfer ETH to recipient', async function () {
    const startAccountBalance = (await ethers.provider.getBalance(account.address)).toString();
    const startTreasuryBalance = (await ethers.provider.getBalance(treasury.address)).toString();

    await treasury.transferETH(account.address, transferAmount.toString(), {
      gasPrice: 0,
    });

    strictEqual(
      (await ethers.provider.getBalance(account.address)).toString(),
      new bn(startAccountBalance).plus(transferAmount.toString()).toString(10),
      'Invalid end account balance',
    );
    strictEqual(
      (await ethers.provider.getBalance(treasury.address)).toString(),
      new bn(startTreasuryBalance).minus(transferAmount.toString()).toString(10),
      'Invalid end treasury balance',
    );
  });

  it('transferETH: should revert tx if amount zero', async function () {
    await assertions.reverts(
      treasury.transferETH(account.address, 0),
      'Treasury::transferETH: negative or zero amount',
    );
  });

  it('transferETH: should revert tx if recipient is zero address', async function () {
    await assertions.reverts(
      treasury.transferETH(zeroAddress, transferAmount),
      'Treasury::transferETH: invalid recipient',
    );
  });

  it('transferETH: should revert tx if not owner call', async function () {
    await assertions.reverts(
      treasury.connect(other).transferETH(account.address, transferAmount),
      'Ownable: caller is not the owner',
    );
  });
});
