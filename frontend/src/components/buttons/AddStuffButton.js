import { useState } from "react";

export function AddStuffButton({contract}) {
	const [address, setAddress] = useState('');
	const [name, setName] = useState("");
	const [role, setRole] = useState("");
	const handleChange = (event) => {
		if (event.target.id === "address") {
			setAddress(event.target.value);
		} else if (event.target.id === "name") {
			setName(event.target.value);
		} else if (event.target.id === "role") {
			setRole(event.target.value);
		}

	};
	const handleSubmit = (event) => {
		event.preventDefault();
		// Call the onRemove function passed from the parent component
		// and pass the address as an argument
		contract.addStuff(address, name, role);
		// Reset the address field after submission
		setAddress('');
		setRole("");
		setName("");
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

