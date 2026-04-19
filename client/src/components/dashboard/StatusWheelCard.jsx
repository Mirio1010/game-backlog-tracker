import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const StatusWheelCard = ({ games }) => {
  const playingGames = games.filter((game) => game.status === "Playing").length;

  const completedGames = games.filter(
    (game) => game.status === "Completed",
  ).length;

  const backlogGames = games.filter((game) => game.status === "Backlog").length;

  const statusData = [
    {
      name: "Playing",
      value: playingGames,
    },
    {
      name: "Completed",
      value: completedGames,
    },
    {
      name: "Backlog",
      value: backlogGames,
    },
  ];

  const colors = ["#8b5cf6", "#22c55e", "#f92516"];

  return (
    <div className="w-full min-w-0 rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-xl backdrop-blur">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Backlog Status</h2>
        <p className="mt-1 text-sm text-white/50">
          See how your games are split between playing, completed, and backlog.
        </p>
      </div>

      <div className="h-64 w-full min-w-0">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={250}
        >
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              {statusData.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {statusData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colors[index] }}
              />

              <span className="text-sm text-white/70">{item.name}</span>
            </div>

            <span className="text-sm font-semibold text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusWheelCard;
