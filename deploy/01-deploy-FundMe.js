const { network } = require("hardhat");
const { networkConfig } = require("../hardhat.config");
const { developmentChains } = require("../helper-hardhat-config");
const {verify} = require("../utils/verify");



module.exports = async ({ getNamedAccounts, deployments }) => {
	const { log, deploy } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;
   // const ethUsdPriceFeedAddress = networkConfig[chainId][ethUsdPriceFeed];
    let ethUsdPriceFeedAddress

    if(developmentChains.includes(network.name)){
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");// get the most recent deployments of contracts
        ethUsdPriceFeedAddress = ethUsdAggregator.address; // get the address of the contract
    }else{
        ethUsdPriceFeedAddress = networkConfig[chainId][ethUsdPriceFeed];   
    }
        args = [ethUsdPriceFeedAddress]
    const FundMe = await deploy("FundMe",{
        from:deployer,
        args:args,
        log:true,
        waitConfirmations:network.config.blockConfirmation,
    })
        
    if(!developmentChains.includes(network.name)&&process.env.ETHERSCAN_API_KEY){
        await verify(FundMe.address,args )
    }

    log("--------------------------");



};
