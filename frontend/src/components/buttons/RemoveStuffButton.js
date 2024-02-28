import { useState } from "react";

export function RemoveStuffButton({contract_}) {
	const [address, setAddress] = useState('');
	const handleChange = (event) => {
		setAddress(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		// Call the onRemove function passed from the parent component
		// and pass the address as an argument
		contract_.removeStuff(address);
		// Reset the address field after submission
		setAddress('');
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
			</div>
    	  <button type="submit">Remove Stuff</button>
    	</form>
	)
}
