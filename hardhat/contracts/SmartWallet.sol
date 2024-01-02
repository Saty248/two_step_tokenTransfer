// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
error notAnOWner(address);
contract SmartWallet is Ownable,IERC721Receiver {
    address[] internal erc20s;
    address[] internal erc721s;
    mapping (address => uint[]) erc721ToTokenId;
    event Log(string func);
    event ContractAdded(address _contract);

constructor(address owner)Ownable(owner){}
    
function balance()external view returns(uint){
return address(this).balance;
}

function iserc20TokenOwner(address contAddress) public view returns(bool){
    bool isTokenOwner=false;
    for (uint i = 0; i < erc20s.length; i++) {
        if(contAddress==erc20s[i]){
            isTokenOwner=true;
            break;
        }
        
    }
    return isTokenOwner; 
}

function iserc721TokenOwner(address contAddress) public view returns(bool){
    bool isTokenOwner=false;
    for (uint i = 0; i < erc721s.length; i++) {
        if(contAddress==erc721s[i]){
            isTokenOwner=true;
            break;
        }
        
    }
    return isTokenOwner; 
}

function adderc20Contract(address contractAddress)external{
    emit Log("adderc20Contract");
    if(contractAddress==address(0x0000000000000000000000000000000000000000)) revert("zero address");
    
    erc20s.push(contractAddress);
    emit ContractAdded(contractAddress);
}
function adderc721Contract(address contractAddress,uint256 tokenId)external{
    emit Log("adderc721Contract");
    if(contractAddress==address(0x0000000000000000000000000000000000000000)) revert("zero address");
    uint[] memory ans=erc721ToTokenId[contractAddress];

    if(ans.length==0){erc721s.push(contractAddress);
    erc721ToTokenId[contractAddress].push(tokenId);
    emit ContractAdded(contractAddress);
    }else{
        bool isTokenIDpresent=false;
        for (uint i = 0; i < ans.length; i++){
            if(tokenId==ans[i]){
                isTokenIDpresent=true;
            }
        }
        if(!isTokenIDpresent){
            erc721ToTokenId[contractAddress].push(tokenId);
            emit ContractAdded(contractAddress);

        }
    }
    
    
}


function erc20Caller(address contAddress,bytes memory funcNameWithARguments)external returns(bytes memory){
    emit Log("erc20Caller");
     bool isTokenOwner=iserc20TokenOwner(contAddress);
     if(!isTokenOwner) revert notAnOWner(contAddress);
     (bool success, bytes memory data)=contAddress.call(funcNameWithARguments);
     require(success,"function call failed");
     return data;


}

function erc721Caller(address contAddress,bytes memory funcNameWithARguments)external returns(bytes memory){
    emit Log("erc20Caller");
     bool isTokenOwner=iserc721TokenOwner(contAddress);
     if(!isTokenOwner) revert notAnOWner(contAddress);
     (bool success, bytes memory data)=contAddress.call(funcNameWithARguments);
     require(success,"function call failed");
     return data;


}
function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4){
       return bytes4(keccak256(bytes("onERC721Received(address,address,uint256,bytes)")));
    
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