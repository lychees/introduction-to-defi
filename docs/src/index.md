---
home: true
heroImage: https://raw.githubusercontent.com/nebhrajani-a/sicp/master/sicp.jpg
tagline: 
actionText: Quick Start →
actionLink: /Ch-2/
---

# Introduction to DeFi

# 目录

[toc]

# Ch.1 去中心化金融概述

## DeFi 乐高

DeFi 是去中心化金融「Decentralized Finance」的缩写，旨在通过去中心化的方式以代替中间人重新创建的金融系统，最简单的例子可能是分账（Escrow）与场外担保交易（Over-the-counter Exchange），通过使用智能合约，可以通过十几行核心代码可以去除这些金融服务中原本由合同或者中间人完成的部分（参见本章习题）。而一旦相关的金融服务完成自动化，它们之间就可以像乐高积木一样以无许可的方式将这些模块相互组合起来而产生更加复杂的，甚至是传统金融系统无法实现的功能，例如闪电贷。

但当这个简称在形成的时候^[DeFi]，人们已经赋予了它超过字面意思的更多含义。关于 DeFi 究竟是什麽，曾经在 Devcon5 的周边活动 DeFi.WTF 上举行过一次大辩论，每个参与者的观点都不一致。因而我们暂且不去叩问这个术语的准确定义，而是去考察一些具体的 DeFi 产品，以试图将她的定义归纳出来。

[^Defi]: 狭义的 DeFi 通常指使用区块链技术，特别是以以太坊为代表的智能合约作为主要场所的金融协议，而广义的 DeFi 则甚至不要求区块链技术，只要金融服务方提供的基础设施足够开放，因而后者又被称之为开放式金融（Open Finance）。

我们将提纲挈领的考察这些合约生产环境中最重要的业务逻辑相关的代码，并略去繁文缛节的细节和安全检查，但这并不是代表这些细节在合约开发中是不重要的，恰恰相反，它们是区分老练的合约工程师和新手最重要的准绳，毕竟 Code is Law，智能合约是与资产打交到的代码，即便是最老道的开发人员，有时也会一个简单的错误而导致数万乃至数千万，且没有后悔药可吃。

在最后一章中，我们将再次回到[^Junya]本节标题中所抛出的这个问题 —— 什么是 DeFi。

[^Junya]: Junya Ishigami, Freeing Architecture

## DeFi 的特性

去中心化是 DeFi 产品的最核心特征，也是 DeFi 产品的基石。值得留意的是，去中心化与否并非二元对立，非 0 既 1 的结果，而是一个连续的光谱，光谱的两端分别是由主宰（中心化服务器）控制的虫族，和由卡拉（共识算法）连接的神族。

