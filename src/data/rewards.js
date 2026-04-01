export const claimableRewards = [
  {
    id: 1,
    title: "Kolekti Campaign Bonus",
    amount: "5 cUSD",
    claimed: false,
  },
  {
    id: 2,
    title: "Referral Bonus",
    amount: "2.5 CELO",
    claimed: false,
  },
  {
    id: 3,
    title: "Login Streak (7 days)",
    amount: "10 CELO",
    claimed: false,
  },
];

export const seasonRewardTiers = [
  {
    tier: "Top 10",
    minRank: 1,
    maxRank: 10,
    reward: "500 CELO each",
    color: "gold",
  },
  {
    tier: "Top 11–100",
    minRank: 11,
    maxRank: 100,
    reward: "150 CELO each",
    color: "silver",
  },
  {
    tier: "Top 101–500",
    minRank: 101,
    maxRank: 500,
    reward: "50 CELO each",
    color: "bronze",
  },
  {
    tier: "Top 501–2000",
    minRank: 501,
    maxRank: 2000,
    reward: "10 CELO + campaign bonuses",
    color: "gray",
  },
];

export const seasonSummary = {
  currentTier: "Silver Tier",
  percentile: "Top 5%",
  projectedReward: "~12 CELO + 50 cUSD",
  totalPoolValue: "50,000 CELO + 100,000 cUSD",
};

export const pastSeasons = [
  {
    season: 0,
    reward: "8.5 CELO",
    tier: "Gold Tier",
  },
];
