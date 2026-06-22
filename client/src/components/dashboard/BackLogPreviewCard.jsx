const BackLogPreviewCard = ({ games = [] }) => {
  const previewGames = games.slice(0, 3);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Backlog Preview</h2>
        <p className="text-sm text-white/50">
          A quick look at the games currently in your tracker.
        </p>
      </div>

      {previewGames.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-black/20 p-6 text-center">
          <p className="text-sm text-white/50">No games in your backlog yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {previewGames.map((game) => {
            const title = game.title || game.name;
            const coverImage =
              game.coverImage || game.cover_image || game.background_image;
            const platform = game.platform || game.selected_platform;
            const timeToBeat =
              game.howLongToBeat || game.rawgPlaytime || game.average_playtime;

            return (
              <div
                key={game.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-black/20 transition hover:-translate-y-1 hover:bg-black/30"
              >
                <div className="flex h-56 items-center justify-center bg-black/30 p-3 sm:h-72">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={game.coverAlt || `${title} cover art`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm text-white/40">
                      No cover available
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 font-semibold">{title}</h3>

                  <p className="text-sm text-white/50">
                    {platform || "No platform selected"}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
                      {game.status}
                    </span>

                    <span className="text-xs text-white/40">
                      {timeToBeat ? `${timeToBeat}h to beat` : "Time N/A"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BackLogPreviewCard;
