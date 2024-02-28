export function StuffInfo(stuff) {
	let Stuff = stuff.stuff;
	if (stuff.length === 0) {
		return <p>No stuff</p>;
	}

	return (
        <div>
            <h1>List of Stuff</h1>
            <ul>
                {Stuff.map((worker, index) => (
                    <li> #{index + 1} {worker.name} {worker.role}</li>
                ))}
            </ul>
        </div>
    );

}
