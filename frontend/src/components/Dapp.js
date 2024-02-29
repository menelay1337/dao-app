const [loading, setLoading] = useState(true);
    const [token, setToken] = useState({_name: "", _role : ""});
	const [stuff, setStuff] = useState([]);
	const [contractInstance, setContract] = useState(null);
	const [proposals, setProposals] = useState([]);
	const [_address, setAddress] = useState("");
	let addresses = [];
	let signedAddress;

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
				signedAddress = await signer.getAddress();
        	    console.log("Successfully signed contract with user address: ", signedAddress);
			}

			function findAddress(arr, address) {
				for(let i = 0; i < arr.length; i++ ){
					if (address === arr[i]) {
						return true;
					}
				}
				return false;
			}
			await updateAllStuff();
			await updateAllProposals();
			
			// update Token info 
			if (addresses !== undefined && findAddress(addresses, signedAddress)) {
				const argArray = await signedContract.getEmployee(signedAddress);
				let name = argArray[0];
				let role = argArray[1];
				setToken((prevState) => ({
				    ...prevState,
        		    _name: name,
        		    _role: role,
        		}));
				stuff.push({name: name, role: role});
			}
			setAddress(signedAddress);
		}
			setInterval(updateToken, 5000);
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
		
       <Background item={<HalfWindow first={
		<ProposalsInfo proposals = {proposals} executeClick = { (index) => { signedContract.executeProposal(index) }}/>

	   } info={
		<StuffInfo stuff = {stuff}/>

	   } second={
		<div>
		<h2 className="text-center"> Token owner: {token._name}, role: {token._role}</h2>
		<h3 className="text-center"> Owner address: {_address}</h3>			
		<DirectorButtons role = {token._role} contract = {signedContract} proposals = { proposals } />
	</div>
	   } />}/>
    );
	async function updateToken() {
		return;	
	}

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
