import { Link, useLocation } from 'react-router-dom'
import { Home, Layers, Vote, Compass, Gift } from 'lucide-react'

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/staking', icon: Layers, label: 'Staking' },
  { path: '/governance', icon: Vote, label: 'Govern' },
  { path: '/discover', icon: Compass, label: 'Discover' },
  { path: '/rewards', icon: Gift, label: 'Rewards' },
]

export const BottomNav = () => {
  const location = useLocation()

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-bg-secondary border-t border-bg-tertiary">
      <div className="flex justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 relative transition-colors min-h-[56px] ${
                isActive ? 'text-accent-green' : 'text-gray-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] mt-0.5 truncate">{label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-green" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
