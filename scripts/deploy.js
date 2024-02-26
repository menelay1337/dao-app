// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const path = require("path");
let DaoNFT_contract;
let Dao_contract;
let delployer;
async function main() {
	[deployer] = await ethers.getSigners();
	console.log(
  	  "Deploying the contracts with the account:",
  	  await deployer.getAddress()
  	);



	const name = "Dao";
	const symbol = "DFT";

	const DaoNFT_factory = await ethers.getContractFactory("DaoNFT");
	DaoNFT_contract = await DaoNFT_factory.deploy(name, symbol);
	await DaoNFT_contract.deployed();

	
	console.log('DaoNFT deployed to:', DaoNFT_contract.address);
	
	const Dao_factory = await ethers.getContractFactory('Dao');
	// pass contractA constructor the address where contractB was just deployed
	Dao_contract = await Dao_factory.deploy(DaoNFT_contract.address);
	await Dao_contract.deployed();
	
	console.log('Dao deployed to:', Dao_contract.address);
	saveFrontendFiles();

}

function saveFrontendFiles() {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "dao-contract-address.json"),
    JSON.stringify({ DaoAddress: Dao_contract.address }, undefined, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "deployer-address.json"),
    JSON.stringify({ address: deployer }, undefined, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "daonft-contract-address.json"),
    JSON.stringify({ DaoNFTAddress: DaoNFT_contract.address }, undefined, 2)
  );

  const DaoArtifact = artifacts.readArtifactSync("Dao");
  const DaoNFTArtifact = artifacts.readArtifactSync("DaoNFT");

  fs.writeFileSync(
    path.join(contractsDir, "Dao.json"),
    JSON.stringify(DaoArtifact, null, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, "DaoNFT.json"),
    JSON.stringify(DaoNFTArtifact, null, 2)
  );
	
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
