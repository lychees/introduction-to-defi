
# 本章注记

## 比特币与以太坊
区块链的知识很多分散在互联网上，最系统性的纸质资料是 [德烈亚斯·安东诺普洛斯(Andreas Antonopoulos)](https://en.wikipedia.org/wiki/Andreas_Antonopoulos) 所撰写的系列书籍：
- [《精通比特币》](https://github.com/bitcoinbook/bitcoinbook)
- [《精通以太坊》](https://github.com/ethereumbook/ethereumbook)

关于比特币诞生前后的壮丽历史，可以观看 2014 年的纪录片[《比特币的崛起》（The Rise and Rise of Bitcoin）](https://www.bilibili.com/video/BV1K441177JB)，以太坊的创始人之一 Vitalik Buterin 也在这部纪录片中出镜，那时的他还在为 Bitcoin Magazine 撰写文章。关于以太坊诞生前后的历史，可以阅读 theDefiant 主编 Camila Russo 所写的 [The Infinite Machine: How an Army of Crypto-hackers Is Building the Next Internet with Ethereum](https://www.amazon.co.uk/Infinite-Machine-Crypto-hackers-Building-Internet-ebook/dp/B07X8HS2WC) 一书。

## Solidity
最简单和主流智能合约开发语言是以太坊的 Solidity。关于 Solidity 的相关知识最全面的介绍是 [以太坊官方文档](https://docs.soliditylang.org/)。Youtube 主播 Hung-Ying Tai，也做过两期全面的关于 Solidity 开发的介绍，包括 [2018](https://www.youtube.com/watch?v=z2FEikbDqoA&list=PLHmOMPRfmOxSJcrlwyandWYiuP9ZAMYoF) 和 [2020](https://www.youtube.com/watch?v=l6xmGVweJyk&list=PLHmOMPRfmOxQ3HSlId8KAKxnt8yuyTZVk) 两个版本。

Solidity 并不是唯一的智能合约开发语言，但依然是目前最流行的。

![image](https://user-images.githubusercontent.com/2507027/190984722-3667a8de-d6d4-4b76-8099-8ba0086e588b.png)
![image](https://user-images.githubusercontent.com/2507027/190984962-7461d5db-a289-4973-a1a1-25b7f8141fe4.png)
- [https://defillama.com/languages](https://defillama.com/languages)

## 可分润代币

> Lost coins only make everyone else's coins worth slightly more. Think of it as a donation to everyone.
> —— [Satoshi Nakamoto, Dead bitcoins are good bitcoins](https://bitcointalk.org/index.php?topic=198.msg1647#msg1647)

早在 2010 年的 Bitcoin Talk 论坛中，中本聪就发表过上述对丢失私钥的比特币的看法，那时人们就明白，丢失的比特币等价于一种销毁，从而间接的相当于对整个社区的捐赠，在 Burnable ERC-20 出现之前，事实上大家就是通过将代币打向 [0x0000000000000000000000000000000000000000]() 来代表销毁动作，因为没有人拥有这个地址的私钥。「零地址」通常又被称为「黑洞地址」。

关于抵押挖矿算法，最早可见于 Albert-Ludwigs 大学的软件工程系主任 Jochen Hoenicke 教授的 [一篇博文](https://test.jochen-hoenicke.de/crypto/ponzitoken/)——尽管博文中有许多的 bug。随后这个算法在 `PoWH` 中得到应用，但依然有 bug，直到 `P3D` 合约中才终于被修复。之后，抵押挖矿的算法在一系列流动性挖矿合约中被发扬光大，并支持收益的线性释放。

关于被动生息算法，许多项目都做出过独立发现，在 `Compound` 中它们被称之为 `cToken`，而在 `Yearn` 中它们被称之为 `yToken`。虽然这些生息代币的本质并无不同，但因为以上的历史原因导致它们的接口并不一致，特别是早期 `Yearn v1` 的合约中，命名缺乏一致性。最近出现的 `ERC-4626` 标准试图解决了这一问题，相比于我们本节提供的生息算法代码，`ERC-4626` 提供了完整的 4 个方向的存取接口，用户在使用时只需要定义具体的生息逻辑。


## 其他智能合约应用

DeFi 产品，因为其对安全性和去信任的需求，同时，相对的，对性能的不敏感，被称为以太坊的杀手级应用，是目前区块链上用户最多，资金体量最大，应用最广泛的分支。除了 `DeFi` 之外，智能合约也有一些其他重要的应用。ScalarCapital 的 CoFounder Linda Xie 撰写过一组初学者指南，介绍目前应用最广泛的几类产品。

- [DeFi 初学者指南](https://www.matataki.io/p/10718)
- [NFTs 初学者指南]()
- [DAOs 初学者指南]()
- [社交代币初学者指南](https://www.matataki.io/p/10876)

## 其它
- [DeFi 懒人包：去中心化金融指南](https://blocktrend.gitbook.io/defi/)
- [区块链社会学](https://matataki.io/p/4804)

