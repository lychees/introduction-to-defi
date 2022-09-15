# 2-1 Proof of Week Hand
![v2-9a62d6dd0de088541c0b2d313c6dd24e_1440w](https://user-images.githubusercontent.com/2507027/190430432-dbf8071d-0209-4e07-9240-e1905587a650.jpg)

本节我们将回到前 DeFi 时代（pre-DeFi era），介绍一个具有里程碑意义的项目 —— P3D。
它也许是整个 DeFi 发展历史中最为独特和有趣的例子，尽管通常并不认为它是一个 DeFi 协议。

## Ponzi Coin

- [https://web.archive.org/web/20180201141117/http://ponzicoin.co/home.html](https://web.archive.org/web/20180201141117/http://ponzicoin.co/home.html)
- [https://zhuanlan.zhihu.com/p/33404944](https://zhuanlan.zhihu.com/p/33404944)
- [https://etherscan.io/address/0xe3f64dc522a66405c51d96aae234217a03502bb4#code](https://etherscan.io/address/0xe3f64dc522a66405c51d96aae234217a03502bb4#code)

自以太坊诞生之后，每隔几天就会有一个以 Ponzi 冠名的合约出现，但是像 Ponzi Coin 这样令人印象深刻的案例却并不多见。

![image](https://user-images.githubusercontent.com/2507027/190435209-becfb54e-9d7b-4967-8965-aaa4759c1e45.png)

事实上，它的机制就如同图中所示的那样粗暴简单。。。

```solidity
/// @title Token contract - Implements Standard Token Interface but adds Pyramid Scheme Support :)
/// @author Rishab Hegde - <contact@rishabhegde.com>
contract PonziCoin is StandardToken, SafeMath {

    /*
     * Token meta data
     */
    string constant public name = "PonziCoin";
    string constant public symbol = "SEC";
    uint8 constant public decimals = 3;

    uint public buyPrice = 10 szabo;
    uint public sellPrice = 2500000000000 wei;
    uint public tierBudget = 100000;

    // Address of the founder of PonziCoin.
    address public founder = 0x506A24fBCb8eDa2EC7d757c943723cFB32a0682E;

    /*
     * Contract functions
     */
    /// @dev Allows user to create tokens if token creation is still going
    /// and cap was not reached. Returns token count.
    function fund()
      public
      payable 
      returns (bool)
    {
      uint tokenCount = msg.value / buyPrice;
      if (tokenCount > tierBudget) {
        tokenCount = tierBudget;
      }
      
      uint investment = tokenCount * buyPrice;

      balances[msg.sender] += tokenCount;
      Issuance(msg.sender, tokenCount);
      totalSupply += tokenCount;
      tierBudget -= tokenCount;

      if (tierBudget <= 0) {
        tierBudget = 100000;
        buyPrice *= 2;
        sellPrice *= 2;
      }
      if (msg.value > investment) {
        msg.sender.transfer(msg.value - investment);
      }
      return true;
    }

    function withdraw(uint tokenCount)
      public
      returns (bool)
    {
      if (balances[msg.sender] >= tokenCount) {
        uint withdrawal = tokenCount * sellPrice;
        balances[msg.sender] -= tokenCount;
        totalSupply -= tokenCount;
        msg.sender.transfer(withdrawal);
        return true;
      } else {
        return false;
      }
    }

    /// @dev Contract constructor function sets initial token balances.
    function PonziCoin()
    {   
        // It's not a good scam unless it's pre-mined
        balances[founder] = 200000;
        totalSupply += 200000;
    }
}
```

但是上面的 Ponzi Coin 并不是一个好的设计，它有着极为致命的缺陷，每个阶段后，对于新人，为了能够回本和盈利，它需要引入比上一阶段多一倍的新人。
这让这个模型维持增长所需的人数是一个指数增长，而地球上的人类是有限的，就算是 Covid 也无法保持始终维持指数增长。
而这种摩擦力会制约合约的繁荣，于是就像一个衰老的帝国，随着文官集团的腐朽而坍塌。

## 定价曲线

但是 Ponzi Coin 原型也有可取之处，和第一章中的担保交易合约不同，用户在任何时刻都可以和合约进行交易，
而不需要等待一定有对手盘匹配才可行，这其实就是自动化做市商思想的原型。

而上述的 Ponzi Coin 的定价明显不科学，它是一个糟糕的分段线性函数，我们能否用一个连续的平滑曲线进行替代呢？
答案是可行的，而所有定价曲线中，最简单的类型就是一次线性函数。

## 可分润代币
