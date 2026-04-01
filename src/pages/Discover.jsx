import { useState, useContext } from "react";
import { apps } from "../data/apps";
import { PageWrapper } from "../components/layout/PageWrapper";
import { CampaignCard } from "../components/ui/CampaignCard";
import { AppCard } from "../components/ui/AppCard";
import { BottomSheet } from "../components/ui/BottomSheet";
import { AppContext } from "../context/AppContext";

const CATEGORIES = [
  "All",
  "DeFi",
  "Payments",
  "Rewards",
  "Governance",
  "Utility",
];

export const Discover = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);
  const { showToast } = useContext(AppContext);

  // Campaign apps
  const campaignApps = apps.filter((app) => app.hasActiveCampaign);

  // Trending apps based on weekly users
  const trendingApps = apps
    .filter(
      (app) =>
        activeCategory === "All" || app.category === activeCategory
    )
    .sort((a, b) => b.weeklyUsers - a.weeklyUsers);

  // Undiscovered apps (user hasn't used yet)
  const undiscoveredApps = apps
    .filter((app) => !app.userHasUsed)
    .slice(0, 3);

  const handleAppTap = (app) => {
    setSelectedApp(app);
  };

  const handleCloseSheet = () => {
    setSelectedApp(null);
  };

  return (
    <PageWrapper>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Discover</h1>

      {/* Active Campaigns */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-3 text-gray-300">Active Campaigns</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {campaignApps.map((app) => (
            <div
              key={app.id}
              onClick={() => handleAppTap(app)}
            >
              <CampaignCard app={app} />
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-accent-green text-bg-primary"
                : "bg-bg-secondary text-gray-300 hover:bg-bg-tertiary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Trending Mini Apps */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-3 text-gray-300">
          Trending This Week
        </h2>
        <div>
          {trendingApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              onTap={handleAppTap}
            />
          ))}
        </div>
      </div>

      {/* Your Undiscovered Apps */}
      {undiscoveredApps.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold mb-3 text-gray-300">
            Try These to Earn More XP
          </h2>
          <div>
            {undiscoveredApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onTap={handleAppTap}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Sheet Modal */}
      {selectedApp && (
        <BottomSheet app={selectedApp} onClose={() => setSelectedApp(null)} />
      )}
    </PageWrapper>
  );
};
