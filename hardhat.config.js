require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_URL = process.env.GOERLI_URL
module.exports = {
  solidity: { compilers: [
    {
        version: "0.8.7",
    },
    {
        version: "0.6.6",
    },
],}, 
  networks:{
    goerli:{
      url :GOERLI_URL,
    },
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
},
};
