const BackLogPreviewCard = ({ games = [] }) => {
  const previewGames = games.slice(0, 3);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Backlog Preview</h2>
        <p className="text-sm text-muted">
          A quick look at the games currently in your tracker.
        </p>
      </div>

      {previewGames.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-6 text-center">
          <p className="text-sm text-muted">No games in your backlog yet.</p>
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
                className="overflow-hidden rounded-xl border border-border bg-surface transition hover:-translate-y-1 hover:bg-black/30"
              >
                <div className="flex h-56 items-center justify-center bg-surface/80 p-3 sm:h-72">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={game.coverAlt || `${title} cover art`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-xl border border-border bg-card text-sm text-muted">
                      No cover available
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 font-semibold">{title}</h3>

                  <p className="text-sm text-muted">
                    {platform || "No platform selected"}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted">
                      {game.status}
                    </span>

                    <span className="text-xs text-muted">
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
