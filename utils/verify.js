
const{run} = require("hardhat");
async function verify(contractAddress,args){
    //await simpleStorageContract.deployTransaction.wait(6);// wait for six blocks
    console.log("verifying....");

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args, // to get errors and print 'em out
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified");
        } else {
            console.log(e);
        }
    }
}

module.exports={verify};