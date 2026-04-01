import { useContext } from 'react'
import { Settings } from 'lucide-react'
import { user } from '../data/user'
import { activities } from '../data/activity'
import { PageWrapper } from '../components/layout/PageWrapper'
import { XPBar } from '../components/ui/XPBar'
import { StatCard } from '../components/ui/StatCard'
import { WeeklyXPChart } from '../components/charts/WeeklyXPChart'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../hooks/useWallet'
import { useCeloBalance } from '../hooks/useCeloBalance'

export const Dashboard = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('AppContext not found')
  const { showToast, userSeasonalXP, userLifetimeXP } = context
  const navigate = useNavigate()
  const { displayAddress } = useWallet()
  const { formatted: celoBalance } = useCeloBalance()

  const handleBoostBannerClick = () => {
    navigate('/discover')
  }

  return (
    <PageWrapper>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs text-gray-400">
            {displayAddress || user.displayAddress}
          </div>
          <div className="text-xs text-gray-500 mt-1">Season 1 · 18 days left</div>
        </div>
        <button
          onClick={() => showToast('Settings coming in v2')}
          className="p-2 hover:bg-bg-secondary rounded-lg"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* XP Hero Card */}
      <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl p-6 mb-6 border border-accent-green border-opacity-20">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Level {user.level}</h1>
          <p className="text-sm text-gray-400">{user.levelName}</p>
        </div>
        <div className="space-y-2 mb-6">
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-accent-green">
              {userSeasonalXP.toLocaleString()}
            </span>{' '}
            XP this season
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-semibold">
              {userLifetimeXP.toLocaleString()}
            </span>{' '}
            XP total
          </p>
          {celoBalance !== '0.0000' && (
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-accent-gold">
                {celoBalance}
              </span>{' '}
              CELO available
            </p>
          )}
        </div>
        <XPBar
          current={userSeasonalXP}
          nextLevel={user.level + 1}
          currentLevelXP={user.currentLevelXP}
          nextLevelXP={user.nextLevelXP}
        />
      </div>

      {/* Activity Breakdown */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Last 30 Days</h3>
        <div className="flex gap-2">
          <StatCard label="Transactions" value={user.stats.transactions} />
          <StatCard label="Apps Used" value={user.stats.appsUsed} />
          <StatCard label="Governance" value={user.stats.governanceActions} />
        </div>
      </div>

      {/* Weekly XP Chart */}
      <div className="mb-6">
        <WeeklyXPChart />
      </div>

      {/* Boost Banner */}
      <div
        onClick={handleBoostBannerClick}
        className="bg-gradient-to-r from-accent-gold to-yellow-600 rounded-lg p-4 mb-6 cursor-pointer hover:opacity-90 transition-opacity"
      >
        <p className="text-sm font-semibold text-bg-primary">
          Earn 2× XP with Kolekti this week →
        </p>
      </div>

      {/* Recent Activity Feed */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Recent Activity</h3>
        <div className="space-y-2">
          {activities.map((activity) => {
            const getIcon = () => {
              const iconProps = 'w-4 h-4 text-accent-green'
              if (activity.type === 'transfer')
                return <span className="text-lg">💸</span>
              if (activity.type === 'app') return <span className="text-lg">📱</span>
              if (activity.type === 'vote') return <span className="text-lg">🗳️</span>
              if (activity.type === 'stake')
                return <span className="text-lg">🔐</span>
              return null
            }

            return (
              <div
                key={activity.id}
                className="bg-bg-secondary rounded-lg p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-shrink-0">{getIcon()}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.label}
                    </p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
                <div className="text-sm font-bold text-accent-green flex-shrink-0">
                  +{activity.xp} XP
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </PageWrapper>
  )
}
