import { getBacklogTimeStats } from "../../../utils/gameStats";

const BacklogTimeStats = ({ games = [] }) => {
  const {
    totalBacklogHours,
    averageBacklogHours,
    longestBacklogGame,
    shortestBacklogGame,
  } = getBacklogTimeStats(games);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg">
        <p className="text-sm text-white/50">Estimated Backlog Time</p>
        <h3 className="mt-2 text-3xl font-bold text-white">
          {totalBacklogHours}h
        </h3>
        <p className="mt-2 text-sm text-white/40">
          Total time to finish backlog games
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg">
        <p className="text-sm text-white/50">Average Backlog Length</p>
        <h3 className="mt-2 text-3xl font-bold text-white">
          {averageBacklogHours}h
        </h3>
        <p className="mt-2 text-sm text-white/40">
          Average completion estimate
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg">
        <p className="text-sm text-white/50">Longest Backlog Game</p>
        <h3 className="mt-2 truncate text-xl font-bold text-white">
          {longestBacklogGame ? longestBacklogGame.title : "N/A"}
        </h3>
        <p className="mt-2 text-sm text-white/40">
          {longestBacklogGame
            ? `${longestBacklogGame.howLongToBeat}h estimated`
            : "No data yet"}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg">
        <p className="text-sm text-white/50">Shortest Backlog Game</p>
        <h3 className="mt-2 truncate text-xl font-bold text-white">
          {shortestBacklogGame ? shortestBacklogGame.title : "N/A"}
        </h3>
        <p className="mt-2 text-sm text-white/40">
          {shortestBacklogGame
            ? `${shortestBacklogGame.howLongToBeat}h estimated`
            : "No data yet"}
        </p>
      </div>
    </div>
  );
};

export default BacklogTimeStats;
