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
    // Call the createProposal function passed from the parent component
    // and pass the description and roles as arguments
    await Contract.createProposal(desc, roles);
    // Reset the form fields after submission
      setDesc("");
	  roles = []
  };


  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">Description:</label>
        <input
          type="text"
          className="form-control"
          id="desc"
          name="desc"
          value={desc}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="checkbox"
          id="manager"
          name="manager"
          value="manager"
          onChange={handleChange}
        />
        <label htmlFor="manager" className="form-check-label"> Manager</label><br />

        <input
          type="checkbox"
          id="programmer"
          name="programmer"
          value="programmer"
          onChange={handleChange}
        />
        <label htmlFor="programmer" className="form-check-label"> Programmer </label><br />

        <input
          type="checkbox"
          id="designer"
          name="designer"
          value="designer"
          onChange={handleChange}
        />
        <label htmlFor="designer" className="form-check-label"> Designer</label>
      </div>

      <button type="submit" className="btn btn-primary">Add Proposal</button>
    </form>
  );
}
