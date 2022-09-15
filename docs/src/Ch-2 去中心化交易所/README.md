# Ch-2 去中心化交易所

去中心化交易所（Decentralized Exchange, a.k.a., Dex）是 DeFi 生态中占据绝对中心地位的产品，
它提供了诸如预言机，链上流动性等基础设施，不仅为人类提供了无许可的交易功能，也为其它 DeFi 产品提供了可供交互的接口，并成为了成千上万的自动机器人提供了套利交易的场所，为黑客提供了最终套现离场的手段w。

在上一章节的末尾[^1]所出现的担保交易合约，就可以看作是最简单的去中心化交易所的例子。
它由许多的独立的、未经排序的订单簿组成，并且是点对点的。
和那个例子不同，本章中我们所看到的 Dex 合约几乎都是基于自动化做市商（Automated market maker, a.k.a., AMM）算法的，而其中扮演核心角色的就是定价曲线与可分润代币技术。

我们将从一个简单但有趣的例子 P3D 合约开始，介绍这两个技术的一般思想和使用方法，并在之后的篇幅中，考察目前以太坊生态中最重要的两个 Dex 协议 —— Uniswap 和 Curve。

值得注意的是，坊间依然有许多其它形态的、甚至基于订单薄的 Dex 存在。并且随着以太坊 PoS 的完成以及各类 Layer2 方案的成熟，这些旧的 Dex 会不会焕发新生，又会不会有新的 Dex 从中脱颖而出？这些问题我们将在本章的最后进行讨论。

## 点对协议

第一章中的担保合约固然保有古朴的美好。它像一个安全模式，能覆盖一切困难的情况，可是却不那么的有效率。它更像是史前时代、货币诞生以前、以物易物、双重巧合（Coincidence of wants）下的产物。而对于一个交易系统来说最致命的问题既是流动性的分散。

在一些图论题目中，我们可以通过引入辅助结点的方式，简化边的规模或者拓扑结构以更好的解题[^2]。用图论术语描述的话，边数规模为 O(n) 的星状图，效率比 O(n2) 的完全图更高[^3]。

<img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Star_network_7.svg"  width="200" />

<img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Complete_graph_K7.svg"  width="200" />

现实世界中也是如此，其中最经典的例子就是 [货币]() 与 [银行]()，在 Dex 的世界中，我们也可如此。例如在担保合约的例子中，我们可以认为引入一种中心货币[^4]，强制要求所有其它货币都只能与中心货币发生交易，而得到一个星状图。

我们称用户通过合约间接与其它用户进行交互的合约点对协议的（Peer-to-Protocol）。

现实世界中的货币或银行，都需要经过漫长的自然演化，或者在某个阶段依靠国家暴力，才能积累足够的信用。而在区块链的世界，
信任所需的成本被降低了，任何人，都可以部署一小段代码构建一个点对协议的去中心化服务，而不必关心开发者是谁，因此区块链又被称之为 [信任机器（The Trust Machine）](https://computationallegalstudies.com/2015/10/30/the-trust-machine-the-technology-behind-bitcoin-could-transform-how-the-economy-works-via-the-economist/)。

[^1]: 什么？你跳过了 [习题？](/Ch-1%20快速入门/Problems.html)
[^2]: 参见 [UOJ #77. A+B Problem](https://www.shuizilong.com/house/archives/uoj-77-ab-problem/) 以及 [Block Cut Tree 算法](https://github.com/ShahjalalShohag/code-library/blob/master/Graph%20Theory/Block%20Cut%20Tree.cpp)。
[^3]: 同时更集中的管道也更有利于监管机构对交易进行审查。
[^4]: 事实上，[Uniswap V1](https://hackmd.io/@HaydenAdams/HJ9jLsfTz) 就是这么设计的。