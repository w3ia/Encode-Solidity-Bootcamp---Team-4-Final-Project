// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DiplomaGuildProps {
    struct Proposal {
        uint256 id;
        string name;
        address student;
    }

    Proposal[] public proposals;

    function addProposal(
        uint256 _id,
        string memory _name,
        address _student
    ) public {
        Proposal memory newProposal = Proposal(_id, _name, _student);
        proposals.push(newProposal);
    }

    function getAllProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function getProposal(
        uint256 index
    ) public view returns (uint256, string memory) {
        require(index < proposals.length, "Index out of range");
        return (proposals[index].id, proposals[index].name);
    }

    function removeProposal(uint256 index) public {
        require(index < proposals.length, "Index out of range");
        proposals[index] = proposals[proposals.length - 1];
        proposals.pop();
    }
}
