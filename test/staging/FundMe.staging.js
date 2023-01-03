const { assert } = require("chai");
const { network, deployments, ethers,getNamedAccounts } = require("hardhat")
const{developmentChains} = require("../../helper-hardhat-config");

developmentChains.includes(network.name) ? describe.skip : // only runs on test net
describe("FundMe", function(){
    let FundMe,deployer
    const sendValue = ethers.utils.parseEther("1"); 
    beforeEach( async function(){ 
          deployer = await getNamedAccounts();
         FundMe = await ethers.getContractFactory("FundMe",deployer);
       })
       it("Should allow people to fund", async function(){
       await FundMe.fund({value:sendValue});
        await FundMe.cheaperWithdraw();
        const endingFundMeBalance = await ethers.provider.getBalance(FundMe.address);
        assert(endingFundMeBalance.toString(), "0");
       })
})