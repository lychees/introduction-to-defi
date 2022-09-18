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
