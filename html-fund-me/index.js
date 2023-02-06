// in front end of javascript we casn't use require()
// we use the require statemet when we use react, not just raw code.
import { ethers } from "./ethers-5.6.esm.min.js";
import { contractAddress, abi } from "./constants.js";                                                                                                                                                                                                                                                                                                                                                                         

const connectButton = document.getElementById("connectButton");
connectButton.onclick = connect;

const fundButton = document.getElementById("fundButton");
fundButton.onclick = fund;

const withdrawButton = document.getElementById("withdrawButton");
withdrawButton.onclick = withdraw;

const balanceButton = document.getElementById("balanceButton");
balanceButton.onclick = balance;

const deployer = document.getElementById("deployerButton");
deployer.onclick = deployers;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

async function connect() {
	if (typeof window.ethereum !== "undefined") {
		try {
			await window.ethereum.request({ method: "eth_requestAccounts" });
		} catch (error) {
			console.log(error);
		}
		connectButton.innerHTML = "Connected!!!";
	} else {
		connectButton.innerHTML = "Please, install Metamask!!!";
	}
}
async function withdraw() {
	if (typeof window.ethereum !== "undefined") {
		try {
			console.log("Withdrawing");
			const txnResponse = await contract.cheaperWithdraw();
		
			console.log("Finished Withdrawing!!!");
		} catch (error) {
			console.log(error);
		}
	}
	
}

async function fund() {
	const amount = document.getElementById("ethAmount").value;
	if (typeof window.ethereum !== "undefined") {
		console.log(`Funding with ${amount} ETH`);

		try {
			const txnResponse = await contract.fund({
				value: ethers.utils.parseEther(amount),
			});
			await listenForTxnMine(txnResponse, provider);
			console.log("Funded!!!");
		} catch (error) {
			console.log(error);
		}

		
	}

}

function listenForTxnMine(txnResponse, provider) {
	// this is to listen to the blockchain and see events that has happened
	console.log(`Mining ${txnResponse.hash} hash`);

	//create a listner for the blockchain
	return new Promise((resolve, reject) => {
		provider.once(txnResponse.hash, (transactionReceipt) => {
			console.log(
				`Completed with ${transactionReceipt.confirmations} confirmations`
			);
			resolve();
		});
	});
}
async function balance() {
	console.log(`I am working`);
	if (typeof window.ethereum !== "undefined") {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const Balance = await provider.getBalance(contractAddress);
		console.log(`Balance: ${ethers.utils.formatEther(Balance)}`);
	}
}

async function deployers() {
	
	if (typeof window.ethereum != "undefined") {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(contractAddress, abi, signer);
		const deployerAddress = await contract.i_owner;
		
		console.log(deployerAddress);
	}
}
