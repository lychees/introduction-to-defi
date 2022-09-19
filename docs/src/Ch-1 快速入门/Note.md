
# 本章注记

## 比特币与区块链
关于区块链的知识很多分散在互联网上，最系统性的纸质资料是 [德烈亚斯·安东诺普洛斯(Andreas Antonopoulos)](https://en.wikipedia.org/wiki/Andreas_Antonopoulos) 所撰写的系列书籍。
-[《精通比特币》](https://github.com/bitcoinbook/bitcoinbook)
-[《精通以太坊》](https://github.com/ethereumbook/ethereumbook)。

## Solidity
最简单和主流智能合约开发语言是以太坊的 Solidity。关于 Solidity 的相关知识最全面的介绍是 [以太坊官方文档](https://docs.soliditylang.org/)。Youtube 主播 Hung-Ying Tai，也做过两期全面的关于 Solidity 开发的介绍，包括 [2018](https://www.youtube.com/watch?v=z2FEikbDqoA&list=PLHmOMPRfmOxSJcrlwyandWYiuP9ZAMYoF) 和 [2020](https://www.youtube.com/watch?v=l6xmGVweJyk&list=PLHmOMPRfmOxQ3HSlId8KAKxnt8yuyTZVk) 两个版本。


## 可分润代币

> Lost coins only make everyone else's coins worth slightly more. Think of it as a donation to everyone.
> —— [Satoshi Nakamoto, Dead bitcoins are good bitcoins](https://bitcointalk.org/index.php?topic=198.msg1647#msg1647)

早在 2010 年的 Bitcoin Talk 论坛中，中本聪就发表过上述对丢失私钥的比特币的看法，其中丢失的比特币等价于销毁，从而间接的相当于对整个社区的捐赠，在 Burnable ERC-20 出现之前，事实上大家就通过将代币打向 [0x0000000000000000000000000000000000000000]() 这一来代表销毁动作，零地址通常又称之为「黑洞地址」。

关于抵押挖矿算法，最早可见于 Albert-Ludwigs 大学的软件工程系主任 Jochen Hoenicke 教授的 [一篇博文](https://test.jochen-hoenicke.de/crypto/ponzitoken/)，尽管这个算法在博文中有许多的 bug，随后它们在 `PoWH` 系列合约被修复并得到应用，之后，在一系列流动性挖矿合约中被发扬光大。

关于被动生息算法，许多项目都做出过独立发现，在 `Compound` 中它们被称之为 `cToken`，而在 `Yearn` 中它们被称之为 `yToken`。虽然这些生息代币的本质并无不同，但因为以上的历史原因导致它们的接口并不一致，特别是早期 `Yearn v1` 的合约中，命名缺乏一致性。

随后出现的 `ERC-4626` 标准试图解决了这一问题，相比于我们本节提供的生息算法代码，`ERC-4626` 提供了完整的 4 个方向的存取接口，用户在使用时只需要定义具体的生息逻辑。


## 其他智能合约应用

DeFi 产品，因为其对安全性和去信任的需求，同时，相对的，对性能的不敏感，被称为以太坊的杀手级应用，是目前区块链上用户最多，资金体量最大，应用最广泛的分支。除了 `DeFi` 之外，智能合约也有一些其他重要的应用。ScalarCapital 的 CoFounder Linda Xie 撰写过一组初学者指南，介绍目前应用最广泛的几类产品。

- [DeFi 初学者指南](https://www.matataki.io/p/10718)
- [NFTs 初学者指南]()
- [DAOs 初学者指南]()
- [社交代币初学者指南](https://www.matataki.io/p/10876)

## 其它
- [DeFi 懒人包：去中心化金融指南](https://blocktrend.gitbook.io/defi/)
- [区块链社会学](https://matataki.io/p/4804)

