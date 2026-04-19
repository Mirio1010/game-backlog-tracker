import StatCard from "./StatCard";
import mockGames from "../../data/mockGames";
import {
  totalGames,
  playingGames,
  completedGames,
  backlogGames,
  totalHoursPlayed,
} from "../../utils/gameStats";

const DashboardStats = () => {
  const completionRate =
    totalGames === 0 ? 0 : Math.round((completedGames / totalGames) * 100);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
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
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <StatCard
          title="Total Hours Played"
          value={`${totalHoursPlayed}h`}
          subtitle="Across all tracked games"
        />

        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          subtitle={`${completedGames} out of ${totalGames} games completed`}
        />
      </div>
    </>
  );
};

export default DashboardStats;
