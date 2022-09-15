---
sidebar: auto
---

- [https://github.com/Jeiwan/uniswapv3-book](https://github.com/Jeiwan/uniswapv3-book)

# Ch.2 Uniswap 去中心化交易所
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

