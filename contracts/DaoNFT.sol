//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DaoNFT is ERC721, Ownable {
	uint256 public maxSupply_ = 100;
	uint256 public totalSupply_ = 0;
	address director;

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

	// metadata

	constructor(string memory DAOname, string memory symbol) ERC721(DAOname, symbol) Ownable(msg.sender) {
		director = msg.sender;
	}

	function setTokenForStaff(address employeeAddress_, string memory _name, string memory _role) public {
		//require(msg.sender == director, "Operation not permitted.");
		require(bytes(stuffTokens[employeeAddress_].name).length == 0 && bytes(stuffTokens[employeeAddress_].role).length == 0, "This employee already has token.");
		require(totalSupply_ < maxSupply_, "Maximum number of tokens exceeded.");

		employee memory Employee;
		Employee.name = _name;
		Employee.role = _role;
		Employee.since = block.timestamp;
		Employee.employeeAddress = employeeAddress_;
		stuffTokens[employeeAddress_] = Employee;
	}

	function removeStuff(address employee_) public {
		require(msg.sender == director, "You're not permitted to remove staff.");
		stuffTokens[employee_] = employee("", "", address(0), 0);
		totalSupply_ -= 1;
	}


	


}


