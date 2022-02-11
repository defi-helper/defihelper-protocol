// SPDX-License-Identifier: BSD-3-Clause
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../IRouter.sol";

contract RouterMock is IRouter {
  address public lpToken;

  constructor(address _lpToken) {
    lpToken = _lpToken;
  }

  function swapExactTokensForTokens(
    uint256 amountIn,
    uint256 amountOutMin,
    address[] calldata path,
    address to,
    uint256
  ) public override returns (uint256[] memory amounts) {
    IERC20(path[0]).transferFrom(msg.sender, address(this), amountIn);
    IERC20(path[path.length - 1]).transfer(to, amountOutMin);

    return amounts;
  }

  function swapExactTokensForTokensSupportingFeeOnTransferTokens(
    uint256 amountIn,
    uint256 amountOutMin,
    address[] calldata path,
    address to,
    uint256 deadline
  ) external override {
    swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline);
  }

  function addLiquidity(
    address tokenA,
    address tokenB,
    uint256 amountADesired,
    uint256 amountBDesired,
    uint256,
    uint256,
    address to,
    uint256
  )
    external
    override
    returns (
      uint256 amountA,
      uint256 amountB,
      uint256 liquidity
    )
  {
    amountA = amountADesired;
    IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
    amountB = amountBDesired;
    IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);
    liquidity = 10e18;
    IERC20(lpToken).transfer(to, liquidity);
  }
}
