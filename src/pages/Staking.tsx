import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { VALIDATORS } from '../data/validators'
import { useCeloBalance } from '../hooks/useCeloBalance'
import { useWallet } from '../hooks/useWallet'
import { AppContext } from '../context/AppContext'

const StakingSheet = ({
  validator,
  balance,
  onClose,
}: {
  validator: (typeof VALIDATORS)[0]
  balance: string
  onClose: () => void
}) => {
  const [amount, setAmount] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const context = useContext(AppContext)
  if (!context) throw new Error('AppContext not found')
  const { showToast, addXPAction } = context

  const balanceNum = parseFloat(balance)
  const amountNum = parseFloat(amount) || 0
  const isValid = amountNum > 0 && amountNum <= balanceNum

  const handleStake = async () => {
    if (!isValid) return
    setIsPending(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      addXPAction({
        type: 'stake',
        label: `Staked ${amount} CELO with ${validator.name}`,
        xp: 150,
      })
      showToast('+150 XP earned for staking')
      setTimeout(() => {
        onClose()
        setAmount('')
        setIsPending(false)
        setIsSuccess(false)
      }, 1000)
    } catch (e) {
      showToast('Transaction failed. Try again.')
      setIsPending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-bg-secondary rounded-t-2xl max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-bg-tertiary rounded-full" />
        </div>
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-6">Stake with {validator.name}</h2>

          <div className="bg-bg-tertiary rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-400 mb-2">APY</p>
            <p className="text-2xl font-bold text-accent-green">{validator.apy}</p>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold mb-2 block">
              Amount to stake (CELO)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-bg-tertiary rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-green"
              disabled={isPending || isSuccess}
            />
            <p className="text-xs text-gray-400 mt-2">
              Available: {balance} CELO
            </p>
          </div>

          <button
            onClick={handleStake}
            disabled={!isValid || isPending || isSuccess}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              isSuccess
                ? 'bg-green-500 text-bg-primary'
                : isValid && !isPending
                  ? 'bg-accent-green text-bg-primary hover:opacity-90'
                  : 'bg-bg-tertiary text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSuccess
              ? '✓ Staked Successfully'
              : isPending
                ? 'Confirming...'
                : 'Confirm Stake'}
          </button>
        </div>
      </div>
    </div>
  )
}

export const Staking = () => {
  const [selectedValidator, setSelectedValidator] = useState<
    (typeof VALIDATORS)[0] | null
  >(null)
  const { formatted: balance } = useCeloBalance()
  const { isConnected } = useWallet()
  const navigate = useNavigate()

  const handleDelegateClick = () => {
    navigate('/delegation')
  }

  if (!isConnected) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <p className="text-gray-400">Wallet not connected</p>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-6">Staking</h1>

      {/* Header Card */}
      <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl p-6 mb-6 border border-accent-green border-opacity-20">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-400">Balance</p>
            <p className="text-lg font-bold text-accent-green">{balance}</p>
            <p className="text-xs text-gray-500">CELO</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Staked</p>
            <p className="text-lg font-bold">4.25</p>
            <p className="text-xs text-gray-500">CELO</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Rewards</p>
            <p className="text-lg font-bold text-accent-gold">0.084</p>
            <p className="text-xs text-gray-500">CELO</p>
          </div>
        </div>
        <button className="w-full mt-4 bg-accent-gold text-bg-primary py-2 rounded-lg font-semibold">
          Claim Rewards
        </button>
      </div>

      {/* Validators */}
      <h2 className="text-sm font-semibold mb-3 text-gray-300">Validators</h2>
      <div className="space-y-3 mb-6">
        {VALIDATORS.map((validator) => (
          <div
            key={validator.address}
            className="bg-bg-secondary rounded-lg p-4 cursor-pointer hover:bg-bg-tertiary transition-colors"
            onClick={() => setSelectedValidator(validator)}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{validator.name}</h3>
                <p className="text-xs text-gray-400">{validator.address}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-accent-green">{validator.apy}</p>
                <p className="text-xs text-gray-400">APY</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-3">
              <span>Votes: {validator.votes}</span>
              <span>Fee: {validator.commission}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedValidator(validator)
              }}
              className="w-full bg-accent-green text-bg-primary py-2 rounded-lg font-semibold text-sm"
            >
              Stake
            </button>
          </div>
        ))}
      </div>

      {/* Delegation link */}
      <button
        onClick={handleDelegateClick}
        className="w-full text-accent-green text-sm font-semibold py-2 text-center hover:underline"
      >
        Delegate your votes →
      </button>

      {selectedValidator && (
        <StakingSheet
          validator={selectedValidator}
          balance={balance}
          onClose={() => setSelectedValidator(null)}
        />
      )}
    </PageWrapper>
  )
}
