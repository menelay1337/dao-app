import { useState } from "react";
import { VoteDiagram } from "./VoteDiagram";

export function ProposalsInfo({ proposals, contract }) {
	const [ loading, setLoading ] = useState(false);
    const Proposals = proposals;
    if (Proposals.length === 0) {
        return <h1>No proposals</h1>;
    }

	const onFor = async (index, prop) => {
		await contract.votefor(index);	
		prop.votefor += 1;
	}

	const onAgainst = async (index, prop) => {
		await contract.voteagainst(index);	
		prop.against -= 1;
	}

    return (
        <div>
            <h1>List of Proposals</h1>
            <ul>
                {Proposals.map((prop, index) => (
                    <li key={index}>
                        #{index + 1} {prop.desc} <br/>
                        for: {Number(prop.votefor)} <br/>
                        against: {Number(prop.voteagainst)}
                        <VoteDiagram data={[Number(prop.votefor), Number(prop.voteagainst)]} />
							<button class="btn btn-warning" onClick={onFor(index)}>vote for</button>
							<button class="btn btn-warning" onClick={onAgainst(index)}>vote against</button>
                        <br/>
                    </li>
				))}
            </ul>
        </div>
    );
}
