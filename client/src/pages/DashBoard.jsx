import MainLayout from "../components/layout/MainLayout";
import SideBar from "../components/dashboard/SideBar";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <MainLayout>
      <div className="flex h-screen overflow-hidden">
        <aside className="h-screen w-64 shrink-0">
          <SideBar />
        </aside>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-zinc-950 via-slate-900 to-black p-8 text-white">
          {/* “Render whichever dashboard subpage matches the current URL here.” */}
          <Outlet />
        </main>
      </div>
    </MainLayout>
  );
};

export default DashBoard;
