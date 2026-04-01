import { useContext, useState } from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { PROPOSALS } from '../data/proposals'
import { AppContext } from '../context/AppContext'
import { useWallet } from '../hooks/useWallet'

const VoteSheet = ({
  proposal,
  voteType,
  onClose,
  onVote,
}: {
  proposal: (typeof PROPOSALS)[0]
  voteType: string
  onClose: () => void
  onVote: (proposalId: string, vote: string) => void
}) => {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleConfirm = async () => {
    setIsPending(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      setTimeout(() => {
        onVote(proposal.id, voteType)
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
      <div className="absolute bottom-0 left-0 right-0 bg-bg-secondary rounded-t-2xl max-w-md mx-auto">
        <div className="sticky top-0 flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-bg-tertiary rounded-full" />
        </div>
        <div className="px-4 py-6">
          <h2 className="text-lg font-bold mb-4">Confirm Your Vote</h2>

          <div className="bg-bg-tertiary rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300 mb-2">You are voting</p>
            <p className="text-2xl font-bold text-accent-green">{voteType}</p>
            <p className="text-xs text-gray-400 mt-2">on {proposal.title}</p>
          </div>

          <p className="text-sm text-gray-300 mb-6">
            This uses your staked CELO voting power.
          </p>

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
            {isSuccess ? '✓ Vote Confirmed' : isPending ? 'Confirming...' : 'Confirm Vote'}
          </button>
        </div>
      </div>
    </div>
  )
}

const ProposalCard = ({
  proposal,
  onVote,
}: {
  proposal: (typeof PROPOSALS)[0]
  onVote: (id: string, vote: string) => void
}) => {
  const [selectedVote, setSelectedVote] = useState<string | null>(null)
  const context = useContext(AppContext)
  if (!context) throw new Error('AppContext not found')
  const { showToast, addXPAction } = context

  const handleVoteClick = (voteType: string) => {
    setSelectedVote(voteType)
  }

  const handleConfirmVote = (proposalId: string, vote: string) => {
    onVote(proposalId, vote)
    addXPAction({
      type: 'vote',
      label: `Voted ${vote} on ${proposalId}`,
      xp: 75,
    })
    showToast('+75 XP earned for voting')
    setSelectedVote(null)
  }

  if (proposal.status === 'active' || proposal.status === 'upcoming') {
    const total = (proposal.yesVotes || 0) + (proposal.noVotes || 0) + (proposal.abstainVotes || 0)
    const yesPercent = total ? ((proposal.yesVotes || 0) / total) * 100 : 0
    const noPercent = total ? ((proposal.noVotes || 0) / total) * 100 : 0
    const abstainPercent = total ? ((proposal.abstainVotes || 0) / total) * 100 : 0

    return (
      <>
        <div className="bg-bg-secondary rounded-lg p-4 mb-3">
          <div className="mb-3">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1">
                <p className="text-xs font-semibold text-accent-gold">{proposal.id}</p>
                <h3 className="font-semibold text-sm mt-1">{proposal.title}</h3>
              </div>
              <span className="text-xs bg-bg-tertiary px-2 py-1 rounded">
                {proposal.stage}
              </span>
            </div>
          </div>

          {/* Vote bar */}
          <div className="flex h-2 bg-bg-tertiary rounded-full mb-3 overflow-hidden">
            {yesPercent > 0 && (
              <div
                className="bg-green-500"
                style={{ width: `${yesPercent}%` }}
              />
            )}
            {noPercent > 0 && (
              <div
                className="bg-red-500"
                style={{ width: `${noPercent}%` }}
              />
            )}
            {abstainPercent > 0 && (
              <div
                className="bg-gray-500"
                style={{ width: `${abstainPercent}%` }}
              />
            )}
          </div>

          <div className="flex justify-between text-xs text-gray-400 mb-3">
            <span>Yes: {yesPercent.toFixed(0)}%</span>
            <span>No: {noPercent.toFixed(0)}%</span>
            <span>Abstain: {abstainPercent.toFixed(0)}%</span>
          </div>

          <div className="text-xs text-gray-400 mb-3">
            Ends {proposal.endDate}
          </div>

          {proposal.userVoted ? (
            <div className="bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 rounded-lg p-2 text-center">
              <p className="text-xs font-semibold text-green-400">
                ✓ You voted {proposal.userVote}
              </p>
            </div>
          ) : proposal.status === 'active' ? (
            <div className="flex gap-2">
              <button
                onClick={() => handleVoteClick('Yes')}
                className="flex-1 bg-green-500 bg-opacity-20 text-green-400 py-2 rounded font-semibold text-sm hover:bg-opacity-30"
              >
                Vote Yes
              </button>
              <button
                onClick={() => handleVoteClick('No')}
                className="flex-1 bg-red-500 bg-opacity-20 text-red-400 py-2 rounded font-semibold text-sm hover:bg-opacity-30"
              >
                Vote No
              </button>
              <button
                onClick={() => handleVoteClick('Abstain')}
                className="flex-1 bg-gray-500 bg-opacity-20 text-gray-400 py-2 rounded font-semibold text-sm hover:bg-opacity-30"
              >
                Abstain
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center">
              Voting opens {proposal.endDate}
            </p>
          )}
        </div>
        {selectedVote && (
          <VoteSheet
            proposal={proposal}
            voteType={selectedVote}
            onClose={() => setSelectedVote(null)}
            onVote={handleConfirmVote}
          />
        )}
      </>
    )
  }

  return (
    <div className="bg-bg-secondary rounded-lg p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs font-semibold text-accent-gold">{proposal.id}</p>
          <h3 className="font-semibold text-sm mt-1">{proposal.title}</h3>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded font-semibold ${
            proposal.result === 'Passed'
              ? 'bg-green-500 bg-opacity-20 text-green-400'
              : 'bg-red-500 bg-opacity-20 text-red-400'
          }`}
        >
          {proposal.result}
        </span>
      </div>
      {proposal.userVoted && (
        <p className="text-xs text-accent-green">
          ✓ You voted {proposal.userVote}
        </p>
      )}
    </div>
  )
}

export const Governance = () => {
  const [activeTab, setActiveTab] = useState('active')
  const [proposals, setProposals] = useState(PROPOSALS)
  const { isConnected } = useWallet()

  const handleVote = (proposalId: string, vote: string) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === proposalId
          ? { ...p, userVoted: true, userVote: vote }
          : p
      )
    )
  }

  const activeProposals = proposals.filter((p) => p.status === 'active')
  const upcomingProposals = proposals.filter((p) => p.status === 'upcoming')
  const historyProposals = proposals
    .filter((p) => p.status === 'history')
    .sort((a, b) => (a.userVoted ? -1 : 1))

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
      <h1 className="text-2xl font-bold mb-6">Governance</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-bg-tertiary">
        {['active', 'upcoming', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? 'text-accent-green border-b-2 border-accent-green'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'active' && (
        <div>
          {activeProposals.length > 0 ? (
            activeProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onVote={handleVote}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">No active proposals</p>
          )}
        </div>
      )}

      {activeTab === 'upcoming' && (
        <div>
          {upcomingProposals.length > 0 ? (
            upcomingProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onVote={handleVote}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">No upcoming proposals</p>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div>
          {historyProposals.length > 0 ? (
            historyProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onVote={handleVote}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">No proposal history</p>
          )}
        </div>
      )}
    </PageWrapper>
  )
}
