const { assert } = require("chai");
const { getNamedAccounts, ethers, network } = require("hardhat");
const {
	developmentChains,
	networkConfig,
} = require("../../helper-hcxardhat-config");

developmentChains.includes(network.name)
	? describe.skip // only runs on test net
	: describe("FundMe", function () {
			let FundMe,
				FundMeContractFactory,
				mockV3Aggregator,
				ethUsdPriceFeedAddress,
				chainId;
			const sendValue = ethers.utils.parseEther("0.05");
			beforeEach(async function () {
				chainId = network.config.chainId;
				ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

				// Since the `getContractFactory` is method that belongs to the HRE and extends ethers
				// object we don't need to specify a signer in the method, it seems that Hardhat grabs
				// the signer from the config and adds it to the Factory.

				// getContractFactory: reads the bytcode and the abi of the compiled contract from the
				// artifacts folder but this method doesn't deploy the contract
				FundMeContractFactory = await ethers.getContractFactory("FundMe");

				// to deploy the contract you need to apply the .deploy() method and pass the constructor's
				// arguments
				FundMe = await FundMeContractFactory.deploy(ethUsdPriceFeedAddress);
			});
			it("Should allow people to fund", async function () {
				await FundMe.fund({ value: sendValue });
				await FundMe.cheaperWithdraw();
				const endingFundMeBalance = await ethers.provider.getBalance(
					FundMe.address
				);
				assert.equal(endingFundMeBalance.toString(), "0");
				
			});
	  });
