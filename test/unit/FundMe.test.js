const { assert, expect } = require("chai");
const { getNamedAccounts, deployments, ethers } = require("hardhat")

describe("FundMe", function(){
    let FundMe,deployer, mockV3Aggregator
    const sendValue = ethers.utils.parseEther("1"); // 1 eth
    beforeEach( async function(){ // we have to deploy...
         deployer = await getNamedAccounts().deployer;
         // Another to get accounts is :
         //const accounts = await ethers.getSogners()
         // const accountZero = await accounts[0]
         await deployments.fixture(["all"]); // this is to deploy all the contratcs
         FundMe = await ethers.getContractFactory("FundMe",deployer);
         mockV3Aggregator = await ethers.getContractFactory("MockV3Aggregator", deployer);
       })


    describe("constructor",async function(){
            it( "set the aggregator address correctly ", async function(){
               const response= await FundMe.priceFeed; 
                assert.equal(response,mockV3Aggregator.address);
    })
    })

    describe("fallback", async function(){
      it("should check if fund() will be called", async function(){
        const response = await FundMe.fund;
        const fallback = await FundMe.Withdraw;
         
        assert.equal(response, fallback);
      })
    })

    describe("Fund", async function(){
      it("should fail if it doesn't send enough eth", async function(){
        //await expect (FundMe.fund).to.be.reverted;
        await FundMe.fund;
      
      })
      it.only("should map the amount funded to the respective address",async function(){
        const response = FundMe.addressToAmountFunded(deployer);
        assert.equal(response.toString(), sendValue.toString());
      })
    })

    
})