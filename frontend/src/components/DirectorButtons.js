export function DirectorButtons({role, contract}) {
	const [address, setAddress] = useState('');
	const handleChange = (event) => {
		setAddress(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
    	// Call the onRemove function passed from the parent component
    	// and pass the address as an argument
    	contract.removeStuff(address);
    	// Reset the address field after submission
    	setAddress('');
  };



	if (role == "Director") {
		return (
			<div>
				<form onSubmit={handlerSubmit}>
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

			</div>
		);
	}
}
