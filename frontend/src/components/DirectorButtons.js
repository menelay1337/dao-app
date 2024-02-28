import { useState, useEffect } from "react";
import { RemoveStuffButton } from "./buttons/RemoveStuffButton";
import { AddStuffButton } from "./buttons/AddStuffButton";
import { CreateProposalButton } from "./buttons/CreateProposalButton";

export function DirectorButtons({role, contract, proposals}) {
	if (role !== "Director") {
		return <></>;
	}
	
	return (
		<div>
			<AddStuffButton contract_ = {contract}/>
			<RemoveStuffButton contract_ = {contract}/>
			<CreateProposalButton contract = {contract}/>

		</div>
	);


}
