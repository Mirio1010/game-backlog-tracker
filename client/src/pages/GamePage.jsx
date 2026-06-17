import { Link, useParams, useOutletContext } from "react-router-dom";

const GamePage = () => {
  const { id } = useParams();
  const { games } = useOutletContext();

  const game = games.find((game) => String(game.id) === String(id));

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
    <div className="min-h-screen p-6 text-white">
      <Link
        to="/dashboard/backlog"
        className="mb-6 inline-block text-sm text-purple-300 hover:text-purple-200"
      >
        ← Back to backlog
      </Link>

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur">
        <div className="grid gap-8 p-6 md:grid-cols-[280px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <img
              src={game.cover_image}
              alt={game.title}
              className="h-full min-h-[380px] w-full object-cover"
            />
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-200">
                {game.status}
              </span>

              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-sm text-white/70">
                Playing on {game.selected_platform}
              </span>
            </div>

            <h1 className="text-4xl font-bold md:text-5xl">{game.title}</h1>

            <div className="mt-5 flex flex-wrap gap-2">
              {game.genres?.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DetailCard label="Status" value={game.status} />

              <DetailCard
                label="Selected Platform"
                value={game.selected_platform}
              />

              <DetailCard
                label="Average Playtime"
                value={
                  game.average_playtime
                    ? `${game.average_playtime} hours`
                    : "N/A"
                }
              />

              <DetailCard label="Rating" value={game.rating || "N/A"} />

              <DetailCard label="Released" value={game.released || "N/A"} />

              <DetailCard
                label="Available Platforms"
                value={game.platforms?.join(", ") || "N/A"}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-2xl font-bold">Notes</h2>

        <p className="mt-3 text-white/70">
          {game.notes || "You have not added any notes for this game yet."}
        </p>
      </section>
    </div>
  );
};

const DetailCard = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm text-white/50">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
};

export default GamePage;
