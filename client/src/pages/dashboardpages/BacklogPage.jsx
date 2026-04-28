import { useOutletContext } from "react-router-dom";
import GameCard from "../../components/dashboard/GameCard";

import { useState } from "react";

const FilterUI = ({
  selectedStatus,
  setSelectedStatus,
  selectedPlatform,
  setSelectedPlatform,
}) => {
  return (
    <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search games..."
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder:text-white/40 outline-none md:flex-1"
        />

        <select
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white outline-none"
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Backlog">Backlog</option>
          <option value="Playing">Playing</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>

        <select
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white outline-none"
          value={selectedPlatform}
          onChange={(event) => setSelectedPlatform(event.target.value)}
        >
          <option value="All">All Platforms</option>
          <option value="PC">PC</option>
          <option value="Steam">Steam</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="PlayStation 4">PlayStation 4</option>
          <option value="Xbox Series X/S">Xbox Series X/S</option>
          <option value="Xbox One">Xbox One</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Nintendo Switch 2">Nintendo Switch 2</option>
          <option value="Steam Deck">Steam Deck</option>
          <option value="Mobile">Mobile</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <p className="text-sm text-white/50">Selected status: {selectedStatus}</p>
    </div>
  );
};

const BacklogPage = () => {
  const { games, setGames } = useOutletContext();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");

  const filteredGames = games.filter((game) => {
    const matchesStatus =
      selectedStatus === "All" || game.status === selectedStatus;

    const matchesPlatform =
      selectedPlatform === "All" || game.platform === selectedPlatform;

    return matchesStatus && matchesPlatform;
  });

  const handleRemoveGame = (gameId) => {
    setGames((currentGames) =>
      currentGames.filter((game) => game.id !== gameId),
    );
  };

  return (
    <section>
      <FilterUI
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
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
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} onRemove={handleRemoveGame} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BacklogPage;
