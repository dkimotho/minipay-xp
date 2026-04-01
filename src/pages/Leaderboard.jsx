import { useState } from "react";
import { user } from "../data/user";
import { leaderboardEntries, podium } from "../data/leaderboard";
import { PageWrapper } from "../components/layout/PageWrapper";
import { LeaderboardRow } from "../components/ui/LeaderboardRow";

export const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <PageWrapper>
      {/* Season Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Season 1 Leaderboard</h1>
        <p className="text-sm text-gray-400">
          18 days remaining · {user.totalParticipants.toLocaleString()} users
        </p>
      </div>

      {/* User's Rank Card */}
      <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-lg p-4 mb-6 border border-accent-green border-opacity-30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">Your Rank</p>
            <h2 className="text-3xl font-bold text-accent-green">#{user.seasonRank}</h2>
            <p className="text-sm text-gray-400 mt-2">{user.percentile}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">
              {user.seasonalXP.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">XP</p>
          </div>
        </div>
        <div className="mt-4 bg-bg-tertiary rounded-full h-2 overflow-hidden">
          <div
            className="bg-accent-green h-full rounded-full"
            style={{ width: `${(100 / user.seasonRank) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">Progress toward Top 100</p>
      </div>

      {/* Podium */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Top 3</h3>
        <div className="space-y-3">
          {podium.map((entry, idx) => {
            const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉";
            const borderColor =
              idx === 0 ? "border-accent-gold" : idx === 1 ? "border-gray-500" : "border-yellow-700";

            return (
              <div
                key={entry.rank}
                className={`bg-bg-secondary rounded-lg p-4 border ${borderColor} border-opacity-50`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{medal}</span>
                    <div>
                      <p className="text-xs text-gray-400">Rank #{entry.rank}</p>
                      <p className="text-sm font-medium">{entry.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {entry.xp.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">XP</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-bg-tertiary">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            activeTab === "all"
              ? "text-accent-green border-b-2 border-accent-green"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          All Users
        </button>
        <button
          onClick={() => setActiveTab("friends")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            activeTab === "friends"
              ? "text-accent-green border-b-2 border-accent-green"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Friends
        </button>
      </div>

      {/* Leaderboard List or Empty State */}
      {activeTab === "all" ? (
        <div className="space-y-2">
          {leaderboardEntries.map((entry) => (
            <LeaderboardRow
              key={entry.rank}
              rank={entry.rank}
              address={entry.address}
              xp={entry.xp}
              delta={entry.delta}
            />
          ))}
        </div>
      ) : (
        <div className="bg-bg-secondary rounded-lg p-8 text-center">
          <p className="text-gray-400 text-sm">
            Connect friends coming soon
          </p>
        </div>
      )}
    </PageWrapper>
  );
};
