# Ch-1 快速入门

DeFi 是去中心化金融「Decentralized Finance」的缩写，旨在通过去中心化的方式以代替中间人重新创建的金融系统，最简单的例子可能是 [分账（Escrow）](/Ch-1%20%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/Problems.html#_1-1-%E5%88%86%E8%B4%A6%E5%90%88%E7%BA%A6-escrow) 与 [场外担保交易（Over-the-counter Exchange）](/Ch-1%20快速入门/Problems.html#_1-2-场外担保交易合约-secured-otc-exchange-contract)，通过使用智能合约，可以通过十几行核心代码可以去除这些金融服务中原本由合同或者中间人完成的部分（参见本章习题）。而一旦相关的金融服务完成自动化，它们之间就可以像乐高积木一样以无许可的方式将这些模块相互组合起来而产生更加复杂的，甚至实现传统金融服务无法实现的功能，例如闪电贷（Flashloan）、MEV 等。

但当这个简称在形成的时候^[DeFi]，人们已经赋予了它超过字面意思的更多含义。关于 DeFi 究竟是什麽，曾经在 Devcon-5 的周边活动 DeFi.WTF 上举行过一次大辩论，每个参与者的观点都不一致。因而我们暂且不去叩问这个术语的准确定义，而是去考察一些具体的 DeFi 产品，以试图将她的定义归纳出来。

[^Defi]: 狭义的 DeFi 通常指使用区块链技术，特别是以以太坊为代表的智能合约作为主要场所的金融协议，而广义的 DeFi 则甚至不要求区块链技术，只要金融服务方提供的基础设施足够开放，因而后者又被称之为开放式金融（Open Finance）。

我们将提纲挈领的考察这些合约生产环境中最重要的业务逻辑相关的代码，并略去繁文缛节的细节和安全检查，但这并不是代表这些细节在合约开发中是不重要的，恰恰相反，它们是区分老练的合约工程师和新手最重要的准绳，毕竟 Code is Law，智能合约是与资产打交到的代码，即便是最老道的开发人员，有时也会一个简单的错误而导致数万乃至数千万，且没有后悔药可吃。

在最后一章中，我们将再次回到[^Junya]本节标题中所抛出的这个问题 —— 什么是 DeFi。

[^Junya]: Junya Ishigami, Freeing Architecture

## 阅读建议

本书**不是**一本密码学著作，不会介绍 [非对称加密](https://en.wikipedia.org/wiki/Public-key_cryptography)、[椭圆曲线数字签名](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)、[零知识证明](https://en.wikipedia.org/wiki/Zero-knowledge_proof) 等内容，读者可参考：
- [Introduction to Modern Cryptography]()

等密码学著作进行学习相关知识。

本书**不是**一本深入介绍以太坊——它的架构、共识算法、账户抽象以及以太坊虚拟机（EVM）——的书籍，关于这些内容读者可参考：
- [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook)
- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)

等文献了解其中的秘辛。

此外，本书**也不是**一本关于 Solidity 语言的书籍，它不会像这类书籍一样浸入到枯燥且乏味的语法与工程细节中去，关于这些细节可参考：
- [Solidity Programming Essentials]()
- [Ethereum Smart Contract Development in Solidity]()
- [Solidity 实战全书](https://www.books.com.tw/products/0010928889)

等著作，或者在 [以太坊的官网文档](https://docs.soliditylang.org/) 查阅最新资料。

本书是一本**聚焦**于研究 DeFi 类合约设计与代码结构的书籍，DeFi 是以太坊上应用最为广泛，影响力最为巨大，生命力最为繁盛的领域，熟悉 DeFi 产品的开发技术和设计方法也会对我们探索其它种类的应用起到帮助。

## 非投资建议 

![image](https://user-images.githubusercontent.com/2507027/190898973-c4dc61d0-c845-4287-95af-d9c8263713bb.png)

需要注意的是，本书不是一本投资书籍，她提到的所有项目，有些已经消亡在历史中了，有的则依然存活，只是作为学术价值，不应作为投资建议。

## DeFi 的特性

去中心化是 DeFi 产品的最核心特征，也是 DeFi 产品的基石。值得留意的是，去中心化与否并非二元对立，非 0 既 1 的结果，而是一个连续的光谱，光谱的两端分别是由主宰（中心化服务器）控制的虫族，和由卡拉（共识算法）连接的神族。

同样是一个细分领域的 DeFi 产品，它们的去中心化程度也 [很可能是不同的](https://orange.xyz/p/393)。《精通比特币》的作者曾经在直播时做过一次 QA 回答 [What Makes a Currency a Cryptocurrency?](https://www.youtube.com/watch?v=HX99C7NCWaM)，我们不妨也模仿他的思路来探讨 DeFi 中的 “De” 具体体现在哪里。

- 无托管
无托管是去中心化的一个核心体现，通常的银行和交易所都需要用户将其资产托管给银行，而[控制也意味着负债](https://vitalik.ca/general/2019/05/09/control_as_liability.html)，额外的托管也意味着用户需要承担交易所被骇或者跑路的风险，而这通常不是发生或不发生的问题，而是什么时候发生的问题。

- 中立性
以太坊的 Slogan 之一就是 We have no feature。中立意味着无偏见，或者无 KYC，KYC 是 Know Your Customer 的简称，字面意思是：了解你的客户。KYC 认证其实就是一种实名认证机制，主要用于预防反洗钱、身份盗窃、金融诈骗等犯罪行为，而 DeFi 产品通常是无偏见的，钱包另一端用户可能是一个平民也可能是一个罪犯，甚至是一只猴子，当然更多时候可能是一段代码。还在狱中服刑的丝绸之路的站长 Ross Ulbricht，[最近就写了一篇博文阐述了自己对 MakerDAO 协议的思考](https://medium.com/@RossUlbricht/remaking-the-maker-protocol-4b29f879f11)。迫于监管的压力，Uniswap 就曾在一次更新之后在前端页面阻止了来自一些国家的访问，但是很快官方也暗示这只是一个权宜之计，大家依然可以直接用钱包与合约进行交互或是使用第三方托管在 IPFS 的前端页面来进行访问。

- 抗审查
后疫情时代，全球化的进程暂告一段落，各国都开始走向封闭与对抗，各国都似乎开始走上了大局域网的道路，伴随着 App 消灭了数据之间的联系，划区运营应用商店制造了不同的花园围墙，严密审核禁止自行安装软件使得在分发渠道消灭 App 只需一纸政令。而比特币自诞生之初开始就是不被所有政府重视和承认的，在很多国家都被禁止，但这依然无法阻止她的生长壮大，类似美国政府迫使 TikTok 被收购这样的事情在区块链的世界里将更难被执行。

- 互通性

- 链上治理

- [潘超：如何权衡 DeFi 的中心化与去中心化？](https://www.chainnews.com/articles/009361859090.htm)

## 如何使用 DeFi 产品

「纸上得来终觉浅，绝知此事要躬行」。我们强烈建议读者尽可能多的尝试使用和部署这些 DeFi 产品，你需要准备一个以太坊钱包，这里 PC 端推荐 MetaMask，移动端推荐使用 imToken，具体可以查阅网上的教程。


## 写书过程中的挑战

> Although I'm trying my best to write comprehensive aounts that need no further revision, I know that every page brings me hundreds of opportunities to make mistakes and to miss important ideas. My files are bursting with notes about beautiful algorithms that have been discovered, but computer science has grown to the point where I cannot hope to be an authority on all the material I wish to cover. Therefore I need extensive feedback from readers before I can finalize the volumes.
—— [Donald E. Knuth, The Art of Computer Programming, fasc1](http://www.cs.utsa.edu/~wagner/knuth/)

DeFi 是一个正在迅速发展的领域，因而纸质资料的一大困难就是无法保持持续的更新，例如，从 2018 年，到 2020 年，Solidity 的版本号就跨越了至少 3 个版本。因而我们选用的是一些在链上已经经过验证的经典项目的经典代码，这些代码不会因为版本的更迭而丧失生命力。

幸运的是，我们有比 Knuth 时代更方便的工具。本书的主页是 [https://github.com/lychees/introduction-to-defi](https://github.com/lychees/introduction-to-defi)，你可以看到本书的创作和修订过程，并即时修正各种错误。

## 本章的内容安排

我们将先从一个最简单的计数器合约开始，以带领读者快速入门。之后我们开始回顾以太坊中的各种代币标准，它们是 Solidity 开发过程中最为重要的模块，紧接着我们重点介绍 OpenZeppelin，它就像是 Solidity 中的标准库，就像是 cpp 开发者一定会掌握 [stdlib](https://en.cppreference.com/w/cpp) 一样，熟悉和掌握 OpenZeppelin 将会让你在智能合约工程师的修行中取得先机。

本章的剩下部分中，我们将考察几个实践中具体使用 ERC-20 标准合约的例子。如前文所说，互通性是 DeFi 的最重要特性之一，1-3 与 1-4 节中我们将看到如何使用接口（Interface）与其它合约进行通信，1-5 节中我们将使用继承（Inheritance）在 ERC-20 标准的基础上进一步扩展代币的功能。

1-5 节介绍的可分润代币是非常重要的知识点，她将会在后续的章节中反复出现。


