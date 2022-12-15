// SPDX-License-Identifier: MIT
// 1. Pragma
pragma solidity ^0.8.0;
// 2. Imports
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";
error notOwner();
error sendFailed();

// if a variable is set one time to a particular value,  we use the keyword "constant", " Immutable";
// the variables constants no longer take up a storage spot rather they are inducted into the byte code of the smart contract

contract FundMe{
    using PriceConverter for uint256;

uint256 public constant MINIMUM_USD = 50*1e18; 
AggregatorV3Interface public priceFeed;
constructor(address priceFeedAddress){ 
  i_owner=msg.sender;   
  priceFeed = AggregatorV3Interface(priceFeedAddress);
}

address[] public funders; // to keep list of funders

mapping(address=>uint256) public addressToAmountFunded; // to map funders to the amount deposited


address public immutable i_owner;
// constructor is a function that gets automatically called up once the contract is deployed.


function fund() public payable onlyOwner {

require(msg.value.getConversionRate( priceFeed)>=MINIMUM_USD,"Didn't send enough"); 
 funders.push(msg.sender);

 addressToAmountFunded [msg.sender]+=msg.value;// mapping the addrsses to the  amount they funded
}

function Withdraw() public onlyOwner {

    for(uint256 fundersIndex=0; fundersIndex<funders.length; fundersIndex++){
address funder = funders[fundersIndex];
addressToAmountFunded[funder]=0; 
 }

funders = new address[](0);
payable(msg.sender).transfer(address(this).balance);

// send
bool sendSuccess = payable(msg.sender).send(address(this).balance);
if(!sendSuccess){
    revert sendFailed();
}
// call
// this is a lower level command; it can be used to call functions wvwn without having thier ABI

(bool callSuccess, )=payable(msg.sender).call{value: address(this).balance}("");
require(callSuccess,"call Failed");


//   modifier onlyOwner{ 

// if(msg.sender !=i_owner){
//     revert notOwner();
// }
// _;
// }
// To still gets the details of the transaaction if  someone calls the contract without using the fund();
// recieve()
 
}
modifier onlyOwner{
         if(msg.sender !=i_owner){
    revert notOwner();
}
    _;
}
receive() external payable{
    fund();
}

// fallback
fallback() external payable{
    fund();
} 

}







