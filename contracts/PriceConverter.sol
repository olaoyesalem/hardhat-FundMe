//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter{
function getPrice(AggregatorV3Interface priceFeed)internal view returns(uint256){
  
    //AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    (,int256 price,,,)=priceFeed.latestRoundData();
     //This is the price of ETH in USD 
    // $1,280.00000000 = 1eth // this has 8 decimal place
    return uint256(price*1e10);
}
function getVersion(AggregatorV3Interface priceFeed) internal view returns(uint256){
    //AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    return priceFeed.version();
}
function getConversionRate(uint256 ethAmount,AggregatorV3Interface priceFeed)internal view returns(uint256){// to get the amount of any ETH in USD
uint256 ethPrice= getPrice( priceFeed);
//3000_000000000000000000 = ETH/USD price
// 1_000000000000000000 (wei) ETH we are sending
 uint256 ethPriceInUsd = (ethPrice * ethAmount)/1e18;
 //3000 USD
return ethPriceInUsd;
}

}