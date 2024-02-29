import { useState } from "react";
import { VoteDiagram } from "./VoteDiagram";

export function ProposalsInfo({ proposals, contract }) {
    const Proposals = proposals;
    if (Proposals.length === 0) {
        return <h1>No proposals</h1>;
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
						<button class="btn btn-warning" onClick={() => {console.log(index); contract.votefor(index)}  }>vote for</button>
						<button class="btn btn-warning" onClick={() => { console.log(index); contract.voteagainst(index)} }>vote against</button>
                        <VoteDiagram data={[Number(prop.votefor), Number(prop.voteagainst)]} />
                        <br/>
                    </li>
				))}
            </ul>
        </div>
    );
}
