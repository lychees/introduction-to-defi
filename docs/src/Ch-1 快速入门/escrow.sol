// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Escrow {
    function distribute(address recipient1, address recipient2, uint amount, address tokenAddress) public {        
        uint half = amount / 2;
        uint remain = amount - half;

        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, recipient1, half);
        token.transferFrom(msg.sender, recipient2, remain);
    }
}

interface IERC20 {
    function transferFrom(address from, address to, uint value) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}