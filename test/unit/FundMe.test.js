const { assert, expect } = require("chai");
const { developmentChains,networkConfig, INITIAL_ANSWER,DECIMALS} = require("../../helper-hardhat-config");
const { network, ethers } = require("hardhat");
const { deployer } = require("ethers");


!developmentChains.includes(network.name)
	? describe.skip // Only runs on development chains
	:describe("FundMe", function () {
    let FundMe,
      FundMeContractFactory,
      mockV3Aggregator,
      ethUsdPriceFeedAddress,
      chainId;
    const sendValue = ethers.utils.parseEther("1");
    beforeEach(async function () {
      chainId = network.config.chainId;
      ethUsdPriceFeedAddress = networkConfig[chainId][ethUsdPriceFeedAddress];
      FundMeContractFactory = await ethers.getContractFactory("FundMe");
      FundMe = await FundMeContractFactory.deploy(ethUsdPriceFeedAddress);
      mockV3AggregatorFactory = await ethers.getContractFactory('MockV3Aggregator');
      mockV3Aggregator = await mockV3AggregatorFactory.deploy(DECIMALS,INITIAL_ANSWER);
    });
  
  
  // :
      // let FundMe,
			// 	FundMeContractFactory,
			// 	mockV3Aggregator,
			// 	ethUsdPriceFeedAddress,
			// 	chainId;
			// const sendValue = ethers.utils.parseEther("0.05");
			// beforeEach(async function () {
			// 	chainId = network.config.chainId;
			// 	ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed'];
			// 	FundMeContractFactory = await ethers.getContractFactory("FundMe");
			// 	FundMe = await FundMeContractFactory.deploy(ethUsdPriceFeedAddress);
      // });

			describe("constructor",async function(){
			        it( "set the aggregator address correctly ", async function(){
			           const response= await FundMe.s_priceFeed;
			            assert.equal(response,mockV3Aggregator.address);
			})
			})

			describe("fallback", async function () {
				it("should check if fund() will be called", async function () {
					const response = await FundMe.fund;
					const fallback = await FundMe.Withdraw;

					assert.equal(response, fallback);
				});
			});


			describe("Fund", async function () {
				it("should fail if it doesn't send enough eth", async function () {
					await expect(FundMe.fund()).to.be.reverted;
				});
				it("should s_funders to array fo s_funders", async function () {
					await FundMe.fund({ value: sendValue });
					const response = FundMe.s_addressToAmountFunded(deployer);
					assert.equal(response.toString(), sendValue.toString());
				});
				it("should push address to s_funders array", async function () {
					await FundMe.fund({ value: sendValue });
					const response = FundMe.s_funders(0);

					assert.equal(response, deployer);
				});
			});
			// For us to withdraw we need to fund the contract, so we need to add a before each

			describe("Cheaper Withdraw", async function () {
				beforeEach(async function () {
					await FundMe.fund({ value: sendValue });
				});

				it("should check for the FundMe balance", async function () {
					// Arrange
					const startingFundMeBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const startingdeployerBalance = await FundMe.provider.getBalance(
						deployer
					);
					//Act
					const response = await FundMe.Withdraw();
					const transactionResponse = await response.wait(1);
					const { gasUsed, effectiveGasPrice } = transactionReceipt;
					const gasCost = gasUsed.mul(effectiveGasPrice);

					const endingFundMeBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const endingdeployerBalance = await FundMe.provider.getBalance(deployer);

					// Assert

					assert.equal(endingFundMeBalance, 0);
					assert.equal(
						startingdeployerBalance.add(startingFundMeBalance).toString(),
						endingdeployerBalance.add(gasCost).toString()
					); // the deployer used and paid for gas
					// so we need to account for it.
				});

				it("Allows us to withdraw from multiple s_funders", async function () {
					const accounts = await ethers.getdeployers();
					for (let i = 1; i < 6; i++) {
						const FundMeConnectedAccounts = await FundMe.connect(accounts[i]); // This is to connect the accounts to the contract
						await FundMeConnectedAccounts.fund({ value: sendValue });
					}

					const startingFundMeBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const startingdeployerBalance = await FundMe.provider.getBalance(
						deployer
					);

					const response = await FundMe.cheaperWithdraw();
					const transactionResponse = await response.wait(1);
					const { gasUsed, effectiveGasPrice } = transactionReceipt;
					const gasCost = gasUsed.mul(effectiveGasPrice);

					const endingFundMeBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const endingdeployerBalance = await FundMe.provider.getBalance(deployer);

					assert.equal(endingFundMeBalance, 0);
					assert.equal(
						startingdeployerBalance.add(startingFundMeBalance).toString(),
						endingdeployerBalance.add(gasCost).toString()
					); // the deployer used and paid for gas
					// so we need to account for it.

					//Make sure the s_funders are reset properly
					await expect(FundMe.s_s_funders(0)).to.be.reverted;

					// To check if all the addrss to amount funded is equals to zero
					for (let i = 1; i < 6; i++) {
						await assert.equal(
							FundMe.s_addressToAmountFunded(accounts[i].address),
							0
						);
					}
				});

				it("only allows the owner to call the withdraw function", async function () {
					const account = await ethers.getdeployers();
					const attacker = await account[1];
					const FundMeConnectedAttacker = await FundMe.connect(attacker);

					await expect(FundMeConnectedAttacker.Withdraw()).to.be.revertedWith(
						"FundMe_notOwner"
					);
				});
			});
	  });
