import { useState, useEffect } from "react";

export function ShowButton(contract) {
	console.log("Contract in showbutton: ", contract);
	const [ loading, setLoading ] = useState(true);
	function ShowStuff() {
		let addresses;
		let stuff = [];
	
		async function fetchData() {
			addresses = await contract.getEmployees();
			for (let address in addresses ) {
				let worker = await contract.getEmployee(address);
				stuff.push({name : worker.name, role : worker.role})	
			}
			setLoading(false);
		}
		fetchData();
	
		if (stuff.length == 0 ) {
			return <></>;
		}
	
		if (loading) {
			return <h1> Loading	Stuff...</h1>
		} 
		return (
			<div>
	            <h1>List of stuff </h1>
	            <ul>
	                {stuff.map((item, index) => (
	                    <li> #{index}> {item[0]} {item[1]}</li>
	                ))}
	            </ul>
	        </div>
		);
	}
	return (
		<div>
			<button onClick={ShowStuff}>Show stuff</button> 
			<ShowStuff/> 
		</div>
	);

}
