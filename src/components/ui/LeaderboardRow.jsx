import { TrendingUp, TrendingDown } from "lucide-react";

export const LeaderboardRow = ({ rank, address, xp, delta, isHighlighted }) => {
  const getDeltaColor = () => {
    if (delta > 0) return "text-green-400";
    if (delta < 0) return "text-red-400";
    return "text-gray-500";
  };

  const getDeltaIcon = () => {
    if (delta > 0) return <TrendingUp size={14} />;
    if (delta < 0) return <TrendingDown size={14} />;
    return null;
  };

  return (
    <div
      className={`flex items-center justify-between py-3 px-4 rounded-lg ${
        isHighlighted ? "bg-bg-tertiary border border-accent-green border-opacity-30" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="text-lg font-bold text-accent-gold w-8 text-center">#{rank}</div>
        <div className="text-sm font-medium text-gray-300">{address}</div>
      </div>
      <div className="flex items-center gap-2 text-right">
        <div className="text-sm font-semibold text-white w-16">
          {xp.toLocaleString()}
        </div>
        {delta !== 0 && (
          <div className={`flex items-center gap-1 ${getDeltaColor()}`}>
            {getDeltaIcon()}
            <span className="text-xs font-semibold">{Math.abs(delta)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
