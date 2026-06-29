const AddGameResultCard = ({ game, alreadyAdded, onOpenModal }) => {
  const genresText = game.genres?.length
    ? game.genres.slice(0, 2).join(", ")
    : "Genre unknown";

  const platformsText = game.platforms?.length
    ? game.platforms.slice(0, 2).join(", ")
    : "Unknown";

  const playtimeText = game.rawgPlaytime ? `${game.rawgPlaytime}h` : "N/A";

  const ratingText = game.rawgRating ? game.rawgRating : "N/A";

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl transition hover:-translate-y-1 hover:bg-white/10">
      <div className="flex h-56 items-center justify-center bg-surface p-3 sm:h-72">
        <img
          src={game.coverImage}
          alt={game.coverAlt}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-3 sm:p-4">
        <div className="mb-3">
          <h2 className="line-clamp-1 font-semibold text-foreground">
            {game.title}
          </h2>

          <p className="line-clamp-1 text-sm text-muted">{genresText}</p>
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-muted">Platforms</p>
            <p className="mt-1 line-clamp-1 font-semibold text-foreground">
              {platformsText}
            </p>
          </div>

          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-muted">Avg Playtime</p>
            <p className="mt-1 font-semibold text-foreground">{playtimeText}</p>
          </div>

          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-muted">Released</p>
            <p className="mt-1 font-semibold text-foreground">
              {game.released || "Unknown"}
            </p>
          </div>

          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-muted">RAWG Rating</p>
            <p className="mt-1 font-semibold text-foreground">{ratingText}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenModal(game)}
          disabled={alreadyAdded}
          className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-medium transition ${
            alreadyAdded
              ? "cursor-not-allowed bg-white/10 text-muted"
              : "bg-primary text-primary-foreground hover:bg-cyan-400"
          }`}
        >
          {alreadyAdded ? "Already Added" : "Add to Backlog"}
        </button>
      </div>
    </article>
  );
};

export default AddGameResultCard;
