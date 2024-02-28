import { useState, useEffect } from "react";
import { RemoveStuffButton } from "./buttons/RemoveStuffButton";
import { AddStuffButton } from "./buttons/AddStuffButton";
import DaoArtifact from "../contracts/Dao.json";

export function DirectorButtons({role, contract}) {
	if (role !== "Director") {
		return <></>;
	}
	
	return (
		<div>
			<AddStuffButton contract_ = {contract}/>
			<RemoveStuffButton contract_ = {contract}/>
		</div>
	);


}
