// in front enbd of javascript we casn't use require()
// we use the require statemet when we use react, not just raw code.
import {ethers} from "./ethers-5.6.esm.min.js"

const connectButton = document.getElementById("connectButton")
connectButton.onclick = connect

const fundButton = document.getElementById("fundButton")
fundButton.onclick = fund

async function connect(){

    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
         console.log(error)   
        }
    connectButton.innerHTML = "Connected!!!"
    }else{
        connectButton.innerHTML = "Please, install Metamask!!!";
    }

}

async function fund(amount){
    if (typeof window.ethereum !=="undefined" ) {
        console.log(`Funding with ${amount} `);
        const provider = await 
        // we need a provider/ connection to thye blockchain
        //signer/wallet

        //contract --> Abi and Address
        // we can send a txn
        

    }
}