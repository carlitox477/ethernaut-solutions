
import "./Delegate.sol";

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Delegation {
  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) public {
    delegate = Delegate(_delegateAddress);
    owner = msg.sender;
  }

  fallback() external {
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
    }
    require(result);
  }
}