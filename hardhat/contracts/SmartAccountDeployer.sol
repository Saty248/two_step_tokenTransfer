//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SmartWallet.sol";
interface IContractMapper {
    function getSmartAccount(address user)external view returns(address);
    function setSmartAccount(address user,address smartAccount) external;
}

contract SmartAccountDeployer is Ownable{
    event Owner(address ownerAddress);
    event Log(string func);
    event NewAccount(address contractAddress,address owner);
    constructor() Ownable(msg.sender) {
      emit Owner(msg.sender);
    }
    function createAndAddSmartAccount(address user,address _contractMapper)external  onlyOwner returns(address){
        emit Log("createAndAddSmartAccount");
        IContractMapper contractMapper=IContractMapper(_contractMapper);
        address userAcc=contractMapper.getSmartAccount(user);
        if(userAcc==address(0x0000000000000000000000000000000000000000)){
            SmartWallet newAccount=new SmartWallet(user);
            emit NewAccount(address(newAccount), user);
            contractMapper.setSmartAccount(user,address(newAccount));
            return address(newAccount);
        }else{
            return userAcc;
        }

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
}