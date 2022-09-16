# Chapter 11: Bonding Curves

## 11.1 What is a Bonding Curve?

A bonding curve is a curve (equation) that connects two variables. For example, token prices change when the token supply changes. This is determined by math, coded in a smart contract. This is not determined by other factors like trading in the secondary market.

### 11.1.1 Use Case 1: Decentralised Exchange via Autonomous Market Maker

Specific math and examples can be found in Chapter 13.

A bonding curve is a smart contract execution that creates its own market for tokens without order books. It is also known as an automated market maker. The two key differences compared to traditional exchanges are:

- Matching orders with math instead of a central limit order book (CLOB)

- Crowdsourcing market makers instead of specialised market making firms

To start with, a pool is created, known as a liquidity pool. Anyone can add assets to this liquidity pool. To incentivise people to add assets to the pool, they earn some transaction fees when trade occurs and earn the native tokens of the protocol.

Bonding curves are a method to link 21variables together. The method is most commonly used in decentralised exchanges (DEX) and fundraising.


### 11.1.3 Use Case 3: Curation Market

The curation market uses tokens as a signal to reduce information asymmetry (e.g. Ocean protocol). This use case is still relatively new, and this book seeks to be an experiment on this use-case (See Chapter 25).

A curation market is more evident when we cross non-fungible tokens (NFT) with DeFi. Users can stake tokens, governed by a bonding curve, in exchange for an NFT. It mixes both DEX mechanisms (use-case 1) with fundraising mechanisms (use-case 2), depending on the use-case. The permutations are endless, and this could be a critical piece in the future technological stack.

## 11.2 Four Properties of a Bonding Curve

1. Always liquid and always continuous

Tokens can be minted or exchanged at any time (continuously) according to the prices set by the function and governed by a smart contract. Tokens can be burned or exchanged at any time (continuously) to the smart contract, which entitles the user a proportion of the reserve pool (collateral) or assets. The smart contract becomes the market maker.

2. Prices are hard coded according to some mathematical curve.

In general, token prices increase as more tokens are in circulation. The mathematical curve2can be defined in variables that affect the objectives of the ecosystem.

When fundraising, this incentivises adopters to purchase tokens early as it is cheaper in the early stages as the system grows.

3. Smart contracts govern the system.

In use-case 1: Smart contracts help to execute the trade with the liquidity pool by being the aggregate market maker. The price of exchange depends on the depth of the pool, not on external exchange prices.

In use-case 2: Collaterals are kept in smart contracts as reserve pools. A smart contract executes a mathematical formula, sometimes by solving some function.

4. It allows for claims on future cash-flow, governed by smart contracts.

For it to not be a Ponzi scheme, the tokens should allow users to claim on future cash-flow by the ecosystem. This could be earning via transaction fees or earning via future profits from the ecosystem.

### 11.3.1. Intrinsic Value

The intrinsic value is different, depending on the use-cases.

#### 11.3.1.1. Decentralised Exchange

Value comes from the ease of liquidity, availability of liquidity and network of other tokens to interact and trade with.

#### 11.3.1.2 Fundraising

Value comes from the entitlement to future cash flow. Other than value increasing from more participants joining the ecosystem, the value can also increase from revenue generated from the ecosystem. Depending on the system, it is possible for tokens to be seen as a form of financial security by regulators.

#### 11.3.1.3 Curation Market

Value comes from the entitlement to future cash flow or accurately signal market sentiments.

For curated products in the intellectual property domain, a non-fungible token (NFT) can be issued and traded via token bonding curves to trade the intellectual property (IP). The IP is attached to NFT and the NFT allows for the transfer of ownership. The NFT is transferred under a bonding curve, and the buyer sends collaterals to the smart contract and receives the NFT. The prices of NFT will increase as more people demand it (tokenised signal for curation).

### 11.3.2. Mitigating Risks

#### 11.3.2.1 Decentralised Exchange

Risks: transaction is validated before someone buys a large amount by paying more gas fees.

Solutions: have a maximum limit on transaction fees for each transaction, or a percentage-base fee for transactions.
160

#### 11.3.2.2. Fundraising

Risks: Ponzi scheme, pyramid scams, pump and dump

Solutions: This can be done by ensuring that the fund is not immediately in profit in the short-term. The curve can reduce short-term speculation and encourage people to participate long-term. This changes the behaviour of users to keep tokens for certain periods to ensure profit. Also, ensure that the curve is supported by a proportion of the revenue from the ecosystem.


- Time-lock for selling tokens

- Premium for selling tokens

- Disallow sell function (except on secondary market)

- Proportion of the revenue supports the curve

#### 11.3.2.3 Curation Market

Risks: manipulation of data by someone with many tokens, defining payout for the curated product

Solutions: the contract can include a continuous staking and curation mechanism to increase the cost of manipulating data.

### 11.3.3 Curve Functions

There is no one “perfect” curve function for the bonding curve. It depends on the objectives of the ecosystem and the use-case. There are some functions available, linear function (y=mx + c ), power function (y = xa), exponential function (y = ax), logarithm function (y = alog (x) + b) and variation function (e.g. y = m(1 + a)logx+ b).
