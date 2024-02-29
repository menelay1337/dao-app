import { useState } from "react";

export function AddStuffButton({ contract_ }) {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;

    if (id === "address") {
      setAddress(value);
    } else if (id === "name") {
      setName(value);
    } else if (id === "role") {
      setRole(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the addStuff function passed from the parent component
    // and pass the address, name, and role as arguments
    contract_.addStuff(address, name, role);
    // Reset the form fields after submission
    setAddress('');
    setName('');
    setRole('');
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address:</label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="role" className="form-label">Role:</label>
        <input
          type="text"
          className="form-control"
          id="role"
          value={role}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Add Stuff</button>
    </form>
  );
}
