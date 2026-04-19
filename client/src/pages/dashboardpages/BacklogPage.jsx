import mockGames from "../../data/mockGames";
import GameCard from "../../components/dashboard/GameCard";

const BacklogPage = () => {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          My Backlog
        </h1>

        <p className="mt-2 text-white/50">
          View every game in your backlog library.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {mockGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
};

export default BacklogPage;
