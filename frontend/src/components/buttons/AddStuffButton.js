import { useState } from "react";

export function AddStuffButton({contract_}) {
	let address;
	let name;
	let role;
	const handleChange = (event) => {
		if (event.target.id === "address") {
			address = event.target.value;
		} else if (event.target.id === "name") {
			name = event.target.value
		} else if (event.target.id === "role") {
			role = event.target.value;
		}

	};
	const handleSubmit = (event) => {
		event.preventDefault();
		// Call the onRemove function passed from the parent component
		// and pass the address as an argument
		contract_.addStuff(address, name, role);
		// Reset the address field after submission
		address = "";
		name = "";
		role = "";
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="address">Address:</label>
				<input
					type="text"
					id="address"
					value={address}
					onChange={handleChange}
					required
				/>

				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={handleChange}
					required
				/>
				<label htmlFor="role">Role:</label>
				<input
					type="text"
					id="role"
					value={role}
					onChange={handleChange}
					required
				/>
			</div>
    	  <button type="submit">Add Stuff</button>
    	</form>
	)
}

