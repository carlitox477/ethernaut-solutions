// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IDelegate {
    function owner()external returns(address);
    function pwn()external;
}