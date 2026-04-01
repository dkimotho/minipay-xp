import { useContext } from "react";
import {
  claimableRewards,
  seasonRewardTiers,
  seasonSummary,
  pastSeasons,
} from "../data/rewards";
import { PageWrapper } from "../components/layout/PageWrapper";
import { RewardRow } from "../components/ui/RewardRow";
import { AppContext } from "../context/AppContext";

export const Rewards = () => {
  const { showToast, claimedRewards, claimReward } = useContext(AppContext);

  const handleClaim = (rewardId) => {
    claimReward(rewardId);
    showToast("Reward claimed! Funds sent to your wallet.");
  };

  return (
    <PageWrapper>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Rewards</h1>

      {/* Season Rewards Summary */}
      <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-lg p-6 mb-6 border border-accent-green border-opacity-20">
        <h2 className="text-sm font-semibold text-gray-400 mb-2">Current Season</h2>
        <p className="text-lg font-bold mb-1">{seasonSummary.currentTier}</p>
        <p className="text-sm text-gray-400 mb-4">{seasonSummary.percentile}</p>
        <div className="bg-bg-tertiary rounded-lg p-3 mb-3">
          <p className="text-xs text-gray-400">Projected Reward</p>
          <p className="text-lg font-bold text-accent-gold">
            {seasonSummary.projectedReward}
          </p>
        </div>
        <p className="text-xs text-gray-500">Final rewards distributed at season end</p>
      </div>

      {/* Claimable Rewards */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">
          Available to Claim
        </h3>
        {claimableRewards.length > 0 ? (
          <div>
            {claimableRewards.map((reward) => (
              <RewardRow
                key={reward.id}
                title={reward.title}
                amount={reward.amount}
                claimed={claimedRewards.has(reward.id)}
                onClaim={() => handleClaim(reward.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-bg-secondary rounded-lg p-8 text-center">
            <p className="text-gray-400 text-sm">No rewards to claim yet</p>
          </div>
        )}
      </div>

      {/* Season Prize Pool */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Season Prize Pool</h3>
        <div className="bg-bg-secondary rounded-lg p-4 mb-3">
          <p className="text-xs text-gray-400 mb-2">Total Pool</p>
          <p className="text-lg font-bold text-accent-gold">
            {seasonSummary.totalPoolValue}
          </p>
        </div>

        {/* Tier Distribution */}
        <div className="space-y-2">
          {seasonRewardTiers.map((tier, idx) => {
            const borderColor =
              tier.color === "gold"
                ? "border-accent-gold"
                : tier.color === "silver"
                ? "border-gray-400"
                : tier.color === "bronze"
                ? "border-yellow-700"
                : "border-gray-600";

            const bgColor =
              tier.color === "gold"
                ? "bg-opacity-10 bg-yellow-500"
                : tier.color === "silver"
                ? "bg-opacity-10 bg-gray-400"
                : tier.color === "bronze"
                ? "bg-opacity-10 bg-yellow-700"
                : "bg-opacity-5 bg-gray-400";

            return (
              <div
                key={idx}
                className={`rounded-lg p-3 border ${borderColor} ${bgColor}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">{tier.tier}</p>
                    <p className="text-sm font-bold mt-1">{tier.reward}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Past Seasons */}
      {pastSeasons.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-300">
            Past Seasons
          </h3>
          {pastSeasons.map((season, idx) => (
            <div key={idx} className="bg-bg-secondary rounded-lg p-4 mb-3">
              <p className="text-xs text-gray-400">Season {season.season}</p>
              <p className="text-sm font-bold mt-1">{season.tier}</p>
              <p className="text-lg font-bold text-accent-gold mt-2">
                {season.reward}
              </p>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
};
