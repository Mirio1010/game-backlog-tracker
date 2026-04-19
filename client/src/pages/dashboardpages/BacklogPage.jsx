import { useOutletContext } from "react-router-dom";
import GameCard from "../../components/dashboard/GameCard";

const BacklogPage = () => {
  const { games, setGames } = useOutletContext();

  const handleRemoveGame = (gameId) => {
    setGames((currentGames) =>
      currentGames.filter((game) => game.id !== gameId),
    );
  };

  return (
    <section>
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
          {games.map((game) => (
            <GameCard key={game.id} game={game} onRemove={handleRemoveGame} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BacklogPage;
