// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Test1 {

    uint public a;
    constructor() {
        a=1;
    }
    function setter()public {
        a++;
    }
    function getter()public view returns(uint){
        return a;
    }
}