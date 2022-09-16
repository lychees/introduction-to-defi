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

Play with the various functions and parameters: http://bit.ly/bondingcurve

It is also worth considering the use of 3D curves. The z-axis adds another dimension that can affect the token prices. This could be platform productivity level, technology adoption curve, users in the system, active users as a fraction of total users, etc.

#### 11.3.3.3.1 Linear Functions

Price and supply are related linearly, but it can be an issue when the project increases in demand and size. In linear functions, the first few token holders are rewarded too much in comparison to the rest of the token holders. It also does not give much to design with, only changing mand c in the equation.

#### 11.3.3.2. Exponential Functions

Exponential functions are good as they increase prices slowly initially, which encourages the holding of tokens. However, the function accelerates aggressively in the last 20%. This makes it volatile as it opens the market to speculation and the growth rate can be unmanageable.

Logarithm functions work in the opposite way, where the prices at the start increases rapidly, which creates speculation and volatility.

#### 11.3.3.3. Other Factors to consider

- Incentivise early adopters

- Price stabilisation at the end

- Cost appreciation based on some factor of supply increasing (or productivity of platform or token)

- Prevention of abuse or arbitrage

- Growth of underlying product (s-curve, as a function z-axis)

- Returns appropriately attractive across reasonable range or to focus more on early adopters

## 11.4 Practical Questions to get Started

- What function is the bonding curve used for? Decentralised exchange (instant liquidity), fundraising, curation market or something else?

- How many users can the project attract and sustain? (At the introduction stage, at the maturity state)

- Are both early and late adopters adequately incentivised to participate? Do you want them to be equally incentivised?

- Can I attract the amount of capital needed to take the project to an adequate level of adoption?

## 11.5 Two Variations to Bonding Curves

### 11.5.1. Augmented Bonding Curve (ABC)

This is based on complex system research. It is a design for a new incentive mechanism. The objective is to create a new funding model, governed by participants in a continuous organisation.

The problem with the general bonding curve is that it is subjected to manipulation in pursuit of speculative returns. Tokens can also be burned anytime or after an arbitrary deadline.

As such, ABC uses conversation principles3and mechanisms to create a robust and controlled environment to manage speculation and to align incentives to generate returns. Tokens minted in period 1 will be locked up in period 1. This is to affect the stability of reserve flow.

ABC combines the general bonding curve with a funding pool, lock-up mechanism and inter-system feedback loops5.

### 11.5.2. Dynamic Bonding Curve (DBC)

The objective is to incentivise early adopters, punish freeloaders and encourage active participation in the ecosystem.

The problem with the general bonding curve is that it can be manipulated with a large token holder transacting and increasing unfair volatility.

As such, DBC adds a feature, where prices of tokens are determined by the proportion of token owned5. This encourages users to continuously participate, which is an objective in the ecosystem.

## Notes

It can be more than 2 variables, but we stick to a simple 2-variable model as it is possible to graph it out in a 2D graph. The more variables to add, the more dimensions are created. A 3-variable bonding curve requires a 3D graph to visualise.

While most people think of a bonding curve as a 2D function, bonding curves can be a 3D function. They can also be used to facilitate trade without money, e.g., using a bonding curve to determine the relationship between upload volume and download volume. In an open-source content market, it can facilitate the exchange of information volume without money.

The conservation principle is a physics principle, where energy conservation equation is subjected to a constant invariant function.

For more information, check out https://medium.com/giveth/deep-dive-augmented-bonding-curves-3f1f7c1fa751 for the system design, flow and background mathematics.

For more information, check out https://tokeneconomy.co/dynamic-token-bonding-curves-41d36e43befa for a case study and mathematical function.