![](https://i.imgur.com/8Ao9HoH.png)
> 即将死于「单点故障」的异鬼军团

同样是一个细分领域的 DeFi 产品，它们的去中心化程度也 [很可能是不同的](https://orange.xyz/p/393)。《精通比特币》的作者曾经在直播时做过一次 QA 回答 [What Makes a Currency a Cryptocurrency?](https://www.youtube.com/watch?v=HX99C7NCWaM)，我们不妨也模仿他的思路来探讨 DeFi 中的 “De” 具体体现在哪里。

- 无托管
无托管是去中心化的一个核心体现，通常的银行和交易所都需要用户将其资产托管给银行，而[控制也意味着负债](https://vitalik.ca/general/2019/05/09/control_as_liability.html)，额外的托管也意味着用户需要承担交易所被骇或者跑路的风险，而这通常不是发生或不发生的问题，而是什么时候发生的问题。

- 中立性
以太坊的 Slogan 之一就是 We have no feature。中立意味着无偏见，或者无 KYC，KYC 是 Know Your Customer 的简称，字面意思是：了解你的客户。KYC 认证其实就是一种实名认证机制，主要用于预防反洗钱、身份盗窃、金融诈骗等犯罪行为，而 DeFi 产品通常是无偏见的，钱包另一端用户可能是一个平民也可能是一个罪犯，甚至是一只猴子，当然更多时候可能是一段代码。还在狱中服刑的丝绸之路的站长 Ross Ulbricht，[最近就写了一篇博文阐述了自己对 MakerDAO 协议的思考](https://medium.com/@RossUlbricht/remaking-the-maker-protocol-4b29f879f11)。迫于监管的压力，Uniswap 就曾在一次更新之后在前端页面阻止了来自一些国家的访问，但是很快官方也暗示这只是一个权宜之计，大家依然可以直接用钱包与合约进行交互或是使用第三方托管在 IPFS 的前端页面来进行访问。

- 抗审查
后疫情时代，全球化的进程暂告一段落，各国都开始走向封闭与对抗，各国都似乎开始走上了大局域网的道路，伴随着 App 消灭了数据之间的联系，划区运营应用商店制造了不同的花园围墙，严密审核禁止自行安装软件使得在分发渠道消灭 App 只需一纸政令。而比特币自诞生之初开始就是不被所有政府重视和承认的，在很多国家都被禁止，但这依然无法阻止她的生长壮大，类似美国政府迫使 TikTok 被收购这样的事情在区块链的世界里将更难被执行。

- 互通性

- 链上治理

[潘超：如何权衡 DeFi 的中心化与去中心化？](https://www.chainnews.com/articles/009361859090.htm)

## 如何使用 DeFi 产品

「纸上得来终觉浅，绝知此事要躬行」。我们强烈建议读者尽可能多的尝试使用和部署这些 DeFi 产品，你需要准备一个以太坊钱包，这里 PC 端推荐 MetaMask，移动端推荐使用 imToken，具体可以查阅网上的教程。


## 写书过程中的挑战

> Although I'm trying my best to write comprehensive aounts that need no further revision, I know that every page brings me hundreds of opportunities to make mistakes and to miss important ideas. My files are bursting with notes about beautiful algorithms that have been disovered, but computer science has grown to the point where I cannot hope to be an authority on all the material I wish to cover. Therefore I need extensive feedbak from readers before I can finalize the volumes.
—— [Donald E. Knuth, The Art of Computer Programming, fasc1](http://www.cs.utsa.edu/~wagner/knuth/)

DeFi 是一个正在迅速发展的领域，因而纸质资料的一大困难就是无法保持持续的更新，例如，从 2018 年，到 2020 年，Solidity 的版本号就跨越了至少 3 个版本。因而我们选用的是一些在链上已经经过验证的经典项目的经典代码，这些代码不会因为版本的更迭而丧失生命力。

## 本章注记

### 比特币与区块链
关于区块链的知识很多分散在互联网上，最系统性的纸质资料是 [德烈亚斯·安东诺普洛斯(Andreas Antonopoulos)](https://en.wikipedia.org/wiki/Andreas_Antonopoulos) 所撰写的系列书籍。
-[《精通比特币》](https://github.com/bitcoinbook/bitcoinbook)
-[《精通以太坊》](https://github.com/ethereumbook/ethereumbook)。

### Solidity
最简单和主流智能合约开发语言是以太坊的 Solidity。关于 Solidity 的相关知识最全面的介绍是 [以太坊官方文档](https://docs.soliditylang.org/)。Youtube 主播 Hung-Ying Tai，也做过两期全面的关于 Solidity 开发的介绍，包括 [2018](https://www.youtube.com/watch?v=z2FEikbDqoA&list=PLHmOMPRfmOxSJcrlwyandWYiuP9ZAMYoF) 和 [2020](https://www.youtube.com/watch?v=l6xmGVweJyk&list=PLHmOMPRfmOxQ3HSlId8KAKxnt8yuyTZVk) 两个版本。

### 其他智能合约应用

DeFi 产品，因为其对安全性和去信任的需求，同时，相对的，对性能的不敏感，被称为以太坊的杀手级应用，是目前区块链上用户最多，资金体量最大，应用最广泛的分支。除了 DeFi 之外，智能合约也有一些其他重要的应用。ScalarCapital 的 CoFounder Linda Xie 撰写过一组初学者指南，介绍目前应用最广泛的几类产品。

- [DeFi 初学者指南](https://www.matataki.io/p/10718)
- [NFTs 初学者指南]()
- [DAOs 初学者指南]()
- [社交代币初学者指南](https://www.matataki.io/p/10876)

### 其它

- [DeFi 懒人包：去中心化金融指南](https://blocktrend.gitbook.io/defi/)
- [区块链社会学](https://matataki.io/p/4804)

## 习题

### 1.1 分账合约 ESCROW N
[这个例子来自 Vitalik、Taipei Ethereum Meetup #11 Vitalik Buterin Keynote Special](https://www.youtube.com/watch?v=MlaLRgUYeLo)

让我们来看一个最简单的 DeFi 产品的例子。在现实生活中，一个项目的成功往往是有不同团队之间紧密分工的结果，
在过去不同分工的团队可能会以立定合同的方式，事先说明双方的利润分成，而当出现纠纷时，则往往需要花费非常大的代价进行维权，无形之中增加了信任的成本。

分账合约（ESCROW）的功能是，在这个合约接收到任意转账时，都会均等的分成两份，发给另外两个事先约定的账户。

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

请推广这个合约的功能，支持使用一个第三方 multisig 钱包，修改参与的账户与分配比例。


### 1.2 场外担保交易合约 OTC Exchange SR
这个例子来自这里：https://www.bilibili.com/video/BV1Ht4y197h8?p=28

# Ch.3 MakerDAO 去中心化稳定币

## MakerDAO 简介

MakerDAO 是一个在以太坊上的去中心化信用平台，MakerDAO 的智能合约通过用户所提供超额抵押物（Collateral）铸造一种价值与美元挂钩的稳定币 DAI。任何人都提供抵押品以铸造 DAI。

同时如同 MakerDAO 的名字所暗示的那样，MakerDAO 还是一个二元通证体系，其上还有另一个治理通证 MKR，MKR 的持有者通过对稳定费水平等风险参数的投票来行使治理权。同时 MKR 也是用以支付稳定费的凭证，还 DAI 时将会销毁用户作为稳定费支付的 MKR。MKR 的持有者也是黑天鹅事件发生时的最后一道防线。如果全系统的抵押品价值下降过快，MKR 就会被铸造，并在公开市场上出售，以筹集更多的抵押品。MakerDAO 还有一个功能就是用户可以在合约中储蓄多余的 DAI 以获得用户支付的稳定费作为利息。

本章中的代码来自多抵押 DAI 版本。

### 里程碑
- [2016-12 给出 2017 年产品路线图](https://web.archive.org/web/20170608025915/https://blog.makerdao.com/2016/12/02/2017-product-roadmap/)
- [2017-12 初版 DAI 上线](https://medium.com/@MakerDAO/dai-is-now-live-ad87e34fc826)
- [2018-09 多抵押 DAI 开放 Code Review](https://medium.com/@MakerDAO/dai-is-now-live-ad87e34fc826)
- [2019-11 多抵押 DAI 上线](https://twitter.com/androolloyd/status/1196458513243017217?s=20)

[https://github.com/makerdao/awesome-makerdao/tree/fb9704ef13ae0dcef5f6fc26f17fd155469258ca#milestones--achievements](https://github.com/makerdao/awesome-makerdao/tree/fb9704ef13ae0dcef5f6fc26f17fd155469258ca#milestones--achievements)

### 增长

![](https://i.imgur.com/rLI2P0K.png)

https://defipulse.com/maker

## 稳定币 —— DeFi 的圣杯

### 货币性的光谱

金银天然不是货币，但货币天然是金银。但什么是货币？比特币诞生之后，越来越多的人开始以批判性的眼光重新审视这个问题。今天我们更多的知道，货币，是一种「信任」，不同的货币的信任对象有所不同。同之前所说的去中心化程度一样，货币性也可以认为是一个光谱，一些物品可能比一些物品更加具有货币性（例如 Steam 点卡之于香蕉）。一般认为，一种物品被称为是货币，需要同时具有下面的三个性质：

- 价值储藏（Store of Value）
- 交易媒介（Medium of Exchange）
- 记账单位（Unit of Account）

但是如果缺少了其中的某些性质会怎么样？比特币长期以来不被认为是货币的缘故，正是因为他缺少了第三个性质。因为缺少稳定性，比特币很难在日常生活中作为记账单位来使用[^例外]。在很多交易场景中，人们无法使用剧烈波动的货币进行交易，例如预测市场，可能在揭晓结果的时候货币的价值已经与投入时发生了剧烈的变化，这极大的限制了加密货币的普及，著名的游戏平台 Steam 就曾经在 2017 年因为比特币价格的剧烈波动而撤销支付手段中对比特币的支持。如何构建区块链上原生的稳定币就成了加密货币发展过程中的一个重要环节，因而稳定币也被人称之为 DeFi 的圣杯。

[^例外]: 但是在一些互联网原生的环境下可能会有例外，例如一些勒索软件会要被骇者支付固定数额的比特币。

### 稳定币的历史与分类

- 法币托管模式，代表产品 USDT、GUSD、Paxos、ets。
- 资产抵押模式，代表产品 MakerDAO。
- 算法央行模式，代表产品 Basis、AMPL。

首先我们介绍稳定币中最早、影响力也最大的产品 [USDT](https://en.wikipedia.org/wiki/Tether_(cryptocurrency)), a.k.a. Tether。USDT 的构想产生于 Bitfinex 交易所对规避资本管制和政府监管的需求，其出现的原因和离岸美元是一致的，很多交易所没有办法获得美元账户及当地牌照，但是它需要通过美元进行计价和结算。Tether 没有办法直接和美国银行合作，因而它把存款放在台湾和欧洲的银行，这些银行虽然没有美联储的账户，因而没有美元准备金，但他们可以在美国的银行开个账户，因此就可以将用户的美元存到其在美国银行的账户里。有了这样的美元账户之后，Tether 就可以发行 USDT。在 2017 年牛市的前后，迫于世界范围内监管的压力，很多连美元账户都没有的交易所，选择直接将 USDT 作为他们的储备金，并作为主要支持的稳定币。

尽管存在着谁也说不清楚的潜在的超发罪名，但是事实上 USDT 获得了巨大的成功，帮助了无数的交易者完成了她们的交易，USDT 本身的市值甚至可以一定程度上衡量世界对加密货币的需求。

在 2018 年 10 月围绕着 Bitcoin Cash 展开的算力大战期间，USDT 的价格曾经一度逼近 0.9 美金。在 2019 年 4 月底围绕着 Tether 的一起诉讼案件中，Tether 的律师声称每 1 个 USDT 的背后 有 0.74 美金的储备金。但正是由于这些问题，使得人们一直都在寻找一种更好的稳定币方案。MakerDAO 就是在这样的背景下诞生的。

同 Tether 所不同的是，DAI 是一种去中心化的稳定币架构，每一个 DAI 的背后都有超额抵押的链上资产作为支撑。事实上早在 2010 年，比特币的先驱之一 Hal Finney 就提出过使用比特币作为储备金建立比特币数字银行的构想。

> “I believe this will be the ultimate fate of Bitcoin, to be the ‘high-powered money’ that serves as a reserve currency for banks that issue their own digital cash. Most Bitcoin transactions will occur between banks, to settle net transfers. Bitcoin transactions by private individuals will be as rare as… well, as Bitcoin-based purchases are today.”
> —— Bitcoin Talk 2010

但无疑 MakerDAO 这种链上的央行，更加符合人们的构想。由于基于区块链完全透明的特性，人们始终知道 DAI 背后有足额的资产保证。如果资产价格上升，那么 DAI 的担保将更充足。如果资产下跌到一定值（原 CDP 开启者没有追加保证金或偿还 DAI），合约会自动启动清算。由于以太坊无需准入的特点，任何用户都可以清算抵押不足的资产，并且获得 3% 的无风险收益。这也激励了很多市场参与者扮演 Maker 中的 Keeper 角色，他们不仅可以从系统中获益，同时也保护了 DAI 的偿付性。

- [潘超，一篇文章读懂稳定币：3 种技术模式与基础理论介绍](https://www.chainnews.com/articles/043853363135.htm)
- [Binance Research, The Evolution of Stablecoins](https://research.binance.com/en/analysis/stablecoins-evolution)


## DAI 的稳定机制

Blockchain is all about incentive. 稳定币的需求侧随着市场的变化而变化，因而我们用机制设计来决定供给侧，从而使得 DAI 的价格尽可能的接近 1 美金。

### MakerDAO 黑话（Jargon）

本节开始我们将考察部分 MakerDAO 的合约代码，MakerDAO 的合约代码充满了令人迷惑的缩写（Jargon）以可读性差而闻名[^SAI]，不时引起 [新人的抱怨](https://twitter.com/lassebirk/status/1199967318975094784)。

在 Maker 的紫皮书和 101 Slide 中 Maker 团队都做了详细的澄清，以说明为何团队会选择使用这些会令人摸不着头脑的缩写，而不是使用在金融和合约中的术语。

![](https://i.imgur.com/B4pIPUO.png)

[^SAI]: "The advantages of using this specific jargon are explained in the purple paper. It should be noted that this jargon creates a barrier to entry for developers and interested parties that want to understand the system." —— [SAI Coin Code Review_v1_3.pdf](https://makerdao.com/saiCodeReview/SAI%20Coin%20Code%20Review_v1_3.pdf)

除了以上这些原因，其实笔者还认为，这种缩写有一种难以言状的韵律感和幽默感，属于 [工程师三美德之「傲慢」](https://en.wikiquote.org/wiki/Talk:Larry_Wall)。[作为某以代码可读性差而知名的算法竞赛选手](https://www.zhihu.com/question/24379827/answer/30511070)，笔者对此反而倍感亲切。

### 铸币（Draw）

![](https://i.imgur.com/qhATBas.png)
> Vat: a large tank or tub used to hold liquid

和 Uniswap 一样，MakerDAO 也由多个合约组成，其中最重要的三个合约叫做核心模块（Core Module），而核心模块中，又以 Vat 合约最为重要（下面中最大的圆柱形的部分），倘若日后发现了更好的方案，MakerDAO 的合约发生升级，那么最不可能发生变化的就是 Vat 合约。

![](https://i.imgur.com/9P1uDAa.png)

如上一节所说，DAI 的铸造过程并不是由中央金融机构宏观调控完成的，而是通过在智能合约中托管的超额抵押物。在多抵押 DAI 合约中，负责托管抵押物的数据结构 [由原先的 CDPs（抵押债仓）变更为了 Vualts](https://blog.makerdao.com/say-goodbye-to-cdps-and-hello-to-maker-vaults/)，负责描述相关行为的合约就叫做 Vat。

![](https://i.imgur.com/Uv6M5Qt.png)

> 对角巷中的古灵阁银行，根据电影《哈利波特与魔法石》中描述，哈利·波特的金库是 687 号，那里存放着父母遗留给他的一笔数目相当可观的财产。

每当用户将抵押品发送给 [Vat 合约](https://docs.makerdao.com/smart-contract-modules/core-module/vat-detailed-documentation) 时，就会收到新铸造的稳定币 DAI（198 行）。你所铸造的 DAI 的数量取决于你在 Vat 中投入的抵押品价值，这个比例是固定的（178 行），但会随着市场的供需关系而变化，抵押品与新铸造的 DAI 的价值比率，称之为抵押率（ilk.rate）。这一过程通常也称之为借 DAI。

```solidity=164
    // --- CDP Manipulation ---
    function frob(bytes32 i, address u, address v, address w, int dink, int dart) external note {
        // system is live
        require(live == 1, "Vat/not-live");

        Urn memory urn = urns[i][u];
        Ilk memory ilk = ilks[i];
        // ilk has been initialised
        require(ilk.rate != 0, "Vat/ilk-not-init");

        urn.ink = add(urn.ink, dink);
        urn.art = add(urn.art, dart);
        ilk.Art = add(ilk.Art, dart);

        int dtab = mul(ilk.rate, dart);
        uint tab = mul(ilk.rate, urn.art);
        debt     = add(debt, dtab);

        // either debt has decreased, or debt ceilings are not exceeded
        require(either(dart <= 0, both(mul(ilk.Art, ilk.rate) <= ilk.line, debt <= Line)), "Vat/ceiling-exceeded");
        // urn is either less risky than before, or it is safe
        require(either(both(dart <= 0, dink >= 0), tab <= mul(urn.ink, ilk.spot)), "Vat/not-safe");

        // urn is either more safe, or the owner consents
        require(either(both(dart <= 0, dink >= 0), wish(u, msg.sender)), "Vat/not-allowed-u");
        // collateral src consents
        require(either(dink <= 0, wish(v, msg.sender)), "Vat/not-allowed-v");
        // debt dst consents
        require(either(dart >= 0, wish(w, msg.sender)), "Vat/not-allowed-w");

        // urn has no debt, or a non-dusty amount
        require(either(urn.art == 0, tab >= ilk.dust), "Vat/dust");

        gem[i][v] = sub(gem[i][v], dink);
        dai[w]    = add(dai[w],    dtab);

        urns[i][u] = urn;
        ilks[i]    = ilk;
    }
```

你可能已经注意到了这个 forb() 函数中，最后面两个参数都是有符号整形 `int dink, int dart`。就如同第一章中所介绍 Uniswap 合约中的 `swap()` 函数一样，此处的 Forb 函数，不仅可以处理借 DAI，也将可以处理还 DAI 的情况。

### 还 DAI（Wipe）

> 有借有还，再借不难。
> ——中国谚语
> 

若想取回抵押品，金库所有者必须偿还之前铸币时所生成的 DAI，并支付此期间产生的稳定费。同 Uniswap 中使用 routing 合约来处理用户交互一样，在 MakerDAO 中也是分离处理的，其中普通用户与核心模块的交互逻辑是在 [代理模块（Proxy Module）](https://docs.makerdao.com/smart-contract-modules/proxy-module) 进行的。

```solidity=517
    function wipe(
        address manager,
        address daiJoin,
        uint cdp,
        uint wad
    ) public {
        address vat = ManagerLike(manager).vat();
        address urn = ManagerLike(manager).urns(cdp);
        bytes32 ilk = ManagerLike(manager).ilks(cdp);

        address own = ManagerLike(manager).owns(cdp);
        if (own == address(this) || ManagerLike(manager).cdpCan(own, cdp, address(this)) == 1) {
            // Joins DAI amount into the vat
            daiJoin_join(daiJoin, urn, wad);
            // Paybacks debt to the CDP
            frob(manager, cdp, 0, _getWipeDart(vat, VatLike(vat).dai(urn), urn, ilk));
        } else {
             // Joins DAI amount into the vat
            daiJoin_join(daiJoin, address(this), wad);
            // Paybacks debt to the CDP
            VatLike(vat).frob(
                ilk,
                urn,
                address(this),
                address(this),
                0,
                _getWipeDart(vat, wad * RAY, urn, ilk)
            );
        }
    }
```

此处 `_getWipeDart` 为计算出所取回的抵押品的数量，我们发现此处返回的是一个负数，从而可以继续调用上一节 Vat 合约中的 Forb 方法。

```solidity=181
    function _getWipeDart(
        address vat,
        uint dai,
        address urn,
        bytes32 ilk
    ) internal view returns (int dart) {
        // Gets actual rate from the vat
        (, uint rate,,,) = VatLike(vat).ilks(ilk);
        // Gets actual art value of the urn
        (, uint art) = VatLike(vat).urns(ilk, urn);

        // Uses the whole dai balance in the vat to reduce the debt
        dart = toInt(dai / rate);
        // Checks the calculated dart is not higher than urn.art (total debt), otherwise uses its value
        dart = uint(dart) <= art ? - dart : - toInt(art);
    }
```

https://github.com/makerdao/dss-proxy-actions/blob/master/src/DssProxyActions.sol#L517

### 清算（Grab）

当市场发生剧烈波动时，用户铸币时所使用的抵押品可能会资不抵债，这个时候合约为了优先保护 DAI 价格的稳定，就会执行清算动作。在 Vat 合约中，负责取走待清算资产的函数叫做 grab()，很形象的描述了清算的过程。

```solidity=228
    // --- CDP Confiscation ---
    function grab(bytes32 i, address u, address v, address w, int dink, int dart) external note auth {
        Urn storage urn = urns[i][u];
        Ilk storage ilk = ilks[i];

        urn.ink = add(urn.ink, dink);
        urn.art = add(urn.art, dart);
        ilk.Art = add(ilk.Art, dart);

        int dtab = mul(ilk.rate, dart);

        gem[i][v] = sub(gem[i][v], dink);
        sin[w]    = sub(sin[w],    dtab);
        vice      = sub(vice,      dtab);
    }
```

这个函数只执行了最底层的清算逻辑，而负责监控资产状态，标记危险资产的 Agent，则是另一个核心合约——Cat。


![](https://i.imgur.com/r5xvkmQ.png)
> Cat: “bites” Vaults that are too risky.


Cat 合约最核心的方法自然是 bite()。

https://github.com/makerdao/dss/blob/master/src/cat.sol#L119

```solidity=119
    // --- CDP Liquidation ---
    function bite(bytes32 ilk, address urn) external returns (uint id) {
        (, uint rate, uint spot) = vat.ilks(ilk);
        (uint ink, uint art) = vat.urns(ilk, urn);

        require(live == 1, "Cat/not-live");
        require(spot > 0 && mul(ink, spot) < mul(art, rate), "Cat/not-unsafe");

        uint lot = min(ink, ilks[ilk].lump);
        art      = min(art, mul(lot, art) / ink);

        require(lot <= 2**255 && art <= 2**255, "Cat/overflow");
        vat.grab(ilk, urn, address(this), address(vow), -int(lot), -int(art));

        vow.fess(mul(art, rate));
        id = Kicker(ilks[ilk].flip).kick({ urn: urn
                                         , gal: address(vow)
                                         , tab: rmul(mul(art, rate), ilks[ilk].chop)
                                         , lot: lot
                                         , bid: 0
                                         });

        emit Bite(ilk, urn, lot, art, mul(art, rate), ilks[ilk].flip, id);
    }
```

其中第 131 行的 grab() 函数负责管控用户的待清算资产，再通过 134 行，交由相应的清算合约发起拍卖请求。

```solidity=56
    // --- Data ---
    struct Ilk {
        address flip;  // Liquidator
        uint256 chop;  // Liquidation Penalty   [ray]
        uint256 lump;  // Liquidation Quantity  [wad]
    }
```

注意此处的 `Ilk` 是 Cat 合约中的类型，与 Vat 合约中的定义不同，这里的 flip 是具体负责执行清算逻辑的合约地址，chop 是相应的罚金数量，而 lump 是等待被清算的资产数量。

```solidity=22
interface Kicker {
    function kick(address urn, address gal, uint tab, uint lot, uint bid)
        external returns (uint);
}
```

第 22 行定义了拍卖合约中 kick() 函数的接口，而这个接口的具体逻辑则在外部的合约中定义，目前拍卖相关的逻辑，在 [主合约仓库的 flip 合约](https://github.com/makerdao/dss/blob/master/src/flip.sol#L107) 中。

### 拍卖（Flip）

> 牟先生顿了顿，慢慢地说：「当然，当然有了，我研究了这么多年，人类怎样才能进入更加公正合理的新社会？我觉得，最公平的办法，其实也就是最简单的办法。比如说分粥吧，谁分都行，但分完以后让别人先挑，剩下的最后一碗，是他自己的。」
> —— [电视剧《一手托两家》](https://dy.163.com/article/E8A0QN1P0541704S.html)

本节介绍 [MakerDAO 中的拍卖模块](https://docs.makerdao.com/smart-contract-modules/collateral-module/flipper-detailed-documentation)，拍卖合约是一种常见的合约功能，一般也被用做作为 Solidity 合约的入门教程，关于更多种类的拍卖方式，可以参见附录。

类似博弈论中经典的分蛋糕问题，MakerDAO 中的拍卖合约也是一个两部方法，在第一个步骤中（[tent](https://github.com/makerdao/dss/blob/master/src/flip.sol#L131)），首先使用一个升序的竞价拍卖，以筹得足够多的 DAI 用以填补系统的债务。第二个步骤中（[dent](https://github.com/makerdao/dss/blob/master/src/flip.sol#L150)），再使用一个降序的竞价拍卖，以尽可能多的保护被清算人的资产。


https://makerdao.com/zh-CN/whitepaper/#maker-%E5%8D%8F%E8%AE%AE%E6%8B%8D%E5%8D%96
https://docs.makerdao.com/auctions/the-auctions-of-the-maker-protocol





### 喂价（Spot）

## 治理

### MKR —— DAI 的治理孪生 

Beyond: Two Souls

### 权益

### 投票


## 本章注记

![](https://i.imgur.com/QwMn1xx.png)

https://en.wikipedia.org/wiki/Money#cite_note-greco-5

经济学家和人类学家们关于货币本质和起源的争议从来没有停止过。

在 1875 年出版的《货币与交换机制》一书中，[杰文斯](https://en.wikipedia.org/wiki/William_Stanley_Jevons) 总结了货币所具有的四个功能，既：交易媒介、记账单位、价值储藏和延期支付标准并写成了下面的对句（Couplet）并在之后的宏观经济学教科书中广为流传。

> Money's a matter of functions four:
> A Medium, a Measure, a Standard, a Store.
—— 威廉·斯坦利·杰文斯

但大多数现代教科书只列举了前三种职能，而把延期支付标准归入其他职能之中。关于货币的这些功能组合，历史上也有很多争议，有人认为它们需要更多的分离，另一种观点则认为，货币作为交换媒介的作用与其作为价值储藏的作用是冲突的：作为价值储藏的作用需要持有价值而不花费，而作为交换媒介的作用则需要货币流通；还有人认为，价值的储藏只是对交换的延缓，但并没有削弱货币是一种可以跨越空间和时间运输的交易媒介。

主流的经济学著作都认为，货币的出现源自复杂的物物交换。也有一些学者对这种观点提出挑战。票证主义者（Chartalism）认为，货币起源于国家引导经济活动的尝试，而不是自发地解决以物易物的问题，也不是将债务象征化的手段。货币之所以具有交换价值，是因为国家用货币对经济活动征税。人类学家大卫·格雷伯在[《债：第一个5000年》](https://book.douban.com/subject/20272111//)一书中对这一学说进行了佐证，并认为债的的出现远在货币之前。

比特币的出现则再次挑战了人们对于货币本质的理解，一些比特币的批评者认为比特币只是一种庞氏骗局，本身并不承载任何价值。另一些学长则主张从历史演化的角度给比特币正名。Saifedean Ammous 在 [The Bitcoin Standard: The Decentralized Alternative to Central Banking](https://book.douban.com/subject/27591965/) 一书中回顾了货币发展的历史，总结了比特币相比她的前辈们的革命之处和她的缺陷。

- [Remaking the Maker Protocol](https://medium.com/@RossUlbricht/remaking-the-maker-protocol-4b29f879f11)
- [想要从零开始理解MakerDAO？这篇文章应该是最佳选择](https://orange.xyz/p/345)
- [MakerDAO 的“黑色星期四”](https://www.chainnews.com/articles/174831366892.htm)

## 习题

1. [N] [在 Vat 合约中有如下的结构定义](https://github.com/makerdao/dss/blob/master/src/vat.sol#L37)：

```solidity=37
    // --- Data ---
    struct Ilk {
        uint256 Art;   // Total Normalised Debt     [wad]
        uint256 rate;  // Accumulated Rates         [ray]
        uint256 spot;  // Price with Safety Margin  [ray]
        uint256 line;  // Debt Ceiling              [rad]
        uint256 dust;  // Urn Debt Floor            [rad]
    }
    struct Urn {
        uint256 ink;   // Locked Collateral  [wad]
        uint256 art;   // Normalised Debt    [wad]
    }
```

其中唯 `Ilk.Art` 首字母大写，试说明原因。


# Ch.4 Compound 去中心化的借贷协议
# Ch.5 Yearn.finance 去中心化聚合器

# 附录
## 可组合性

我们已经涵盖了去中心化的稳定币、贷款、交易所和身份。但在以太坊这样的智能合约平台上构建去中心化的金融积木，最重要的一点也许是可组合性。就像一个软件库，不同金融应用的智能合约可以像乐高积木一样相互插入。

例如，如果你想在你的平台上增加交易代币化资产的能力，你可以通过整合一个去中心化的交易所协议，使资产可以交易。而这些智能合约乐高片甚至可以创造出在传统世界中没有被探索过的全新概念。

一个例子是名为[2100](https://2100.co/)的项目，它将DeFi和社交媒体结合在一起，允许参与者使用他们的Twitter账户为自己 "铸造 "新的代币，本质上是从他们的社会资本中产生数字美元。受欢迎的账户可以推出只有特定的代币持有者群体才能访问的优质内容，这使得他们可以将自己的粉丝货币化。然后，人们可以做一些有趣的事情，比如赌某些Twitter账户变得更受欢迎。

另一个例子是名为[PoolTogether](https://www.pooltogether.com/)的项目，它将DeFi和彩票结合起来，创造一个 "无损失 "的彩票。用户在链上购买彩票，所有购买彩票的资金都能获得Compound的利息。在抽奖结束时，每个人都会拿回自己的资金 -- 但有一个人获得了所有从汇集的资金中赚取的利息。这基本上是一种利用彩票机制来激励储蓄和创造财富的方式！这就是DeFi。

随着DeFi的成熟，我们应该期待这些库开始在加密货币社区之外得到使用。最终，你将能够添加一行代码，在视频游戏中添加一个完整的去中心化市场，或另一行代码，让你的电子商务商店中的商人在他们的余额上赚取利息。

## 风险管理

虽然DeFi很吸引人，但承认它所带来的风险也很重要。让我们列举一些风险类别。

- 智能合约风险。许多这些系统是新的，需要更多的时间来进行实战检验。当协议之间相互作用时，智能合约的风险就会加重。如果一个协议有一个关键的智能合约错误，那么它可能会导致整个系统的脆弱性。在早期，避免在任何这些系统中投入过多的资金是明智的。
- 抵押和波动性风险。还有与用于支持贷款的特定抵押品类型有关的风险。过度抵押可以减少波动性风险，但如果抵押资产的价格下降太快，追加保证金并不能保证覆盖所借的全部金额。然而，如果有合理的抵押率和经过审查的抵押品类型，这应该是一个较小的风险。另一个潜在的问题是，许多 DeFi 平台的利率波动可能会使某人参与其中不切实际。可能会有利率互换或其他方法来锁定利率的溢价，但这也增加了自身的复杂性。
- 监管风险。DeFi 平台有不同程度的去中心化，我们还没有看到法庭案例来检验所有的说法。我们必须看看这里会发生什么。