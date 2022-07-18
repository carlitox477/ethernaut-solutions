// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

interface IDenial {
    function partner() external returns(address);
    function owner() external returns(address);
    function timeLastWithdrawn() external returns(uint);
    function withdrawPartnerBalances(address _partner) external returns(uint);
    function setWithdrawPartner(address _partner) external;
    function withdraw() external;
    function contractBalance() external returns(uint);
}