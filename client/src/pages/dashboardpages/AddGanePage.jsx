import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import mockGames from "../../data/mockGames";
import AddGameSearchBar from "../../components/dashboard/Add-Game/AddGameSearchBar";
import AddGameResultCard from "../../components/dashboard/Add-Game/AddGameResultCard";
import AddGameModal from "../../components/dashboard/Add-Game/AddGameModal";

const AddGamePage = () => {
  const { games, setGames } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);

  const searchResults =
    searchTerm.trim() === ""
      ? []
      : mockGames.filter((game) =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );

  const handleOpenModal = (game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const handleSaveGame = (gameToAdd) => {
    const alreadyAdded = games.some((game) => game.title === gameToAdd.title);

    if (alreadyAdded) return;

    setGames((currentGames) => [gameToAdd, ...currentGames]);

    handleCloseModal();
  };

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Add Game
        </h1>

        <p className="mt-2 text-white/50">
          Search for a game and add it to your backlog.
        </p>
      </div>

      <AddGameSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {searchTerm.trim() === "" && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/50">
          Search for a game to see results.
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {searchResults.map((game) => {
          const alreadyAdded = games.some(
            (savedGame) => savedGame.title === game.title,
          );

          return (
            <AddGameResultCard
              key={game.id}
              game={game}
              alreadyAdded={alreadyAdded}
              onOpenModal={handleOpenModal}
            />
          );
        })}
      </div>

      {selectedGame && (
        <AddGameModal
          game={selectedGame}
          onClose={handleCloseModal}
          onSaveGame={handleSaveGame}
        />
      )}
    </section>
  );
};

export default AddGamePage;
