import { apps } from '../../data/apps'

interface CampaignCardProps {
  app: (typeof apps)[0]
}

export const CampaignCard = ({ app }: CampaignCardProps) => {
  return (
    <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-lg p-4 min-w-[160px] flex-shrink-0 border border-accent-gold border-opacity-20">
      <div className="text-3xl mb-2">{app.emoji}</div>
      <h3 className="font-semibold text-sm mb-1">{app.name}</h3>
      <div className="flex items-center gap-1 mb-3">
        <span className="text-xs bg-accent-gold text-bg-primary px-2 py-1 rounded font-semibold">
          {app.campaignBoost}
        </span>
      </div>
      <div className="text-xs text-gray-400 mb-3">
        {app.campaignDaysLeft} days left
      </div>
      <button className="w-full bg-accent-green text-bg-primary text-xs font-semibold py-2 rounded">
        Earn Now →
      </button>
    </div>
  )
}
