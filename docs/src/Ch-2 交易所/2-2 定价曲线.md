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
    