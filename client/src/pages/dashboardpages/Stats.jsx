import { useOutletContext } from "react-router-dom";
import GamesByPlatformChart from "../../components//dashboard/Stats/GamesByPlatformChart";
import BacklogTimeStats from "../../components/dashboard/Stats/BacklogTimeStats";
import GamesByGenreChart from "../../components/dashboard/Stats/GamesByGenreChart";
const Stats = () => {
  const { games } = useOutletContext();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Stats</h1>
        <p className="mt-2 text-white/50">
          View detailed statistics about your backlog
        </p>
      </div>

      <GamesByPlatformChart games={games} />
      <BacklogTimeStats games={games}/>
      <GamesByGenreChart games={games}/>
    </div>
  );
};

export default Stats;
