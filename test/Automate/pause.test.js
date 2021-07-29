const { strictEqual } = require('assert');
const assertions = require('truffle-assertions');
const { ethers } = require('hardhat');
const bn = require('bignumber.js');

describe('Automate._bill', function () {
  let automate, balance;
  let account, notOwner;
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  const protocolFee = (1e18).toString();
  const gasPrice = (1e9).toString();
  before(async function () {
    const Balance = await ethers.getContractFactory('Balance');
    balance = await Balance.deploy(zeroAddress, zeroAddress);
    await balance.deployed();

    const AutomateMock = await ethers.getContractFactory('AutomateMock');
    automate = await AutomateMock.deploy(balance.address, protocolFee.toString());
    await automate.deployed();

    [account, notOwner] = await ethers.getSigners();
    await balance.deposit(account.address, {
      value: ethers.utils.parseEther('10'),
      gasPrice: 0,
    });
    estimateGas = (await automate.estimateGas.sum(1, 1, 2)).toString();
  });

  it('pause: should pause bill maker', async function () {
    const gasLimit = new bn(estimateGas).multipliedBy(1.1).toFixed(0);
    const gasFee = new bn(gasLimit).multipliedBy(gasPrice).toString();

    await automate.pause();

    await assertions.reverts(
      automate.sum(gasFee, 1, 2, {
        gasLimit,
        gasPrice,
      }),
      'Pausable: paused',
    );
  });

  it('pause: should revert tx if not owner call', async function () {
    await assertions.reverts(automate.connect(notOwner).pause(), 'Ownable: caller is not the owner');
  });

  it('pause: should unpause bill maker', async function () {
    const gasLimit = new bn(estimateGas).multipliedBy(1.1).toFixed(0);
    const gasFee = new bn(gasLimit).multipliedBy(gasPrice).toString();

    await automate.unpause();

    await automate.sum(gasFee, 1, 2, {
      gasLimit,
      gasPrice,
    });
  });

  it('unpause: should revert tx if not owner call', async function () {
    await assertions.reverts(automate.connect(notOwner).unpause(), 'Ownable: caller is not the owner');
  });
});
