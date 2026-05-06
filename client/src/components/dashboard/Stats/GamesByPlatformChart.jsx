import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { getGamesByPlatform } from "../../../utils/gameStats";

const PLATFORM_COLORS = {
  PC: "#636772",
  Steam: "#e4ecf7",
  "PS5": "#dae6f8",
  "PS4": "#2563eb",
  "Xbox Series X/S": "#22c55e",
  "Xbox One": "#16a34a",
  "Switch": "#ef4444",
  "Nintendo Switch 2": "#f97316",
  "Steam Deck": "#a855f7",
  Mobile: "#14b8a6",
  Other: "#9ca3af",
  Unknown: "#6b7280",
};

const GamesByPlatformChart = ({ games = [] }) => {
  const platformData = getGamesByPlatform(games);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Games by Platform</h2>
        <p className="mt-1 text-sm text-white/50">
          See where most of your tracked games are stored.
        </p>
      </div>

      {platformData.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-sm text-white/50">
          No platform data yet.
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformData}>
              <XAxis
                dataKey="platform"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                contentStyle={{
                  backgroundColor: "#14141400",
                  border: "1px solid rgb(139, 92, 246)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                itemStyle={{
                  color: "#fff",
                }}
              />

              <Bar dataKey="count" name="Games" radius={[8, 8, 0, 0]}>
                {platformData.map((entry) => (
                  <Cell
                    key={entry.platform}
                    fill={PLATFORM_COLORS[entry.platform] || "#fdfeff"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default GamesByPlatformChart;
