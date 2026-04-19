import MainLayout from "../components/layout/MainLayout"
import SideBar from "../components/dashboard/SideBar";
import DashboardHome from "./DashBoardHome";
const DashBoard = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex">
        <aside className="w-64">
          <SideBar />
        </aside>

        <main className="min-h-screen flex-1 bg-gradient-to-br from-zinc-950 via-slate-900 to-black p-8 text-white">
          <DashboardHome />
        </main>
      </div>
    </MainLayout>
  );
}
export default DashBoard