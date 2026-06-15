import { Link, useParams, useOutletContext } from "react-router-dom";

const GamePage = () => {
  const { id } = useParams();

  const { games } = useOutletContext();

  const game = games.find((game) => String(game.id) === String(id));
    console.log(game);
    
  if (!game) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold">Game not found</h1>

        <Link
          to="/dashboard/backlog"
          className="mt-4 inline-block text-purple-300 hover:text-purple-200"
        >
          Back to backlog
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <Link
        to="/dashboard/backlog"
        className="mb-6 inline-block text-sm text-purple-300 hover:text-purple-200"
      >
        ← Back to backlog
      </Link>

      <h1 className="text-4xl font-bold">{game.title}</h1>

      <p className="mt-2 text-white/70">{game.platform}</p>
      <p className="mt-2 text-white/70">Status: {game.status}</p>
      <img src={game.cover_image}></img>
    </div>
  );
};

export default GamePage;
