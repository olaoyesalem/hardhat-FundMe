require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY
module.exports = {
	solidity: {
		compilers: [
			{
				version: "0.8.7",
			},
			{
				version: "0.6.6",
			},
		],
	},
	defaultNetwork: "hardhat",
	networks: {
		goerli: {
			url: GOERLI_URL,
			accounts:[PRIVATE_KEY],
			//blockConfirmations:6,
			chainId:5.
		},
	},
	namedAccounts: {
		deployer: {
			default: 0, // here this will by default take the first account as deployer in hardhat network
			1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
		},
	},
};
