const { ethers, getNamedAccounts } = require("hardhat");

async function main(){

    const {deployer} = await getNamedAccounts();
    const FundMe = await ethers.getContract("FundMe",deployer);
    console.log("Funding");
    const transactionResponse = await FundMe.Withdraw();
    transactionResponse.wait(1);
    console.log("Got my funds back");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })