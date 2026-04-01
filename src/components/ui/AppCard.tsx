import { apps } from '../../data/apps'

interface AppCardProps {
  app: (typeof apps)[0]
  onTap: (app: (typeof apps)[0]) => void
}

export const AppCard = ({ app, onTap }: AppCardProps) => {
  return (
    <div
      onClick={() => onTap(app)}
      className="bg-bg-secondary rounded-lg p-4 mb-3 cursor-pointer hover:bg-bg-tertiary transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">{app.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm">{app.name}</h3>
            <span className="text-xs bg-bg-tertiary text-gray-300 px-2 py-1 rounded">
              {app.category}
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-2">
            {app.weeklyUsers.toLocaleString()} users earned XP this week
          </p>
          <p className="text-xs text-accent-green font-semibold">
            {app.xpRange}
          </p>
        </div>
      </div>
    </div>
  )
}
