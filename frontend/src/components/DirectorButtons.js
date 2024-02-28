import { RemoveStuffButton } from "./buttons/RemoveStuffButton";
import { AddStuffButton } from "./buttons/AddStuffButton";
import { ShowButton } from "./buttons/ShowButton";
import DaoArtifact from "../contracts/Dao.json";

export function DirectorButtons({role, contract, address}) {
	if (role !== "Director") {
		return <></>;
	}
	console.log("Contract in director's buttons: ", contract);
	const data = contract.getEmployee(address);
	console.log("get address of the employee with address: ", address, "\n", data[0], data[1]);

	
	return (
		<div>
			<AddStuffButton contract = {contract}/>
			<RemoveStuffButton contract = {contract}/>
		</div>
	);


}
