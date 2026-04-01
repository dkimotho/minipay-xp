import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { weeklyXPData } from "../../data/weeklyXP";

export const WeeklyXPChart = () => {
  return (
    <div className="bg-bg-secondary rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-4">XP Earned This Week</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeklyXPData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="day" stroke="#999" style={{ fontSize: "12px" }} />
          <YAxis stroke="#999" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1C1C1C",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
            formatter={(value) => `${value} XP`}
          />
          <Bar dataKey="xp" fill="#35D07F" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
