import { useEffect, useState } from 'react'

interface XPBarProps {
  current: number
  nextLevel: number
  currentLevelXP: number
  nextLevelXP: number
}

export const XPBar = ({
  current,
  nextLevel,
  currentLevelXP,
  nextLevelXP,
}: XPBarProps) => {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const progress =
        ((current - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
      setDisplayProgress(Math.min(100, Math.max(0, progress)))
    }, 100)

    return () => clearTimeout(timeout)
  }, [current, currentLevelXP, nextLevelXP])

  const xpToNextLevel = nextLevelXP - current

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-300">
          Progress to Level {nextLevel}
        </h3>
        <span className="text-sm font-bold text-accent-green">
          +{xpToNextLevel.toLocaleString()} XP
        </span>
      </div>
      <div className="w-full bg-bg-tertiary rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-accent-green to-accent-green h-full rounded-full transition-all duration-800 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{current.toLocaleString()} XP</span>
        <span>{nextLevelXP.toLocaleString()} XP</span>
      </div>
    </div>
  )
}
