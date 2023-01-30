// in front end of javascript we casn't use require()
// we use the require statemet when we use react, not just raw code.
import {ethers} from "./ethers-5.6.esm.min.js"
import { contractAddress,abi } from "./constants.js"


const connectButton = document.getElementById("connectButton")
connectButton.onclick = connect

const fundButton = document.getElementById("fundButton")
fundButton.onclick = fund

const withdrawButton = document.getElementById("withdrawButton")
withdrawButton.onclick = withdraw

const priceFeedButton = document.getElementById("priceButton")
 priceFeedButton.onclick = getPriceFeed
const provider = new ethers.providers.Web3Provider(window.ethereum); 

//signer/wallet
const signer =  provider.getSigner();
const contract = new ethers.Contract(contractAddress,abi,signer);
  
async function connect(){

    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method:"eth_requestAccounts"})
        } catch (error) {
         console.log(error)   
        }
    connectButton.innerHTML = "Connected!!!"
    }else{
        connectButton.innerHTML = "Please, install Metamask!!!";
    }

}

async function fund(){
     const amount = document.getElementById("ethAmount")
    if (typeof window.ethereum !=="undefined" ) {
        console.log(`Funding with ${amount}`);
           // we need a provider/ connection to the blockchain
      
        const txnResponse = await contract.fund({value:ethers.utils.parseEther(amount),
        })
        try{
            const txnResponse = await contract.fund({value:ethers.utils.parseEther(amount)})
        }catch(error){
            console.log(error)
        }
        // listen for the txn to be mined
    
       
        console.log("Funded!!!")
    }
}

 function listenForTxn(txnResponse,provider){
console.log(`Mining ${txnResponse.hash}....`)
    return new Promise()
    //the reason why we  create a new promise is because we want to create a listner for the blockchain
}

async function withdraw(){
    if (typeof window.ethereum !== "undefined") {
        withdrawButton.innerHTML= "Withdraw Pending"
        const txnResponse = await contract.Withdraw();
        withdrawButton.innerHTML= "Withdrew!!!"

    }
}

async function getPriceFeed(){
    if(typeof window.ethereum !== "undefined"){
        const txnResponse = await contract.getPriceFeed();
        console.log(`Current Price of Ethereum = ${txnResponse}`)
        priceButton.innerHTML= txnResponse
    }
}
