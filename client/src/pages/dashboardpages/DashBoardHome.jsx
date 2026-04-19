import BackLogPreviewCard from "../../components/dashboard/BackLogPreviewCard";
import DashboardStats from "../../components/dashboard/DashboardStats";
import StatusWheelCard from "../../components/dashboard/StatusWheelCard";
import { useOutletContext } from "react-router-dom";


const DashboardHome = () => {
const { games } = useOutletContext();

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-white/50">
          Track your backlog progress and see what needs your attention.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <StatusWheelCard games={games}/>
        <DashboardStats />
        <BackLogPreviewCard />
      </div>
    </section>
  );
};

export default DashboardHome;
