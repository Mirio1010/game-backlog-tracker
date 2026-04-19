import BackLogPreviewCard from "../../components/dashboard/BackLogPreviewCard";
import DashboardStats from "../../components/dashboard/DashboardStats";
import StatusWheelCard from "../../components/dashboard/StatusWheelCard";

const DashboardHome = () => {
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
        <StatusWheelCard />
        <DashboardStats />
        <BackLogPreviewCard />
      </div>
    </section>
  );
};

export default DashboardHome;
