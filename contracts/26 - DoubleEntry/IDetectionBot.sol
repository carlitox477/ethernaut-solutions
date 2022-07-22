// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IDetectionBot {
    function handleTransaction(address user, bytes calldata msgData) external;
}