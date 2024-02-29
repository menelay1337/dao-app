import { useState } from "react";
export function CreateProposalButton(contract_) {
	const Contract = contract_.contract_;
	const [ desc, setDesc ] = useState("");
	let roles = [];
	const handleChange = (event) => {
        const { name, value, checked } = event.target;
		if ( name === "desc" ) {
			setDesc(value);
		} else if (checked) {
				roles.push(value);
		} else if (!checked) {
					const index = roles.indexOf(value);
					roles.splice(index, 1);
		}
    };

	const handleSubmit = async (event) => {
		event.preventDefault();
		// Call the onRemove function passed from the parent component
		// and pass the address as an argument
		await Contract.createProposal(desc, roles);
		// Reset the address field after submission
		setDesc("");
		roles = [];
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="desc">Description:</label>
				<input
					type="text"
					id="desc"
					name="desc"
					value={desc}
					onChange={handleChange}
					required
				/> <br/>

				 <input type="checkbox" id="manager" name="manager" value=""/>
 				 <label htmlFor="manager"> Manager</label><br/>
 				 <input type="checkbox" id="programmer" name="programmer" value=""/>
 				 <label htmlFor="programmer"> Programmer </label><br/>
 				 <input type="checkbox" id="designer" name="designer" value=""/>
 				 <label htmlFor="designer"> Designer</label>
			</div>
    	  <button type="submit">Add proposal</button>
    	</form>
	)

}
