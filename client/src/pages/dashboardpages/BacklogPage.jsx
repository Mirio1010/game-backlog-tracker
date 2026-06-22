import { useOutletContext } from "react-router-dom";
import GameCard from "../../components/dashboard/GameCard";

import { useState } from "react";
import FilterUI from "../../components/ui/FilterUI";

import { deleteGame } from "../../api/gamesApi";

const BacklogPage = () => {
  const { games, setGames } = useOutletContext();
  const [selectedStatus, setSelectedStatus] = useState("Backlog");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = games.filter((game) => {
    const gamePlatform = game.platform || game.selected_platform;
    const gameTitle = game.title || game.name || "";

    const matchesStatus =
      selectedStatus === "All" || game.status === selectedStatus;

    const matchesPlatform =
      selectedPlatform === "All" || gamePlatform === selectedPlatform;

    const matchesSearch = gameTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesPlatform && matchesSearch;
  });

 const handleRemoveGame = async (gameId) => {
   try {
     await deleteGame(gameId);

     setGames((currentGames) =>
       currentGames.filter((game) => game.id !== gameId),
     );
   } catch (error) {
     console.error("Delete game error:", error);
   }
 };


console.log(filteredGames);

 

  return (
    <section>
      <FilterUI
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          My Backlog
        </h1>

        <p className="mt-2 text-white/50">
          View and manage every game in your backlog.
        </p>
      </div>

      {games.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            No games in your backlog yet.
          </h2>
          <p className="mt-2 text-white/50">
            Add your first game from the Add Game page.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} onRemove={handleRemoveGame} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BacklogPage;
