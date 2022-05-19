// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IReentrance {
    function balances(address _address) external returns(uint);
    function donate(address _to) external payable;
    function balanceOf(address _who) external view returns (uint balance);
    function withdraw(uint _amount) external;
}