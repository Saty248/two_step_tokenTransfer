// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Nft1 is ERC721URIStorage,Ownable {


    uint private _tokenIds;

    constructor() ERC721("ubuntu_legacy","UBT") Ownable(msg.sender){
        _tokenIds=0;

    }

    function mintNFT(address nftOwner,string memory tokenUri)public onlyOwner returns(uint256){
        _tokenIds++;
        uint256 newItemId=_tokenIds;
        _mint(nftOwner,newItemId);
        _setTokenURI(newItemId, tokenUri);
        return newItemId;
    }


}



