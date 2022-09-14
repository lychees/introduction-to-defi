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
