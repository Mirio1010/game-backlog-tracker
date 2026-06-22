import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import SideBar from "../components/dashboard/SideBar";
import { fetchMyGames } from "../api/gamesApi";

const DashBoard = () => {
  const [games, setGames] = useState([]);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [gamesError, setGamesError] = useState("");

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoadingGames(true);
        setGamesError("");

        const savedGames = await fetchMyGames();

        setGames(savedGames);
      } catch (error) {
        console.error("Error loading games:", error);
        setGamesError(error.message);
      } finally {
        setIsLoadingGames(false);
      }
    };

    loadGames();
  }, []);

  return (
    <MainLayout>
      <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
        <aside className="shrink-0 md:h-screen md:w-64">
          <SideBar />
        </aside>

        <main className="min-w-0 flex-1 bg-gradient-to-br from-zinc-950 via-slate-900 to-black p-4 text-white sm:p-6 md:overflow-y-auto md:p-8">
          <Outlet
            context={{
              games,
              setGames,
              isLoadingGames,
              gamesError,
            }}
          />
        </main>
      </div>
    </MainLayout>
  );
};

export default DashBoard;
