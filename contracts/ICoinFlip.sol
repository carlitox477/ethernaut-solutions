// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface ICoinFlip {
    function consecutiveWins() external returns(uint256);
    function flip(bool guess) external returns(bool);
}