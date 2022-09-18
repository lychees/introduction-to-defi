# 2-1 Proof of Weak Hand
![v2-9a62d6dd0de088541c0b2d313c6dd24e_1440w](https://user-images.githubusercontent.com/2507027/190430432-dbf8071d-0209-4e07-9240-e1905587a650.jpg)

本节我们将回到波澜壮阔的前 DeFi 时代（pre-DeFi era），回顾一个具有里程碑意义的合约 —— P3D。
它也许是整个 DeFi 发展历史中最为有趣的例子没有之一，尽管通常并不认为它是一个 DeFi 协议。

我们之所以将 P3D 放在本章的开始，因为 P3D 是最简单的同时包含了 AMM 和可分润代币技术的例子，而这两个技术是后来的 Dex 赖以维系的基石。

## Ponzi Coin


- [https://hackmd.io/@npzGNxIuQ02qn1wM6rPklw/rJjjPb7NQ?type=view](https://hackmd.io/@npzGNxIuQ02qn1wM6rPklw/rJjjPb7NQ?type=view)
- [https://zhuanlan.zhihu.com/p/33404944](https://zhuanlan.zhihu.com/p/33404944)
- [https://etherscan.io/address/0xe3f64dc522a66405c51d96aae234217a03502bb4#code](https://etherscan.io/address/0xe3f64dc522a66405c51d96aae234217a03502bb4#code)

在开始介绍 P3D 之前，先让我们来看一个更简单的原型。

自以太坊诞生之后，每隔几天就会有一个以 Ponzi 冠名的合约出现，但是像 [Ponzi Coin](https://web.archive.org/web/20180201141117/http://ponzicoin.co/home.html) 这样令人印象深刻的案例却并不多见。

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

但是上面的 Ponzi Coin 并不是一个好的设计，它有着极为致命的缺陷，每个阶段后，对于新人，为了能够回本，它需要引入比上一阶段多一倍的新人。而我们知道 [就算是 Covid 这样的模型也保持指数增长](https://www.youtube.com/watch?v=gxAaO2rsdIs)。
而这种摩擦力阻力会制约合约的繁荣，最终，就如同所有的 Ponzi Scheme 一样随时间坍塌。

## 定价曲线

- [https://etherscan.io/address/0xb3775fb83f7d12a36e0475abdd1fca35c091efbe#code](https://etherscan.io/address/0xb3775fb83f7d12a36e0475abdd1fca35c091efbe#code)

但我们也并不应该全然否定这份代码原型。和第一章中的担保交易合约不同，在 Ponzi Coin 中，用户在任何时刻都可以与合约进行交易，
而不需要等待一定有对手盘匹配，而这就是自动化做市商的原型。

Ponzi Coin 的缺陷在于，它的定价方法明显违反科学。它是一个糟糕的、增长过快的分段线性函数。我们能否用一个连续的平滑曲线替代它呢？答案是肯定的，而所有定价曲线中，最简单的类型就是一次线性函数。

### 线性定价曲线

我们能修改 Ponzi Coin 的代码使得其代币的价格正比于其当前的发行量吗？
难点在于，在购买的过程中，价格会发生变化，我们必须保证合约的一致性（Consistency），
也就是无论从哪个方向开始移动价格，购买和售出的总量应是相同的（不考虑手续费因素）。

事实上，上一节中 Ponzi Coin 的也没有很好的处理一致性的问题，而是多维护了 tierBudget，来跳过这个问题，
因而可能某一次交易中，交易者只交易了一个代币，就因为价格发生变化而中断，不得不再次发起交易了，
也许正是因为这些困难，才让 Ponzi Coin 的作者最终选择了这套方案。

我们可以把价格看作是发行量的函数，那么我们会得到一个积分问题，但在函数是一次函数的情况下，这个积分的结果只是一个二次函数。
不难列出一元二次方程，解这个方程即可得到横坐标的变化量。

```solidity
    /**
     * Calculate Token price based on an amount of incoming ethereum
     * It's an algorithm, hopefully we gave you the whitepaper with it in scientific notation;
     * Some conversions occurred to prevent decimal errors or underflows / overflows in solidity code.
     */
    function ethereumToTokens_(uint256 _ethereum)
        internal
        view
        returns(uint256)
    {
        uint256 _tokenPriceInitial = tokenPriceInitial_ * 1e18;
        uint256 _tokensReceived = 
         (
            (
                // underflow attempts BTFO
                SafeMath.sub(
                    (sqrt
                        (
                            (_tokenPriceInitial**2)
                            +
                            (2*(tokenPriceIncremental_ * 1e18)*(_ethereum * 1e18))
                            +
                            (((tokenPriceIncremental_)**2)*(tokenSupply_**2))
                            +
                            (2*(tokenPriceIncremental_)*_tokenPriceInitial*tokenSupply_)
                        )
                    ), _tokenPriceInitial
                )
            )/(tokenPriceIncremental_)
        )-(tokenSupply_)
        ;
  
        return _tokensReceived;
    }
    
    /**
     * Calculate token sell value.
     * It's an algorithm, hopefully we gave you the whitepaper with it in scientific notation;
     * Some conversions occurred to prevent decimal errors or underflows / overflows in solidity code.
     */
     function tokensToEthereum_(uint256 _tokens)
        internal
        view
        returns(uint256)
    {

        uint256 tokens_ = (_tokens + 1e18);
        uint256 _tokenSupply = (tokenSupply_ + 1e18);
        uint256 _etherReceived =
        (
            // underflow attempts BTFO
            SafeMath.sub(
                (
                    (
                        (
                            tokenPriceInitial_ +(tokenPriceIncremental_ * (_tokenSupply/1e18))
                        )-tokenPriceIncremental_
                    )*(tokens_ - 1e18)
                ),(tokenPriceIncremental_*((tokens_**2-tokens_)/1e18))/2
            )
        /1e18);
        return _etherReceived;
    }
    
    
    //This is where all your gas goes, sorry
    //Not sorry, you probably only paid 1 gwei
    function sqrt(uint x) internal pure returns (uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
```

上面最后的代码既是著名的 [牛顿迭代（Newton's method）](https://en.wikipedia.org/wiki/Integer_square_root#Algorithm_using_Newton's_method)。这是一段 O(logn) 复杂度的算法，你可能会像上面的注释那样对此抱有疑问，但事实是 O(logn) 复杂度的算法在智能合约中并不罕见。

关于牛顿迭代，有一段著名的关于约翰卡马克和他的雷神之锤的故事。但是这里的篇幅并不够。
我们可能更关心 id software 和它的经销商们如何确立合同，如何设置分润的问题。

## 可分润代币

有了定价曲线之后，就可以方便的写交易函数。但是 wait，这下面的代码怎么还是那么长啊？

```solidity
    function purchaseTokens(uint256 _incomingEthereum, address _referredBy)
        antiEarlyWhale(_incomingEthereum)
        internal
        returns(uint256)
    {
        // data setup
        address _customerAddress = msg.sender;
        uint256 _undividedDividends = SafeMath.div(_incomingEthereum, dividendFee_);
        uint256 _referralBonus = SafeMath.div(_undividedDividends, 3);
        uint256 _dividends = SafeMath.sub(_undividedDividends, _referralBonus);
        uint256 _taxedEthereum = SafeMath.sub(_incomingEthereum, _undividedDividends);
        uint256 _amountOfTokens = ethereumToTokens_(_taxedEthereum);
        uint256 _fee = _dividends * magnitude;
 
        // no point in continuing execution if OP is a poorfag russian hacker
        // prevents overflow in the case that the pyramid somehow magically starts being used by everyone in the world
        // (or hackers)
        // and yes we know that the safemath function automatically rules out the "greater then" equasion.
        require(_amountOfTokens > 0 && (SafeMath.add(_amountOfTokens,tokenSupply_) > tokenSupply_));
        
        // is the user referred by a masternode?
        if(
            // is this a referred purchase?
            _referredBy != 0x0000000000000000000000000000000000000000 &&

            // no cheating!
            _referredBy != _customerAddress &&
            
            // does the referrer have at least X whole tokens?
            // i.e is the referrer a godly chad masternode
            tokenBalanceLedger_[_referredBy] >= stakingRequirement
        ){
            // wealth redistribution
            referralBalance_[_referredBy] = SafeMath.add(referralBalance_[_referredBy], _referralBonus);
        } else {
            // no ref purchase
            // add the referral bonus back to the global dividends cake
            _dividends = SafeMath.add(_dividends, _referralBonus);
            _fee = _dividends * magnitude;
        }
        
        // we can't give people infinite ethereum
        if(tokenSupply_ > 0){
            
            // add tokens to the pool
            tokenSupply_ = SafeMath.add(tokenSupply_, _amountOfTokens);
 
            // take the amount of dividends gained through this transaction, and allocates them evenly to each shareholder
            profitPerShare_ += (_dividends * magnitude / (tokenSupply_));
            
            // calculate the amount of tokens the customer receives over his purchase 
            _fee = _fee - (_fee-(_amountOfTokens * (_dividends * magnitude / (tokenSupply_))));
        
        } else {
            // add tokens to the pool
            tokenSupply_ = _amountOfTokens;
        }
        
        // update circulating supply & the ledger address for the customer
        tokenBalanceLedger_[_customerAddress] = SafeMath.add(tokenBalanceLedger_[_customerAddress], _amountOfTokens);
        
        // Tells the contract that the buyer doesn't deserve dividends for the tokens before they owned them;
        //really i know you think you do but you don't
        int256 _updatedPayouts = (int256) ((profitPerShare_ * _amountOfTokens) - _fee);
        payoutsTo_[_customerAddress] += _updatedPayouts;
        
        // fire event
        onTokenPurchase(_customerAddress, _incomingEthereum, _amountOfTokens, _referredBy);
        
        return _amountOfTokens;
    }
```

```solidity
    /**
     * Liquifies tokens to ethereum.
     */
    function sell(uint256 _amountOfTokens)
        onlyBagholders()
        public
    {
        // setup data
        address _customerAddress = msg.sender;
        // russian hackers BTFO
        require(_amountOfTokens <= tokenBalanceLedger_[_customerAddress]);
        uint256 _tokens = _amountOfTokens;
        uint256 _ethereum = tokensToEthereum_(_tokens);
        uint256 _dividends = SafeMath.div(_ethereum, dividendFee_);
        uint256 _taxedEthereum = SafeMath.sub(_ethereum, _dividends);
        
        // burn the sold tokens
        tokenSupply_ = SafeMath.sub(tokenSupply_, _tokens);
        tokenBalanceLedger_[_customerAddress] = SafeMath.sub(tokenBalanceLedger_[_customerAddress], _tokens);
        
        // update dividends tracker
        int256 _updatedPayouts = (int256) (profitPerShare_ * _tokens + (_taxedEthereum * magnitude));
        payoutsTo_[_customerAddress] -= _updatedPayouts;       
        
        // dividing by zero is a bad idea
        if (tokenSupply_ > 0) {
            // update the amount of dividends per token
            profitPerShare_ = SafeMath.add(profitPerShare_, (_dividends * magnitude) / tokenSupply_);
        }
        
        // fire event
        onTokenSell(_customerAddress, _tokens, _taxedEthereum);
    }
```

好的答案是，上面的代码大部分段落在处理分润相关的逻辑，（同时它也没有做好代码优化！），导致原本很简单的逻辑被写得很乱很长。

## 生息代币

在结束本节之前...

- 销毁
- 分红
- 生息


| 项目	   |    抵押物	  |  可分润代币 | 利润来源  | 分润模式 |
|----------|-------------|-------------|----------|---------|
| BTC      | 矿机        | BTC         | 手续费    |  销毁   |
| ETH      | 矿机/ETH    | ETH         |          | 销毁     |
| Unipool  | LP Token    | LP Token    |          | 分红    |
| P3D      | ETH         | P3D         |          | 分红    |
| Uniswap  | A/B	     | LP Token    |          | 生息    |
| EOS Rex  | EOS	     | Rex         |          | 生息    |
| yDAI	   | DAI	     | yDAI        |          | 生息    |


我们来设计一个等价于 P3D 的生息代币。

在下一节要介绍的 Uniswap V2 中的 LP Token 和后续章节介绍的 cToken、yToken 都属于这种生息代币模式。



