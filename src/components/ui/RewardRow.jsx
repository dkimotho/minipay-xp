export const RewardRow = ({ title, amount, claimed, onClaim }) => {
  return (
    <div className="bg-bg-secondary rounded-lg p-4 flex items-center justify-between mb-3">
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-accent-gold font-bold text-lg mt-1">{amount}</p>
      </div>
      <button
        onClick={onClaim}
        disabled={claimed}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
          claimed
            ? "bg-bg-tertiary text-gray-500 cursor-not-allowed"
            : "bg-accent-green text-bg-primary hover:opacity-90"
        }`}
      >
        {claimed ? "Claimed" : "Claim"}
      </button>
    </div>
  );
};
