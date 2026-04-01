export const StatCard = ({ label, value, icon: Icon }) => {
  return (
    <div className="bg-bg-secondary rounded-lg p-4 flex-1 text-center">
      {Icon && <Icon className="w-5 h-5 mx-auto mb-2 text-accent-green" />}
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
};
