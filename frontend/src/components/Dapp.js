// Import ethers.js library
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

let provider;
let signer;

//Contract instances 
let DaoContract;
let signedContract;

export function Dapp() {
	// Hooks
	const [loading, setLoading] = useState(true);
	const [_address, setAddress] = useState("");
    const [token, setToken] = useState({_name: "", _role : ""});

	// automatic connection to wallet
	useEffect(() => {
        async function fetchData() {
			if (window.ethereum === undefined) {
				return <NoWalletDetected />;
    		}
			// Connect to Hardhat Network or Ethereum Mainnet using provider
			provider = new ethers.BrowserProvider(window.ethereum)
			console.log("Successfully obtained Metamask provider");
			signer = await provider.getSigner();
            DaoContract = new ethers.Contract(contractAddress.DaoAddress, DaoArtifact.abi, provider);
            console.log("Successfully fetched contract with address: ", contractAddress.DaoAddress);

            signedContract = DaoContract.connect(signer);
			let signerAddress = await signer.getAddress();
			setAddress(signerAddress);
            console.log("Successfully signed contract with user address: ", signerAddress);
			
			const argArray = await signedContract.getEmployee(signerAddress);
			let name = argArray[0];
			let role = argArray[1];
			setToken((prevState) => ({
			    ...prevState,
        	    _name: name,
        	    _role: role,
        	}));
			console.log(token);


			setLoading(false);
        }
        fetchData();
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
		
		<DirectorButtons role = { token._role } contract = {signedContract} />

        </div>
    );
}
