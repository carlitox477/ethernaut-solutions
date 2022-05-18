// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IKing {
    function price() external returns(uint);
    function owner() external returns(address payable);
    function _king() external view returns (address payable);
}