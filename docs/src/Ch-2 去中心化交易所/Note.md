# 本章注记

- [https://zhuanlan.zhihu.com/p/40445813](https://zhuanlan.zhihu.com/p/40445813)

PoWH 或许在 DeFi 的发展中特别重要，它不是第一次发明这些技术的，但是却是第一次将它们成功实现并融合在一款游戏化产品之中的。
P3D Token 至今依然在市面上流通，并且后续有一些项目会分配一定的利润给到 P3D 社区，使得 P3D 相比于 Ponzi Coin 甚至具有了一定的 Security Token 的属性。PoWH 的续作 Fomo3D 也取得了非常有趣的成功。但随后的 TeamJust 却并没有将这些延续下去，从而在漫长的 DeFi 历史中逐渐销声匿迹了。

更早时候的 Bancor，但是它的公式更为复杂，且不具备像 Uniswap 当时众筹流动性，因而没有形成之后 Uniswap 那样的普适成功。

令人震惊的事实是，可分润代币应用的历史晚于自动化做市商的历史，2017 年 6 月，来自 Albert-Ludwigs 大学的软件工程系主任 Jochen Hoenicke 教授，发布了 一篇非正式的博文，介绍自己设计的一种新的 Ponzi Token，简单来说这种 Ponzi Token 使用了 80% 储备金的 Bancor 算法发行，并且使用了一种 O(1) 时间实时处理分润的算法，而合约的利润来自用户在 Bancor 中交易产生的手续费。

考古现场 -> Ropsten 0x2CB6ef99FbC78069364144E969a9A6e89E55035

不过由于 Jochen Hoenicke 教授并不是合约开发的专家，因而原版的代码里有很多 bug，有人直接拿上面的合约部署到了主网，导致了至少 2000 ETH 被骇。后来这种机制经过简化推广，被应用在了 PoWH 项目之中，PoWH 项目使用了 50% 储备金率的 Bancor，因而 Bounding Curve 是一条斜线，更容易在合约中计算，只需要用二次方程求根共识即可，后来还出现了手续费更高的 PoWH Shadow Fork，这两个项目后来也相继被黑客攻击，一个月后升级成了我们今天所熟知的 P3D。

后来这种算法被使用在了 Synthetix 的 Unipool 中分发项目方代币鼓励用户提供 LP，这也是现在几乎所有项目所使用的流动性挖矿算法的原型。
 