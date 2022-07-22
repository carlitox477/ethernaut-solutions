// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface DelegateERC20 {
  function delegateTransfer(address to, uint256 value, address origSender) external returns (bool);
}