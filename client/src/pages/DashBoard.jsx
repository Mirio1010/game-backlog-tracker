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
      <div className="flex h-screen overflow-hidden">
        <aside className="h-screen w-64 shrink-0">
          <SideBar />
        </aside>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-zinc-950 via-slate-900 to-black p-8 text-white">
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
