import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { apps } from '../../data/apps'

interface BottomSheetProps {
  app: (typeof apps)[0] | null
  onClose: () => void
}

export const BottomSheet = ({ app, onClose }: BottomSheetProps) => {
  const context = useContext(AppContext)
  if (!context) throw new Error('AppContext not found')
  const { showToast } = context

  if (!app) return null

  const handleOpenApp = () => {
    onClose()
    showToast('Opening ' + app.name + '…')
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
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">{app.emoji}</div>
            <div>
              <h2 className="text-xl font-bold">{app.name}</h2>
              <p className="text-sm text-gray-400">{app.category}</p>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-6">{app.description}</p>

          <div className="bg-bg-tertiary rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold mb-3">
              Actions that earn XP
            </h3>
            <ul className="space-y-2">
              {app.actions.map((action, idx) => (
                <li key={idx} className="text-sm text-gray-300">
                  • {action}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 mb-6 text-sm text-gray-400">
            <p>Weekly active users: {app.weeklyUsers.toLocaleString()}</p>
            <p>XP range: {app.xpRange}</p>
          </div>

          <button
            onClick={handleOpenApp}
            className="w-full bg-accent-green text-bg-primary py-3 rounded-lg font-semibold"
          >
            Open App
          </button>
        </div>
      </div>
    </div>
  )
}
