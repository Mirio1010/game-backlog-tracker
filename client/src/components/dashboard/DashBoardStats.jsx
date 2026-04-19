import StatCard from "./StatCard";
import { getGameStats } from "../../utils/gameStats";

const DashboardStats = ({ games = [] }) => {
  const {
    totalGames,
    playingGames,
    completedGames,
    backlogGames,
    completedHoursPlayed,
    completionRate,
  } = getGameStats(games);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Games"
        value={totalGames}
        subtitle="Games in your tracker"
      />

      <StatCard
        title="Currently Playing"
        value={playingGames}
        subtitle="Games in progress"
      />

      <StatCard
        title="Completed"
        value={completedGames}
        subtitle={`${completionRate}% completion rate`}
      />

      <StatCard
        title="Backlog"
        value={backlogGames}
        subtitle="Games waiting to be played"
      />

      <StatCard
        title="Completed Hours"
        value={`${completedHoursPlayed}h`}
        subtitle="Hours from completed games only"
      />

      <StatCard
        title="Completion Rate"
        value={`${completionRate}%`}
        subtitle={`${completedGames} out of ${totalGames} games completed`}
      />
    </div>
  );
};

export default DashboardStats;
