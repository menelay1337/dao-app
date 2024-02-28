//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract DaoNFT is ERC721, Ownable {
	// metadata
	uint256 public maxSupply_ = 100;
	uint256 public totalSupply_ = 1;

	struct employee {
		string name;
		string role;
		address employeeAddress;
		uint since;
	}

	mapping(address => employee) stuffTokens;

	function getEmployeeAddress(address _address) public view returns(address) {
		return stuffTokens[_address].employeeAddress;
	}

	function getEmployeeRole(address _address) public view returns(string memory) {
		return stuffTokens[_address].role;
	}

	function getEmployeeName(address _address) public view returns(string memory) {
		return stuffTokens[_address].name;
	}


	constructor(string memory DAOname, string memory symbol) ERC721(DAOname, symbol) Ownable(msg.sender) {
		console.log("Deploying DaoNFT contract with address: ", msg.sender);
	}

	function setTokenForStaff(address employeeAddress_, string memory _name, string memory _role) public {
		require(bytes(stuffTokens[employeeAddress_].name).length == 0 && bytes(stuffTokens[employeeAddress_].role).length == 0, "This employee already has token.");
		require(totalSupply_ < maxSupply_, "Maximum number of tokens exceeded.");
		employee memory Employee;
		Employee.name = _name;
		Employee.role = _role;
		Employee.since = block.timestamp;
		Employee.employeeAddress = employeeAddress_;
		stuffTokens[employeeAddress_] = Employee;
		totalSupply_ += 1;
	}

	function removeStuff(address employee_) public {
		require(totalSupply_ > 1, "There are no remaining stuff.");
		stuffTokens[employee_] = employee("", "", address(0), 0);
	}

}


