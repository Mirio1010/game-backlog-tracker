import mockGames from "../../data/mockGames";

const BackLogPreviewCard = () => {
  const previewGames = mockGames.slice(0, 3);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Backlog Preview</h2>
        <p className="text-sm text-white/50">
          A quick look at the games currently in your tracker.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {previewGames.map((game) => (
          <div
            key={game.id}
            className="overflow-hidden rounded-xl border border-white/10 bg-black/20 transition hover:-translate-y-1 hover:bg-black/30"
          >
            <div className="flex h-72 items-center justify-center bg-black/30 p-3">
              <img
                src={game.coverImage}
                alt={game.coverAlt}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold">{game.title}</h3>

              <p className="text-sm text-white/50">{game.platform}</p>

              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
                  {game.status}
                </span>

                <span className="text-xs text-white/40">
                  {game.hoursPlayed}h played
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackLogPreviewCard;
