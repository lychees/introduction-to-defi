# 习题
## 1.1 分账合约（Escrow）
[这个例子来自 Vitalik、Taipei Ethereum Meetup #11 Vitalik Buterin Keynote Special](https://www.youtube.com/watch?v=MlaLRgUYeLo)

让我们来看一个最简单的 DeFi 产品的例子。在现实生活中，一个项目的成功往往是有不同团队之间紧密分工的结果，
在过去不同分工的团队可能会以立定合同的方式，事先说明双方的利润分成，而当出现纠纷时，则往往需要花费非常大的代价进行维权，无形之中增加了信任的成本。

### 支持以太币

分账合约（Escrow）的功能是，在这个合约接收到任意转账时，都会均等的分成两份，发给另外两个事先约定的账户。

```solidity
/**
 *Submitted for verification at Etherscan.io on 2018-11-24
*/

pragma solidity ^0.4.25;

/**
 * @title SafeMath
 * @dev Math operations with safety checks that revert on error
 */
library SafeMath {

    /**
    * @dev Multiplies two numbers, reverts on overflow.
    */
    function mul(uint256 _a, uint256 _b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (_a == 0) {
            return 0;
        }

        uint256 c = _a * _b;
        require(c / _a == _b);

        return c;
    }

    /**
    * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
    */
    function div(uint256 _a, uint256 _b) internal pure returns (uint256) {
        require(_b > 0); // Solidity only automatically asserts when dividing by 0
        uint256 c = _a / _b;
        // assert(_a == _b * c + _a % _b); // There is no case in which this doesn't hold

        return c;
    }

    /**
    * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {
        require(_b <= _a);
        uint256 c = _a - _b;

        return c;
    }

    /**
    * @dev Adds two numbers, reverts on overflow.
    */
    function add(uint256 _a, uint256 _b) internal pure returns (uint256) {
        uint256 c = _a + _b;
        require(c >= _a);

        return c;
    }

    /**
    * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
    * reverts when dividing by zero.
    */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}

contract Escrow {
    using SafeMath for uint256;

    event Distribute(address indexed recipient1, uint256 amount1, address indexed recipient2, uint256 amount2, address indexed token);

    function distribute(address recipient1, address recipient2, uint256 amount, address tokenAddress)
        public
    {
        require(amount > 0, "must transfer a positive amount");

        uint256 _half = amount.div(2);
        uint256 _remain = amount.sub(_half);

        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, recipient1, _half);
        token.transferFrom(msg.sender, recipient2, _remain);

        emit Distribute(recipient1, _half, recipient2, _remain, tokenAddress);
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address who) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

### 支持一般 ERC20 代币


## 1.2 场外担保交易合约（Secured OTC Exchange Contract）
这个例子来自这里：[https://www.bilibili.com/video/BV1Ht4y197h8?p=28](https://www.bilibili.com/video/BV1Ht4y197h8?p=28)

![8L5)K33L95~CTP_5 MXA05O](https://user-images.githubusercontent.com/2507027/190588887-909ed27f-05ae-4e58-8bf2-0af94163de7e.png)

### 单笔订单

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TokenExchange {
    address fromAddress;
    address fromToken;
    uint fromAmount;
    address toToken;
    uint toAmount;

    function CreateExchange(address _fromToken, address _toToken, uint _fromAmount, uint _toAmount) public {
        IERC20(_fromToken).transferFrom(msg.sender, address(this), _fromAmount);
        fromAddress = msg.sender;
        fromToken = _fromToken;
        fromAmount = _fromAmount;
        toToken = _toToken;
        toAmount = _toAmount;
    }

    function DoChange() public {
        IERC20(toToken).transferFrom(msg.sender, address(this), toAmount);
        IERC20(fromToken).transfer(msg.sender, fromAmount);
        IERC20(toToken).transfer(fromAddress, toAmount);
    }
}

interface IERC20 {
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);
}
```

### 多笔订单

这个担保合约一次只能支持一笔订单，让我们将他进行推广。

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract OTC {
    uint256 public counter;

    struct Order {
        address owner;
        address bid_token;
        address ask_token;
        uint bid_amount;
        uint ask_amount;
    }

    Order[] public orders;

    function give(address bid_token, address ask_token, uint bid_amount, uint ask_amount) public {        
        IERC20(bid_token).transferFrom(msg.sender, address(this), bid_amount);        
        orders.push(Order({
            owner: msg.sender,
            bid_token: bid_token,
            ask_token: ask_token,
            bid_amount: bid_amount,
            ask_amount: ask_amount
        }));
    }

    function take(uint id) public {
        IERC20(orders[id].ask_token).transferFrom(msg.sender, orders[id].owner, orders[id].ask_amount);
        IERC20(orders[id].bid_token).transfer(msg.sender, orders[id].bid_amount);
        orders[id].bid_amount = 0;
        orders[id].ask_amount = 0;        
    }

    function withdraw(uint id) public {
        require(msg.sender == orders[id].owner, "Owner mismatch");
        IERC20(orders[id].bid_token).transfer(msg.sender, orders[id].bid_amount);
        orders[id].bid_amount = 0;
        orders[id].ask_amount = 0;
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address who) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```
### 内存清理

### 链下排序

### 链下撮合