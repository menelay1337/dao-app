export function ProposalsInfo(proposals, executeClick) {
	console.log(executeClick);
	let Proposals = proposals.proposals;
	if (Proposals.length === 0) {
		return <h1>No proposals</h1>;
	}

	return (
        <div>
            <h1>List of Proposals</h1>
            <ul>
                {Proposals.map((prop, index) => (
                    <li> #{index + 1} {prop.desc} <br/>for: {prop.votefor} <br/>against: {prop.voteagainst} <br/> <button onClick={ executeClick(index) }>Execute proposal</button> </li>
                ))}
            </ul>
        </div>
    );
	
}