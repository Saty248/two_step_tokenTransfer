// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/access/Ownable.sol";

contract ContractMapper is Ownable {
    event Log(string func);
    mapping (address => address) userToSmartAccount;
  constructor(address deployedContract) Ownable(deployedContract) {
      
    }
    fallback() external payable {
        // send / transfer (forwards 2300 gas to this fallback function)
        // call (forwards all of the gas)
        emit Log("fallback" );
    }

    // Receive is a variant of fallback that is triggered when msg.data is empty
    receive() external payable {
        emit Log("receive");
    }


    function getSmartAccount(address user)external  view returns(address) {
        
        return userToSmartAccount[user];

    }
    function setSmartAccount(address user,address smartAccount)external onlyOwner{
        emit Log("setSmartAccount");
        userToSmartAccount[user]=smartAccount;
    }

}

