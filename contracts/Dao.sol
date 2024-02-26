pragma solidity ^0.8.24;
import "./DaoNFT.sol";

contract Dao {
	
	DaoNFT public Tokens;

	constructor(address _address) {
		Tokens = DaoNFT(_address);
		addStuff(msg.sender, "Murat", "Director");
	}

	function getEmployee(address _address) public view returns (string memory, string memory) {
		return (Tokens.getEmployeeName(_address), Tokens.getEmployeeRole(_address));
	}

    struct Proposal {
        string desc;
        uint votefor;
		uint voteagainst;
        bool executed;
		string[] roles;
    }

	address[] public stuff;
    mapping(address => mapping(uint => bool)) public votes;
    Proposal[] public proposals;

	function getRoles(uint256 _proposalId) public view returns (string[] memory) {
	    Proposal storage proposal = proposals[_proposalId];
	    
	    return proposal.roles;
	}

    event ProposalCreated(uint indexed proposalId, string desc, string[] _roles);
    event VoteCast(address indexed voter, uint indexed proposalId, string aim);
    event ProposalAccepted(string message);
    event ProposalRejected(string reject);

    function addStuff(address _address, string memory employeeName, string memory employeeRole) public {
       // require(Tokens.tokens[_address].owner == "" && Tokens.tokens[_address].role == "", "Member already exists");
	   // Tokens.staff newToken = Tokens.staff(employeeName, employeeRole)
       // stuffInfo[_member] = Employee({employeeAddress: _address, employeeSince: block.timestamp, token:  });
       // members.push(_member);
       // balances[_member] = 100;
       // totalSupply += 100;
	   Tokens.setTokenForStaff(_address, employeeName, employeeRole);
	   stuff.push(_address);


    }

    function removeStuff(address _employee) public {
		Tokens.removeStuff(_employee);
		for ( uint i = 0; i < stuff.length; i++ ) {
			if (stuff[i] == _employee) {
				for ( uint j = i; j < stuff.length; j++ ) {
					stuff[j] = stuff[j+1];
				}
				stuff.pop();
			}
		}

		
    }

    function createProposal(string memory _desc, string[] memory _roles) public {
        proposals.push(Proposal({desc: _desc, votefor: 0, voteagainst: 0, executed: false, roles: _roles}));
        emit ProposalCreated(proposals.length - 1, _desc, _roles);
    }

    function votefor(uint _proposalId) public {
        require(Tokens.getEmployeeAddress(msg.sender) == msg.sender, "Only members can vote");
        require(votes[msg.sender][_proposalId] == false, "You have already voted for this proposal");
		require(isSuitable(msg.sender, _proposalId), "You're not pertmitted to vote.");
        votes[msg.sender][_proposalId] = true;
        proposals[_proposalId].votefor += 1;
        emit VoteCast(msg.sender, _proposalId, "for");
    }

    function voteagainst(uint _proposalId) public {
        require(Tokens.getEmployeeAddress(msg.sender) == msg.sender, "Only members can vote");
        require(votes[msg.sender][_proposalId] == false, "You have already voted for this proposal");
		require(isSuitable(msg.sender, _proposalId), "You're not pertmitted to vote.");
        votes[msg.sender][_proposalId] = true;
        proposals[_proposalId].voteagainst += 1;
        emit VoteCast(msg.sender, _proposalId, "against");
    }

	function isSuitable(address _address, uint _proposalId) public view returns(bool) {
		string memory role = Tokens.getEmployeeRole(_address);
		string[] memory roles = getRoles(_proposalId); 
		for ( uint i = 0; i < roles.length; i++) {
			if (compareStrings(roles[i], role)) {
				return true;
			}
		}
		return false;
	}

	function compareStrings(string memory a, string memory b) internal pure returns (bool) {
	    // Compare the lengths of the strings
	    if (bytes(a).length != bytes(b).length) {
	        return false;
	    } else {
	        // Iterate over each character of the strings and compare them
	        for (uint i = 0; i < bytes(a).length; i++) {
	            if (bytes(a)[i] != bytes(b)[i]) {
	                return false;
	            }
	        }
	        return true;
	    }
	}

    function executeProposal(uint _proposalId) public {
        require(proposals[_proposalId].executed == false, "Proposal has already been executed");
        if (proposals[_proposalId].votefor > proposals[_proposalId].voteagainst) {
            proposals[_proposalId].executed = true;
            emit ProposalAccepted("Proposal has been approved");
        } else {
            emit ProposalRejected("Proposal has not been approved by majority vote");
        }
    }
}