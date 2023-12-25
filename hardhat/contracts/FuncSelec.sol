// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FuncSelc {
    
 uint public value=8;

  function set () external {
    value = 9;
  }
  function get () public view returns (uint) {
    return value;
  }
    function callGetter(address add1)public returns(bytes memory){
       (bool success,bytes memory data)=add1.call(abi.encodeWithSelector(bytes4(keccak256(bytes("setter()")))));
       if(!success) revert("yo!error func call");
       return data;


    }
}