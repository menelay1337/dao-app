// Import ethers.js library 
// and metadata
import { ethers } from 'ethers';
import contractAddress from "../contracts/dao-contract-address.json";
import DaoArtifact from "../contracts/Dao.json";
import { deployer } from "../contracts/deployer-address.json";

// UI
import React, { useState, useEffect} from "react";
import { NoWalletDetected } from "./NoWalletDetected";
import { Loading } from "./Loading";
import { NoTokensMessage } from "./NoTokensMessage";
import { DirectorButtons } from "./DirectorButtons";
import { StuffInfo } from "./StuffInfo";
import { ProposalsInfo } from "./ProposalsInfo";
console.log("ABI: ", DaoArtifact.abi);


let provider;
let signer;
let signerAddress;

//Contract instances 
let DaoContract;
let signedContract;

export function Dapp() {
	// Hooks
	const [loading, setLoading] = useState(true);
    const [token, setToken] = useState({_name: "", _role : ""});
	const [stuff, setStuff] = useState([]);
	const [contractInstance, setContract] = useState(null);
	const [proposals, setProposals] = useState([]);
	let addresses = [];
	let _address;

	// automatic connection to wallet
	useEffect(() => {
        async function fetchData() {
			if (window.ethereum === undefined) {
				return <NoWalletDetected />;
    		}
			// Connect to Hardhat Network or Ethereum Mainnet using provider
			if (provider === undefined || provider === null ) {
				provider = new ethers.BrowserProvider(window.ethereum)
				console.log("Successfully obtained Metamask provider");
				signer = await provider.getSigner();
        	    DaoContract = new ethers.Contract(contractAddress.DaoAddress, DaoArtifact.abi, provider);
        	    console.log("Successfully fetched contract with address: ", contractAddress.DaoAddress);

        	    signedContract = DaoContract.connect(signer);
				setContract(signedContract);
				_address = await signer.getAddress();
        	    console.log("Successfully signed contract with user address: ", _address);
				await updateAllStuff();
				await updateAllProposals();
			}

			function findAddress(arr, address) {
				for(let i = 0; i < arr.length; i++ ){
					if (address === arr[i]) {
						return true;
					}
				}
				return false;
			}
			
			// update Token info 
			if (addresses !== undefined && findAddress(addresses, _address)) {

				const argArray = await signedContract.getEmployee(_address);
				let name = argArray[0];
				let role = argArray[1];
				setToken((prevState) => ({
				    ...prevState,
        		    _name: name,
        		    _role: role,
        		}));
				stuff.push({name: name, role: role});
			}

		}
			setInterval(updateAllStuff, 5000);
			setInterval(updateAllProposals, 5000);
			fetchData();
			setLoading(false);
	}, []);

    if (loading) {
        return (<Loading />);
    }

	if (!loading && token._name.length == 0) {
		return ( <NoTokensMessage 
			address = {_address}
		/>);
	}


    return (
        <div>
			<h1 className="text-center">Decentralized autonomous organization dApp</h1>
			<h2 className="text-center"> Token owner: {token._name}, role: {token._role}</h2>
			<h3 className="text-center"> Owner address: {_address}</h3>			
			<DirectorButtons role = {token._role} contract = {signedContract} proposals = { proposals } />
			<StuffInfo stuff = {stuff}/>
			<ProposalsInfo proposals = {proposals} executeClick = { (index) => { signedContract.executeProposal(index) }}/>
        </div>
    );

	async function updateAllStuff() {
		addresses = await signedContract.getEmployees();
		if (addresses.length > stuff.length) {
			let emptyArray = [];
			for (let address of addresses) {
				const worker = await signedContract.getEmployee(address);
				emptyArray.push({name : worker[0], role : worker[1]});
			}
			setStuff(emptyArray);	
		}
	}

	async function updateAllProposals() {
		if (proposals === undefined ) {
			proposals = await signedContract.getProposals();
			return;
		}
		let new_proposals = await signedContract.getProposals();
		if (new_proposals.length > proposals.length) {
				setProposals(new_proposals);
			
		}
	}
}
