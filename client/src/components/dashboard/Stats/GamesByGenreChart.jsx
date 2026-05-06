import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { getGamesByGenre } from "../../../utils/gameStats";

const GENRE_COLORS = {
  "Action RPG": "#8b5cf6",
  Adventure: "#38bdf8",
  RPG: "#a78bfa",
  Metroidvania: "#f97316",
  "Action Adventure": "#ec4899",
  "Survival Horror": "#ef4444",
  CRPG: "#22c55e",
  "Open World": "#14b8a6",
  Action: "#facc15",
  Simulation: "#84cc16",
  Platformer: "#fb7185",
  Racing: "#60a5fa",
  Horror: "#dc2626",
  JRPG: "#c084fc",
  Unknown: "#6b7280",
};

const GamesByGenreChart = ({ games = [] }) => {
  const genreData = getGamesByGenre(games);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Games by Genre</h2>
        <p className="mt-1 text-sm text-white/50">
          See what types of games make up your collection.
        </p>
      </div>

      {genreData.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-sm text-white/50">
          No genre data yet.
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genreData}>
              <XAxis
                dataKey="genre"
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
                {genreData.map((entry) => (
                  <Cell
                    key={entry.genre}
                    fill={GENRE_COLORS[entry.genre] || "#8b5cf6"}
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

export default GamesByGenreChart;
