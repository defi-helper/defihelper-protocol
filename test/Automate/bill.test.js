const { strictEqual } = require('assert');
const assertions = require('truffle-assertions');
const { ethers } = require('hardhat');
const bn = require('bignumber.js');

describe('Automate._bill', function () {
  let automate, balance;
  let account;
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

    [account] = await ethers.getSigners();
    await balance.addConsumer(account.address);
    await balance.changeInspector(account.address);
    await balance.deposit(account.address, {
      value: ethers.utils.parseEther('10'),
      gasPrice: 0,
    });
    estimateGas = (await automate.estimateGas.sum(1, 1, 2)).toString();
  });

  it('_bill: should register bill to balance', async function () {
    const gasLimit = new bn(estimateGas).multipliedBy(1.1).toFixed(0);
    const gasFee = new bn(gasLimit).multipliedBy(gasPrice).toString();
    await automate.sum(gasFee, 1, 2, {
      gasLimit,
      gasPrice,
    });

    const billId = await balance.billCount();
    const bill = await balance.bills(billId);
    strictEqual(bill.account, account.address, 'Invalid bill account');
    strictEqual(bill.gasFee.toString(), gasFee, 'Invalid gas fee');
    strictEqual(bill.protocolFee.toString(), protocolFee, 'Invalid protocol fee');
  });

  it('_bill: fee oracle should control real gas fee', async function () {
    const [event] = await balance.queryFilter('Claim');
    const [tx, txReceipt, bill] = await Promise.all([
      event.getTransaction(),
      event.getTransactionReceipt(),
      balance.bills(event.args.bill.toString()),
    ]);

    strictEqual(txReceipt.gasUsed.toString() < tx.gasLimit.toString(), true, 'Invalid gas used');
    await balance.acceptClaims(
      [bill.id],
      [new bn(txReceipt.gasUsed.toString()).multipliedBy(tx.gasPrice.toString()).toString()],
      [bill.protocolFee.toString()],
    );
  });
});
