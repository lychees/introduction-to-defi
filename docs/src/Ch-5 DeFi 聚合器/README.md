# Ch.5 DeFi 聚合器

- [https://www.defipulse.com/address-tag/yearn.finance/tvl/all/year](https://www.defipulse.com/address-tag/yearn.finance/tvl/all/year)
- [https://yearn.watch/](https://yearn.watch/)

V3
- [Medium, Yearn Vaults v3](https://medium.com/iearn/yearn-vaults-v3-36ce7c468ca0)
- [Github, Yearn Finance Web App v3](https://github.com/yearn/yearn-finance-v3)
- [https://github.com/jmonteer/yearn-vaults-v3/](https://github.com/jmonteer/yearn-vaults-v3/)

v2
- [https://medium.com/iearn/yearn-finance-v2-af2c6a6a3613](https://medium.com/iearn/yearn-finance-v2-af2c6a6a3613)
- [Github, Yearn Vault smart contracts](https://github.com/yearn/yearn-vaults)
- [https://etherscan.io/address/0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE#writeContract](https://etherscan.io/address/0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE#writeContract)

![image](https://user-images.githubusercontent.com/2507027/190986784-c6c52afc-6eb4-490e-9c8d-024cc3da9007.png)

随着 2020 年 DeFi Summer 的来临，越来越多的项目提供了高额 APY 吸引用户参与流动性挖矿，参与这些流动性挖矿项目又被称为 DeFi 农耕（Yield Farming），随着可供选择的项目越来越多，研究每个项目需要花费大量的时间与精力，普通的用户越来越应接不暇。另一方面，DeFi 农夫为了追求最大的利润，往往需要频繁的切换手续费，而以太坊的手续费和转账的金额无关，这意味着对于小额储户来说，频繁切换产生的链上手续费可能会覆盖原本的农耕收益。

因此，DeFi 聚合器就应运而生了，其中最具有代表性、最具传奇色彩的产品就是 Yearn。

## 本章概述


## 金库 Vaults

金库合约用来存储底层资产，同时它本身也生成对应的生息代币 —— yToken。
例如当递增资产是 USDC 时，该合约的符号即为 yUSDC。

因为本身也是代币，所以该合约集成自 ERC-20 合约，并需要实现对应的接口。

```python
from vyper.interfaces import ERC20

implements: ERC20


interface DetailedERC20:
    def name() -> String[42]: view
    def symbol() -> String[20]: view
    def decimals() -> uint256: view


interface Strategy:
    def want() -> address: view
    def vault() -> address: view
    def isActive() -> bool: view
    def delegatedAssets() -> uint256: view
    def estimatedTotalAssets() -> uint256: view
    def withdraw(_amount: uint256) -> uint256: nonpayable
    def migrate(_newStrategy: address): nonpayable

name: public(String[64])
symbol: public(String[32])
decimals: public(uint256)

balanceOf: public(HashMap[address, uint256])
allowance: public(HashMap[address, HashMap[address, uint256]])
totalSupply: public(uint256)

token: public(ERC20)
governance: public(address)
management: public(address)
guardian: public(address)
pendingGovernance: address

struct StrategyParams:
    performanceFee: uint256  # Strategist's fee (basis points)
    activation: uint256  # Activation block.timestamp
    debtRatio: uint256  # Maximum borrow amount (in BPS of total assets)
    minDebtPerHarvest: uint256  # Lower limit on the increase of debt since last harvest
    maxDebtPerHarvest: uint256  # Upper limit on the increase of debt since last harvest
    lastReport: uint256  # block.timestamp of the last time a report occured
    totalDebt: uint256  # Total outstanding debt that Strategy has
    totalGain: uint256  # Total returns that Strategy has realized for Vault
    totalLoss: uint256  # Total losses that Strategy has realized for Vault

event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    value: uint256


event Approval:
    owner: indexed(address)
    spender: indexed(address)
    value: uint256
```

除此之外，作为生息代币还需要实现 `deposit()` 和 `withdraw()` 方法，用来支持储蓄和赎回。

### 恒等式

根据 1-5 节的介绍，生息代币的核心是底层代币和生息代币之间进行兑换的恒等式。

```python
@view
@internal
def _shareValue(shares: uint256) -> uint256:
    # Returns price = 1:1 if vault is empty
    if self.totalSupply == 0:
        return shares

    # Determines the current value of `shares`.
    # NOTE: if sqrt(Vault.totalAssets()) >>> 1e39, this could potentially revert

    return (
        shares
        * self._freeFunds()
        / self.totalSupply
    )


@view
@internal
def _sharesForAmount(amount: uint256) -> uint256:
    # Determines how many shares `amount` of token would receive.
    # See dev note on `deposit`.
    _freeFunds: uint256 = self._freeFunds()
    if _freeFunds > 0:
        # NOTE: if sqrt(token.totalSupply()) > 1e37, this could potentially revert
        return  (
            amount
            * self.totalSupply
            / _freeFunds 
        )
    else:
        return 0
```

有了这两个函数，我们就可以实现对应的 `deposit()` 和 `withdraw()` 函数了。

### Deposit

`deposit()` 的逻辑相对简单，合约首先进行必要的检查，随后计算出对应需要印发的生息代币数，增加给储户即可。

```python
@external
@nonreentrant("withdraw")
def deposit(_amount: uint256 = MAX_UINT256, recipient: address = msg.sender) -> uint256:
    """
    @notice
        Deposits `_amount` `token`, issuing shares to `recipient`. If the
        Vault is in Emergency Shutdown, deposits will not be accepted and this
        call will fail.
    @dev
        Measuring quantity of shares to issues is based on the total
        outstanding debt that this contract has ("expected value") instead
        of the total balance sheet it has ("estimated value") has important
        security considerations, and is done intentionally. If this value were
        measured against external systems, it could be purposely manipulated by
        an attacker to withdraw more assets than they otherwise should be able
        to claim by redeeming their shares.
        On deposit, this means that shares are issued against the total amount
        that the deposited capital can be given in service of the debt that
        Strategies assume. If that number were to be lower than the "expected
        value" at some future point, depositing shares via this method could
        entitle the depositor to *less* than the deposited value once the
        "realized value" is updated from further reports by the Strategies
        to the Vaults.
        Care should be taken by integrators to account for this discrepancy,
        by using the view-only methods of this contract (both off-chain and
        on-chain) to determine if depositing into the Vault is a "good idea".
    @param _amount The quantity of tokens to deposit, defaults to all.
    @param recipient
        The address to issue the shares in this Vault to. Defaults to the
        caller's address.
    @return The issued Vault shares.
    """
    assert not self.emergencyShutdown  # Deposits are locked out
    assert recipient not in [self, ZERO_ADDRESS]

    amount: uint256 = _amount

    # If _amount not specified, transfer the full token balance,
    # up to deposit limit
    if amount == MAX_UINT256:
        amount = min(
            self.depositLimit - self._totalAssets(),
            self.token.balanceOf(msg.sender),
        )
    else:
        # Ensure deposit limit is respected
        assert self._totalAssets() + amount <= self.depositLimit

    # Ensure we are depositing something
    assert amount > 0

    # Issue new shares (needs to be done before taking deposit to be accurate)
    # Shares are issued to recipient (may be different from msg.sender)
    # See @dev note, above.
    shares: uint256 = self._issueSharesForAmount(recipient, amount)

    # Tokens are transferred from msg.sender (may be different from _recipient)
    self.erc20_safe_transferFrom(self.token.address, msg.sender, self, amount)
    
    log Deposit(recipient, shares, amount)

    return shares  # Just in case someone wants them
```

### Withdraw

`withdraw()` 和上述 `deposit()` 函数对称，但是当合约当前可用余额不足时，需要主动将底层资产从投资策略中赎回。

```python
@external
@nonreentrant("withdraw")
def withdraw(
    maxShares: uint256 = MAX_UINT256,
    recipient: address = msg.sender,
    maxLoss: uint256 = 1,  # 0.01% [BPS]
) -> uint256:
    """
    @notice
        Withdraws the calling account's tokens from this Vault, redeeming
        amount `_shares` for an appropriate amount of tokens.
        See note on `setWithdrawalQueue` for further details of withdrawal
        ordering and behavior.
    @dev
        Measuring the value of shares is based on the total outstanding debt
        that this contract has ("expected value") instead of the total balance
        sheet it has ("estimated value") has important security considerations,
        and is done intentionally. If this value were measured against external
        systems, it could be purposely manipulated by an attacker to withdraw
        more assets than they otherwise should be able to claim by redeeming
        their shares.
        On withdrawal, this means that shares are redeemed against the total
        amount that the deposited capital had "realized" since the point it
        was deposited, up until the point it was withdrawn. If that number
        were to be higher than the "expected value" at some future point,
        withdrawing shares via this method could entitle the depositor to
        *more* than the expected value once the "realized value" is updated
        from further reports by the Strategies to the Vaults.
        Under exceptional scenarios, this could cause earlier withdrawals to
        earn "more" of the underlying assets than Users might otherwise be
        entitled to, if the Vault's estimated value were otherwise measured
        through external means, accounting for whatever exceptional scenarios
        exist for the Vault (that aren't covered by the Vault's own design.)
        In the situation where a large withdrawal happens, it can empty the 
        vault balance and the strategies in the withdrawal queue. 
        Strategies not in the withdrawal queue will have to be harvested to 
        rebalance the funds and make the funds available again to withdraw.
    @param maxShares
        How many shares to try and redeem for tokens, defaults to all.
    @param recipient
        The address to issue the shares in this Vault to. Defaults to the
        caller's address.
    @param maxLoss
        The maximum acceptable loss to sustain on withdrawal. Defaults to 0.01%.
        If a loss is specified, up to that amount of shares may be burnt to cover losses on withdrawal.
    @return The quantity of tokens redeemed for `_shares`.
    """
    shares: uint256 = maxShares  # May reduce this number below

    # Max Loss is <=100%, revert otherwise
    assert maxLoss <= MAX_BPS

    # If _shares not specified, transfer full share balance
    if shares == MAX_UINT256:
        shares = self.balanceOf[msg.sender]

    # Limit to only the shares they own
    assert shares <= self.balanceOf[msg.sender]

    # Ensure we are withdrawing something
    assert shares > 0

    # See @dev note, above.
    value: uint256 = self._shareValue(shares)

    if value > self.token.balanceOf(self):
        totalLoss: uint256 = 0
        # We need to go get some from our strategies in the withdrawal queue
        # NOTE: This performs forced withdrawals from each Strategy. During
        #       forced withdrawal, a Strategy may realize a loss. That loss
        #       is reported back to the Vault, and the will affect the amount
        #       of tokens that the withdrawer receives for their shares. They
        #       can optionally specify the maximum acceptable loss (in BPS)
        #       to prevent excessive losses on their withdrawals (which may
        #       happen in certain edge cases where Strategies realize a loss)
        for strategy in self.withdrawalQueue:
            if strategy == ZERO_ADDRESS:
                break  # We've exhausted the queue

            vault_balance: uint256 = self.token.balanceOf(self)
            if value <= vault_balance:
                break  # We're done withdrawing

            amountNeeded: uint256 = value - vault_balance

            # NOTE: Don't withdraw more than the debt so that Strategy can still
            #       continue to work based on the profits it has
            # NOTE: This means that user will lose out on any profits that each
            #       Strategy in the queue would return on next harvest, benefiting others
            amountNeeded = min(amountNeeded, self.strategies[strategy].totalDebt)
            if amountNeeded == 0:
                continue  # Nothing to withdraw from this Strategy, try the next one

            # Force withdraw amount from each Strategy in the order set by governance
            loss: uint256 = Strategy(strategy).withdraw(amountNeeded)
            withdrawn: uint256 = self.token.balanceOf(self) - vault_balance

            # NOTE: Withdrawer incurs any losses from liquidation
            if loss > 0:
                value -= loss
                totalLoss += loss
                self._reportLoss(strategy, loss)

            # Reduce the Strategy's debt by the amount withdrawn ("realized returns")
            # NOTE: This doesn't add to returns as it's not earned by "normal means"
            self.strategies[strategy].totalDebt -= withdrawn
            self.totalDebt -= withdrawn

        # NOTE: We have withdrawn everything possible out of the withdrawal queue
        #       but we still don't have enough to fully pay them back, so adjust
        #       to the total amount we've freed up through forced withdrawals
        vault_balance: uint256 = self.token.balanceOf(self)
        if value > vault_balance:
            value = vault_balance
            # NOTE: Burn # of shares that corresponds to what Vault has on-hand,
            #       including the losses that were incurred above during withdrawals
            shares = self._sharesForAmount(value + totalLoss)

        # NOTE: This loss protection is put in place to revert if losses from
        #       withdrawing are more than what is considered acceptable.
        assert totalLoss <= maxLoss * (value + totalLoss) / MAX_BPS

    # Burn shares (full value of what is being withdrawn)
    self.totalSupply -= shares
    self.balanceOf[msg.sender] -= shares
    log Transfer(msg.sender, ZERO_ADDRESS, shares)

    # Withdraw remaining balance to _recipient (may be different to msg.sender) (minus fee)
    self.erc20_safe_transfer(self.token.address, recipient, value)
    log Withdraw(recipient, shares, value)
    
    return value
```

## 控制器 Controller
## 策略 Strategies
