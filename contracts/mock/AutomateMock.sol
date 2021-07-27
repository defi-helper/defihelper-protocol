// SPDX-License-Identifier: BSD-3-Clause
pragma solidity ^0.8.6;

import "../Automate.sol";

contract AutomateMock is Automate {
  uint256 public protocolFee;

  constructor(address _balance, uint256 _protocolFee) Automate(_balance) {
    protocolFee = _protocolFee;
  }

  function sum(
    uint256 gasFee,
    uint256 x,
    uint256 y
  ) external returns (uint256) {
    _bill(gasFee, protocolFee, "AutomateMock.sum");

    return x + y;
  }
}
