
// this is where we define our mock price feed aggregator
// we need to craete a fake contract ,mocking, to  get the price feed for our localhost and hardhat
//SPDX-License-Identifier:MIT
pragma solidity ^0.6.0; 
import "@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol";//insstead of copying pasting
 // This will give us the price feed for the localHost 