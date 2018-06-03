pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./Ownable.sol";

contract Memorialize is Ownable {
    
    
    struct DeadPerson {
        string name;
        string obituary;
        string survivedBy;
        string pictureHash;
        string ipfsInfo;
    }
    
    address contractOwner;
    DeadPerson[] public deadPersons;
    uint public obituaryFee = .001 ether;

    
    mapping(address => uint)  private ownerDeadPeopleCount;
    mapping(uint => address) private deadPersonToOwner;
    
    
    modifier ownerOf(uint _deadPersonId) {
        require(msg.sender == deadPersonToOwner[_deadPersonId]);
        _;
    }
    
    event ObituaryPosted(address indexed from, string name, string obituary);
    
    
    function submitObituary(string name, string obituary, string survivedBy, string pictureHash, string ipfsInfo) public payable returns (uint){
        require(msg.value == obituaryFee);
        
        uint id = deadPersons.push(DeadPerson(name, obituary, survivedBy, pictureHash, ipfsInfo)) - 1;
        deadPersonToOwner[id] = msg.sender;
        //reminder to refactor using safemath
        ownerDeadPeopleCount[msg.sender]++;
        emit ObituaryPosted(msg.sender, name, obituary);
        return id;
    }
    
    
    function withdraw() external onlyOwner {
        contractOwner.transfer(address(this).balance);
    }
    
    function setObituaryFee(uint _fee) external onlyOwner {
        obituaryFee = _fee;
    }
    
    function getBalanceOfContract() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }
    
    function getObituaries(address _owner) external view returns (uint[]) {
        uint[] memory result = new uint[](ownerDeadPeopleCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < deadPersons.length; i++) {
            if (deadPersonToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        
        return result;
    }
    
    function getSingleObituary(uint id) public view returns (string[]) {
        string[] memory obituaryInfo = new string[](4);
        obituaryInfo[0] = deadPersons[id].pictureHash;
        obituaryInfo[1] = deadPersons[id].ipfsInfo;
        obituaryInfo[2] = deadPersons[id].obituary;
        obituaryInfo[3] = deadPersons[id].name;
        return obituaryInfo;
    }
    
}