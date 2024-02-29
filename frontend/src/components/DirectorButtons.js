import { useState, useEffect } from "react";
import { RemoveStuffButton } from "./buttons/RemoveStuffButton";
import { AddStuffButton } from "./buttons/AddStuffButton";
import { CreateProposalButton } from "./buttons/CreateProposalButton";
import { ExecuteProposalButton } from "./buttons/ExecuteProposalButton";

export function DirectorButtons({role, contract}) {
	console.log("Director's contract: ", contract);
	if (role !== "Director") {
		return <></>;
	}
	
	return (
		<div>
			<AddStuffButton contract_ = {contract}/>
			<RemoveStuffButton contract_ = {contract}/>
			<CreateProposalButton contract_ = {contract}/>
			<ExecuteProposalButton contract_ = {contract}/>
		</div>
	);


}
