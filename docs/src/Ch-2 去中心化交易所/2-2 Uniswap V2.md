
# 2-2 Uniswap V2
## Uniswap 简介

本章介绍去中心化交易所 Uniswap，Uniswap 是一个运行在以太坊上的自动化做市商协议，用于 Ethereum 上各个代币之间的交换。它使用自动化做市商（Automated Market Maker, a.k.a. AMM）技术而非订单簿（Order Book），任何人在任何时候都可以向合约发起交易，任何人任何时候也都可以通过向合约提供流动性赚取交易过程中的手续费（每笔交易的 0.3%）并且随时取回这些流动性。任何人也都可以通过提供初始流动性池而创建一个新的交易对。Uniswap 最鲜明的特征就是在交易的前后维持代币数量的乘积不变（Constant Product Market Maker）。

本章中的代码来自 V2 版本。

### 里程碑

- [2018-11 初版 Uniswap 在以太坊开发者大会 Devcon4 期间上线](https://uniswap.org/docs/v1/)，这是一个使用类 Python 语法的合约语言 Vyper 实现的版本。
- [2019-11 Uniswap 一周年的时候创始人 Hayden 曾经写过一篇内容丰富的回顾其发展历史的 Blog](https://medium.com/uniswap/uniswap-birthday-blog-v0-7a91f3f6a1ba)。
- [2020-05 上线 V2](https://uniswap.org/blog/launch-uniswap-v2/)，这是一个用 Solidity 实现的版本，开始实现支持原生 ERC20-ERC20 交易对等诸多新功能。
- [2020-08 完成 A 轮融资](https://uniswap.org/blog/uniswap-raise/)

### 增长


![image.png](https://ssimg.frontenduse.top/article/2020/08/07/c8c11db7d4ec7e14694ff36517e5762d.png)


- [DeFiPulse](https://defipulse.com/uniswap)

## 去中心化交易所的必要性与瓶颈

作为去中心化资产的加密货币，长期以来却依靠著中心化的交易所提供的交易服务，作为一个悖论一直以来制约著加密货币的发展。自中心化交易所诞生之日开始，因各种事故所造成的丢币事件就屡见不鲜[^1][^2]。仅在 2019 年，就有超过 2.9 亿美元的加密货币被盗和超过 50 万条身份信息从中心化交易所中被泄漏出去。[^leak]

[^leak]: - [Most Significant Hacks of 2019](https://cointelegraph.com/news/most-significant-hacks-of-2019-new-record-of-twelve-in-one-year)


![image.png](https://ssimg.frontenduse.top/article/2020/08/07/6dff67b8ba7ad95bf5ecfca6625ffab9.png)
> Mt.Gox 事件开启了比特币长达近三年之久的黑暗时代

| 时间 | 交易所 | 被骇金额 |
| -------- | -------- | -------- |
|      | Mt. Gox     | $700MM     |
|      | Coincheck     | $530MM     |
|      | Bitfinex     | $120MM    |
|      | Binanace     | $27MM     |

除了被骇的风险之外，去中心化交易所因为没有引入额外的控制，从而无需进行 KYC 对用户和资产进行区别对待，还可以提供相应的 API 对交易所的流动性进行编程，并且使得交易更长尾和临时的资产（cTokens, liquidity tokens, NFTs, etcs）成为可能。

虽然不时有新的去中心化交易所的设计出现，但是因为速度、延迟、交易手续费等所造成用户体验方面的缺陷，使得这些去中心化交易所的交易规模都无法同便捷、高效的中心化交易所竞争，人们一直在等待著一个真正可以适合大规模应用的去中心化交易所方案。

[^1]: MtGox
[^2]: 中心化交易所被骇总结。
[^3]: [🦄 Uniswap Birthday Blog — V0](https://medium.com/uniswap/uniswap-birthday-blog-v0-7a91f3f6a1ba)



## 定价曲线（Bounding Curve）

根据是否有具有订单簿，通常可将去中心化交易所简单分成有订单和无订单两种主要形式，Uniswap 属于后者。简单说来，Uniswap 通过 [工厂合约](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol#L23)，为每个交易对创建一个交易对合约，交易对合约中托管两种资产 A 和 B，设她们的数量分别为 x 和 y，任何时刻，合约认为 x 数量的 A 资产和 y 数量的 B 资产的价值是相等的，并且在每次交易的前后，维持合约中 x 和 y 的乘积不变（Invariant），既 `x*y = k`。

![](https://i.imgur.com/H9entj5.png)

合约的初始流动性则有创建者给定，在给定了初始流动性的同时，它们的当前时刻的价格也就确定了。和 Bancor 协议所不同的是，任何用户都可以随时增加，和移除之前已增加的流动性，从而反映真实的市场交易需求。增加流动性的用户将获得对应的流动性通证，并作为日后分享合约交易手续费，以及赎回所提供的流动性资产的凭证。增加和删除流动性的过程中，维持合约中 x 和 y 的比值不变，即增减流动性操作不影响当前通证的价格。

Uniswap 由于其极简主义的设计，使得其相较其他去中心化交易所，非常节约交易手续费。对于 ETH 到 ERC20 的交易，它比 Bancor 的手续费低近 10 倍。

| 交易所 | Uniswap | EtherDelta | Bancor | Radar Relay (0x) | IDEX | Airswap |
| -------- | -------- | -------- | -------- | -------- | -------- |---- |
| ETH to ERC20     | 46,000    |108,000    | 440,000 | 113,000 | 143,000 | 90,000 |
| ERC20 to ETH     | 60,000    | 93,000   | 403,000 | 113,000 | 143,000 |120,000* |
| ERC20 to ERC20     | 88,000  | -   | 538,000 | 113,000 | - |- |


### Swap 函数

Uniswap V2 中将协议分成了核心模块 [Uniswap Core](https://github.com/Uniswap/uniswap-v2-core) 和外围的辅助模块 [Uniswap Periphery](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol)。而其中所有的兑换行为，最后都被规约到了核心模块的 `swap()` 函数，此所谓「Uniswap」之由来。一般说来，内核合约是不太可能变化的，而辅助合约是有可能升级的，当前所用的 Router 就是第二版。

```solidity=158
// this low-level function should be called from a contract which performs important safety checks
function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
    require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
    (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
    require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

    uint balance0;
    uint balance1;
    { // scope for _token{0,1}, avoids stack too deep errors
    address _token0 = token0;
    address _token1 = token1;
    require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
    if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
    if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
    if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
    balance0 = IERC20(_token0).balanceOf(address(this));
    balance1 = IERC20(_token1).balanceOf(address(this));
    }
    uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
    uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
    require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
    { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
    uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
    uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
    require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
    }

    _update(balance0, balance1, _reserve0, _reserve1);
    emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
}
```

[https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L158](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L158)

我们发现在 [UniswapV2Pair.sol](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) 中，并没有进行相应的数值运算，而仅仅是在第 182 行检查了不等约束。这是一种常见的合约优化技巧，可以将较为耗时具体的数值运算转移到链下进行而同时保证链上合约运行的准确无误。

# 流动性提供者 Liquidity Provider

## 流动性提供者（Liquidity Provider）

### 流动性通证

Uniswap 的流动性通证是一种支持增发（Mint）和销毁（Burn）的 ERC20 通证，在核心模块的 [UniswapV2ERC20.sol](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) 中定义，发行方为交易对合约。

```solidity=40
    function _mint(address to, uint value) internal {
        totalSupply = totalSupply.add(value);
        balanceOf[to] = balanceOf[to].add(value);
        emit Transfer(address(0), to, value);
    }

    function _burn(address from, uint value) internal {
        balanceOf[from] = balanceOf[from].sub(value);
        totalSupply = totalSupply.sub(value);
        emit Transfer(from, address(0), value);
    }
```
[https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol#L40](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol#L40)

### 提供流动性

当用户执行 `add_liquidity` 操作时，最后将会由核心模块执行 `Mint()` 函数根据该笔操作所提供的流动性与当前合约整体流动性的比值，计算出需要增发的流动性通证的数额。

假设当前已发行 t 单位流动性通证，合约中 A、B 两种资产的储备金数值分别为 x，y。新加入的储备金分别为 x'，y'，那么需满足：`x/y = x'/d'`

新发行的流动性通证 t'，那么有：`x'/x = y'/y = t'/t`。

根据此关系可以计算出新发行的流动性通证的数值（第 123 行）。

```solidity=32
    function _addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    ) internal virtual returns (uint amountA, uint amountB) {
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
    }
```
[https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol#L32](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol#L32)

```solidity=109
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);

        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

- [https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L109](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L109)

### 销毁流动性

```solidity=109
    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

```solidity=113
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];

        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }
```

- [https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L133](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L133)

### 分润

流动性通证除了用作取回抵押品的凭证，另一个功能就是作为分取交易过程中所产生手续费的凭证。这一类似股票但又更加实时的特性是也是通证经济中最重要的组成部分。关于分润，朴素的算法是在每一次交易过后，或者约的分红时间，实时的计算每个股东的分红，这样的时间复杂度是 O(n) 级别，其中 n 是股东的规模，对于任何用户都可以持有流动性通证的 Uniswap，显然不 Make sense。

一般合约中处理分润的方法是类似某些算法分析中所采用的势能分析或者数据结构中懒标记（Lazy Tag）的方式。而 Uniswap 所使用的方法是在交易的过程中将产生的手续费直接增加的 liqudity pool 中，这样的好处是不需要额外的逻辑处理分润。因而在每次交易时，k 的值实际有所增加，详情可参考文档中关于 [手续费的段落](https://uniswap.org/docs/v2/advanced-topics/fees)。


## 无常损失（Impermanent Loss）
手续费的分润是实时的，但在价格变化较大的情况下，流动性提供者会遭受「无常损失」（Impermanent Loss）。当价格恢复到提供流动性时的水平时，损失就会减少。如果交易量足够大，赚取的费用可能会抵消这一损失。

## 预言机（Oracle）

## 派生协议（Descendants）

自 Uniswap 兴起以来，AMM 上的创新层出不穷。出现了 Uniswap 的派生军团，每个派生协议都有自己的特色。

![image.png](https://ssimg.frontenduse.top/article/2020/08/07/a4229d4e7f78a1f63c6f1d9501f96bf8.png)
> Uniswap、Balancer 和Curve 交易量。来源 Dune Analytics

虽然它们都继承了 Uniswap 的核心设计，但它们都有自己专门的特点。以 [Curve](https://www.curve.fi/) 为例，它使用的是恒定产品和恒定总和的混合物，或者 [Balancer](https://balancer.finance/)，它的定价函数则是多维曲面（Multi-dimensional Surface）。甚至还有的可以用完已有的库存，例如用来销售限量版商品的 [Foundation](https://withfoundation.com/blog/we-are-empowering-creators-to-build-their-own-markets-on-ethereum)。


![image.png](https://ssimg.frontenduse.top/article/2020/08/07/256a75194680cab5262f71b6819a6304.png)

不同的曲线更适合某些资产，因为它们蕴含了对被报价资产之间价格关系的不同假设。你可以在上图中看到，Stableswap 曲线（蓝色）在大部分时间都近似于一条线，这意味着在其大部分交易范围内，两种稳定币的价格会非常接近。如果我们知道交易对两边的资产是两种稳定币，它们的价值会差不多，那么 Stableswap 曲线会产生更有竞争力的定价。

当然，AMM 可以采用无限多的特定曲线进行定价，我们可以把所有这些不同的定价函数抽象出来，并把这个类别称之为 CFMMs 簇，既恒定函数做市商。

## 本章注记

最早的关于去中心化交易所的尝试可追溯到比特币时代的 Hash Time Locked Contracts，例如 Bisq 和 LocalBitcoins，这些模式昂贵，缓慢，不灵活但是久经检验。另一些尝试是 Ring Exchanges，例如 ShapeShift。另一些人开始尝试构建一条新的区块链来处理交易，求中最具有代表性的是比特股（BitShares），但是这些定制化的区块链因为缺少原生的交易资产，在跨链技术还没有成熟的时代，需要引入额外的信任来构建可交易的资产。

紧接著出现的是 OasisDex 和 EtherDelta，前者是 MakerDAO 团队为 MKR 和 DAI 建立的链上託管的交易所，在很长时间裡 OasisDex 都是 Ethereum 上流量最高的去中心化交易所之一。EtherDelta 则是划时代的去中心化交易所设计方式，她通过 Off-chain Relay，On-chain Settlement 的方式，做出了绝佳的 trade-off，真正将中心化交易所带向普及。

![](https://i.imgur.com/J2rYqu0.png)

从完全链上模式的去中心化交易所中，又衍生出两个分支，她们分别是有订单薄的（代表产品 Kyber）和没有订单簿的 Bancor。Bancor 最早引入了 Bounding Curve 的概念，并提出无需订单簿的交易机制更加能够适应长尾代币的需求[4]，但是她的 Bounding Curve 设计较为複杂，且有一个保证金率的参数，使得合约在一经设定之后，流动性就是固定的。后来一些人们发现，Bounding Curve 不必依赖 Bancor 中的複杂曲线，例如著名的 P3D 游戏，使用最简单的一次函数来作为 Bounding Curve。

最早的 Uniswap V1 合约只有 300 行，Uniswap 所使用的反比例函数最早出现在预测市场中。尽管这种机制不是 Uniswap 首创，但是是在 Uniswap 之中得到发扬光大，以至于人们直接使用 Uniswap-like 来指代 Constant Product Market Maker。

很多后续的产品也在 Uniswap 的 Bounding Curve 基础上进行改造，例如 Banlencer 和 Curve。令人惊讶的是 Uniswap 迄今为止依然没有自己的原生治理通证而只有流动性代币，但这通常认为这也是 Uniswap 去中心化和极简主义的一个表现。Uniswap 会不会在 V3 中引入治理代币，将会如何引入成为每一个关心 DeFi 发展的人都在思考的问题。

[^3]: [Bancor Protocol Continuous Liquidity for Cryptographic Tokens through their Smart Contracts](https://storage.googleapis.com/website-bancor/2018/04/01ba8253-bancor_protocol_whitepaper_en.pdf)


## 参考资料

- [解析 DeFi 项目《Uniswap》，吴冠融 Roger Wu](https://medium.com/taipei-ethereum-meetup/defi-uniswap-1-e36db975e4ae)
- [A Brief History Of Decentralized Exchange, Tom Schmidt](https://github.com/carboclan/pm/issues/69)
- [What explains the rise of AMMs?](https://medium.com/dragonfly-research/what-explains-the-rise-of-amms-7d008af1c399)
- [When is Uniswap a good oracle?](https://medium.com/gauntlet-networks/why-is-uniswap-a-good-oracle-22d84e5b0b6c)
- [An analysis of Uniswap markets](https://arxiv.org/abs/1911.03380)
- [Uniswap - 智能合约V2代码导读](https://mp.weixin.qq.com/s/N6GJfamwpqsx87ZObfBEKA)

## 习题

1. [R] P3D 的线性价格曲线
2. [R] 可分润代币模型
3. [SR] Bancor 的价格公式
4. [SR] Rex 的设计
5. [SSR] Uniswap 的缺陷在于资金利用率较低，请设计一种新的 AMM 合约，改善这一问题。 
 



