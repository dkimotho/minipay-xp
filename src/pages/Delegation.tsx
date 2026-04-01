import { useContext, useState } from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { DELEGATES } from '../data/delegates'
import { AppContext } from '../context/AppContext'
import { useWallet } from '../hooks/useWallet'

const DelegationSheet = ({
  delegate,
  onClose,
  onDelegate,
}: {
  delegate: (typeof DELEGATES)[0]
  onClose: () => void
  onDelegate: (address: string) => void
}) => {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const context = useContext(AppContext)
  if (!context) throw new Error('AppContext not found')
  const { showToast, addXPAction } = context

  const handleConfirm = async () => {
    setIsPending(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      addXPAction({
        type: 'delegate',
        label: `Delegated votes to ${delegate.name}`,
        xp: 100,
      })
      showToast('+100 XP earned for delegating')
      setTimeout(() => {
        onDelegate(delegate.address)
        onClose()
      }, 1000)
    } catch (e) {
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
          <h2 className="text-xl font-bold mb-4">Delegate Votes</h2>

          <div className="bg-bg-tertiary rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-400 mb-2">To</p>
            <p className="font-semibold">{delegate.name}</p>
            <p className="text-xs text-gray-400 mt-2">{delegate.address}</p>
          </div>

          <p className="text-sm text-gray-300 mb-6">
            {delegate.bio}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-400">Proposals Voted</p>
              <p className="text-lg font-bold">{delegate.proposals}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Participation</p>
              <p className="text-lg font-bold text-accent-green">{delegate.participation}</p>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isPending || isSuccess}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              isSuccess
                ? 'bg-green-500 text-bg-primary'
                : isPending
                  ? 'bg-bg-tertiary text-gray-400 cursor-not-allowed'
                  : 'bg-accent-green text-bg-primary hover:opacity-90'
            }`}
          >
            {isSuccess
              ? '✓ Delegation Confirmed'
              : isPending
                ? 'Confirming...'
                : 'Confirm Delegation'}
          </button>
        </div>
      </div>
    </div>
  )
}

export const Delegation = () => {
  const [selectedDelegate, setSelectedDelegate] = useState<(typeof DELEGATES)[0] | null>(null)
  const [currentDelegate, setCurrentDelegate] = useState<string | null>(null)
  const [customAddress, setCustomAddress] = useState('')
  const { isConnected } = useWallet()

  const isValidAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr)
  const canDelegateCustom = isValidAddress(customAddress)

  const handleDelegate = (address: string) => {
    setCurrentDelegate(address)
    setCustomAddress('')
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
      <h1 className="text-2xl font-bold mb-6">Delegation</h1>

      {/* Current Delegation */}
      <div className="bg-bg-secondary rounded-lg p-4 mb-6">
        {currentDelegate ? (
          <div>
            <p className="text-xs text-gray-400 mb-2">Currently delegating to</p>
            <p className="font-semibold">{currentDelegate}</p>
            <button className="w-full mt-4 bg-red-500 bg-opacity-20 text-red-400 py-2 rounded font-semibold text-sm hover:bg-opacity-30">
              Remove Delegation
            </button>
          </div>
        ) : (
          <p className="text-gray-400">You are not currently delegating your votes</p>
        )}
      </div>

      {/* Suggested Delegates */}
      <h2 className="text-sm font-semibold mb-3 text-gray-300">
        Suggested Delegates
      </h2>
      <div className="space-y-3 mb-6">
        {DELEGATES.map((delegate) => (
          <div
            key={delegate.address}
            className="bg-bg-secondary rounded-lg p-4 cursor-pointer hover:bg-bg-tertiary transition-colors"
            onClick={() => setSelectedDelegate(delegate)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold">{delegate.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{delegate.bio}</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-3">
              <span>Proposals: {delegate.proposals}</span>
              <span>Participation: {delegate.participation}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedDelegate(delegate)
              }}
              className="w-full bg-accent-green text-bg-primary py-2 rounded-lg font-semibold text-sm"
            >
              Delegate
            </button>
          </div>
        ))}
      </div>

      {/* Custom Delegation */}
      <h2 className="text-sm font-semibold mb-3 text-gray-300">
        Or enter any Celo address
      </h2>
      <div className="mb-6">
        <input
          type="text"
          value={customAddress}
          onChange={(e) => setCustomAddress(e.target.value)}
          placeholder="0x..."
          className="w-full bg-bg-secondary rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-green mb-3"
        />
        <button
          disabled={!canDelegateCustom}
          onClick={() => {
            if (canDelegateCustom) {
              handleDelegate(customAddress)
              setCustomAddress('')
            }
          }}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            canDelegateCustom
              ? 'bg-accent-green text-bg-primary hover:opacity-90'
              : 'bg-bg-tertiary text-gray-500 cursor-not-allowed'
          }`}
        >
          Delegate to Address
        </button>
      </div>

      {selectedDelegate && (
        <DelegationSheet
          delegate={selectedDelegate}
          onClose={() => setSelectedDelegate(null)}
          onDelegate={handleDelegate}
        />
      )}
    </PageWrapper>
  )
}
