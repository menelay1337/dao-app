import { useState } from "react";
export function ExecuteProposalButton(contract_) {	
		const [id, setId] = useState(0);
		const handleChange = (event) => {
			setId(event.target);
    	};
		
		

		const handleSubmit = async (event) => {
			event.preventDefault();
			await contract_.executeProposal(id);
		};

		return (
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="id">ID:</label>
					<input
						type="id"
						id="id"
						name="id"
						onChange={handleChange}
						required
					/> <br/>
				</div>
    		  <button type="submit">Execute proposal</button>
    		</form>
		)
		
}
