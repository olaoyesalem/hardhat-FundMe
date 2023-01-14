// SPDX-License-Identifier: MIT
// 1. Pragma
pragma solidity ^0.8.0;
// 2. Imports
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";
error FundMe_notOwner();
error FundMe_sendFailed();

// if a variable is set one time to a particular value,  we use the keyword "constant", " Immutable";
// the variables constants no longer take up a storage spot rather they are inducted into the byte code of the smart contract
/**
 @title A contract for crowd funding
 @author Olaoye Salem
 @notice This contract is to demo a sample funding contract
 @dev This implements price feeds as our library
 */
contract FundMe{
    using PriceConverter for uint256;

uint256 public constant MINIMUM_USD = 50*1e18; 
AggregatorV3Interface private s_priceFeed;
address[] private s_funders; // to keep list of s_funders
mapping(address=>uint256) private s_addressToAmountFunded; // to map s_funders to the amount deposited
address private immutable i_owner;

constructor(address s_priceFeedAddress){  // con
  i_owner=msg.sender;   
  s_priceFeed = AggregatorV3Interface(s_priceFeedAddress);
}

modifier onlyOwner{
         if(msg.sender !=i_owner){
    revert FundMe_notOwner();
}
    _;
}



function fund() public payable onlyOwner {

require(msg.value.getConversionRate( s_priceFeed)>=MINIMUM_USD,"Didn't send enough");  
s_addressToAmountFunded [msg.sender]+=msg.value;// mapping the addrsses to the  amount they funded
s_funders.push(msg.sender);
}

function Withdraw() public onlyOwner {

    for(uint256 s_fundersIndex=0; s_fundersIndex<s_funders.length; s_fundersIndex++){
address funder = s_funders[s_fundersIndex];
s_addressToAmountFunded[funder]=0; 
 }

s_funders = new address[](0);
//payable(msg.sender).transfer(address(this).balance);

// send
// bool sendSuccess = payable(msg.sender).send(address(this).balance);
// if(!sendSuccess){
//     revert sendFailed();
// }
// call
// this is a lower level command; it can be used to call functions wvwn without having thier ABI

(bool callSuccess, )=payable(msg.sender).call{value: address(this).balance}("");
require(callSuccess,"call Failed");


 
}

function cheaperWithdraw() public onlyOwner{
    address[] memory funders= s_funders; // Saving an array to memory saves gas

for(uint256 fundersIndex=0; fundersIndex<funders.length; fundersIndex++){
address funder = funders[fundersIndex];
s_addressToAmountFunded[funder]=0; 
 }

s_funders = new address[](0);

(bool callSuccess, )=payable(msg.sender).call{value: address(this).balance}("");
require(callSuccess,"call Failed");
}

receive() external payable{
    fund();
}

// fallback
fallback() external payable{
    fund();
} 

    function getOwner() public view returns(address) {
    return i_owner;
}
function getFunders(uint256 _index) public view returns(address){
        return s_funders[_index];
}

function getAddressToAmountFunded(address _funder) public view returns(uint256){
    return s_addressToAmountFunded[_funder];
}
function getPriceFeed() public view returns(AggregatorV3Interface){
    return s_priceFeed;
}

}









