const { strictEqual } = require('assert');
const assertions = require('truffle-assertions');
const { ethers } = require('hardhat');
const bn = require('bignumber.js');

const toBN = (v) => new bn(v.toString());
const nextBlock = () => ethers.provider.send('evm_mine');

describe('Vesting.claim', function () {
  let vesting, token, deployer, owner;
  const amount = new bn('50');
  const duration = 5;
  before(async function () {
    [deployer, owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory('GovernanceToken');
    token = await Token.deploy(deployer.address);
    await token.deployed();

    const Vesting = await ethers.getContractFactory('Vesting');
    vesting = await Vesting.deploy();
    await vesting.deployed();
    await vesting.init(token.address)

    await token.approve(vesting.address, amount.toFixed(0));
    await vesting.distribute(owner.address, amount.toFixed(0), duration);
  });

  it('claim: should revert tx if not owner call', async function () {
    await assertions.reverts(vesting.claim(), 'Vesting: caller is not the owner');
  });

  it('claim: should claim tokens', async function () {
    strictEqual(
      '10',
      await vesting
        .earned()
        .then(toBN)
        .then((v) => v.toString()),
      'Invalid 1 earned',
    );
    strictEqual(
      '0',
      await token
        .balanceOf(owner.address)
        .then(toBN)
        .then((v) => v.toString()),
      'Invalid 1 balance',
    );

    await nextBlock();
    strictEqual(
      '20',
      await vesting
        .earned()
        .then(toBN)
        .then((v) => v.toString()),
      'Invalid 2 earned',
    );

    await vesting.connect(owner).claim();
    strictEqual(
      '0',
      await vesting
        .earned()
        .then(toBN)
        .then((v) => v.toString()),
      'Invalid 3 earned',
    );
    strictEqual(
      '30',
      await token
        .balanceOf(owner.address)
        .then(toBN)
        .then((v) => v.toString()),
      'Invalid 2 balance',
    );

    await nextBlock();
    await nextBlock();
    await nextBlock();
    await nextBlock();
    strictEqual(
      '20',
      await vesting
        .earned()
        .then(toBN)
        .then((v) => v.toString()),
      'Invalid 4 earned',
    );

    await vesting.connect(owner).claim();
    strictEqual(
      '0',
      await vesting
        .earned()
        .then(toBN)
        .then((v) => v.toString()),
      'Invalid 5 earned',
    );
    strictEqual(
      '50',
      await token
        .balanceOf(owner.address)
        .then(toBN)
        .then((v) => v.toString()),
      'Invalid 3 balance',
    );

    await nextBlock();
    strictEqual(
      '0',
      await vesting
        .earned()
        .then(toBN)
        .then((v) => v.toString()),
      'Invalid 6 earned',
    );
  });

  it('claim: should revert tx if earned is zero', async function () {
    await assertions.reverts(vesting.connect(owner).claim(), 'Vesting::claim: empty');
  });
});
