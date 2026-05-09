import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import AddGameSearchBar from "../../components/dashboard/Add-Game/AddGameSearchBar";
import AddGameResultCard from "../../components/dashboard/Add-Game/AddGameResultCard";
import AddGameModal from "../../components/dashboard/Add-Game/AddGameModal";

const AddGamePage = () => {
  const { games, setGames } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchGames = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setSearchResults([]);
      setError("Please enter a game name.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5001/api/rawg/search?query=${encodeURIComponent(
          searchTerm,
        )}`,
      );

      if (!response.ok) {
        throw new Error("Failed to search games.");
      }

      const data = await response.json();

      setSearchResults(data);
    } catch (error) {
      console.error("Search games error:", error);
      setError("Something went wrong while searching for games.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const handleSaveGame = (gameToAdd) => {
    const alreadyAdded = games.some(
      (game) =>
        game.rawgId === gameToAdd.rawgId || game.title === gameToAdd.title,
    );

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

      <form onSubmit={handleSearchGames}>
        <AddGameSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </form>

      {searchTerm.trim() === "" && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/50">
          Search for a game to see results.
        </div>
      )}

      {isLoading && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/50">
          Searching games...
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {searchResults.map((game) => {
          const alreadyAdded = games.some(
            (savedGame) =>
              savedGame.rawgId === game.rawgId ||
              savedGame.title === game.title,
          );

          return (
            <AddGameResultCard
              key={game.rawgId}
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
