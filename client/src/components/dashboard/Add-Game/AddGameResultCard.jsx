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
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl transition hover:-translate-y-1 hover:bg-white/10">
      <div className="flex h-56 items-center justify-center bg-black/30 p-3 sm:h-72">
        <img
          src={game.coverImage}
          alt={game.coverAlt}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-3 sm:p-4">
        <div className="mb-3">
          <h2 className="line-clamp-1 font-semibold text-white">
            {game.title}
          </h2>

          <p className="line-clamp-1 text-sm text-white/50">{genresText}</p>
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-white/40">Platforms</p>
            <p className="mt-1 line-clamp-1 font-semibold text-white">
              {platformsText}
            </p>
          </div>

          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-white/40">Avg Playtime</p>
            <p className="mt-1 font-semibold text-white">{playtimeText}</p>
          </div>

          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-white/40">Released</p>
            <p className="mt-1 font-semibold text-white">
              {game.released || "Unknown"}
            </p>
          </div>

          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-white/40">RAWG Rating</p>
            <p className="mt-1 font-semibold text-white">{ratingText}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenModal(game)}
          disabled={alreadyAdded}
          className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-medium transition ${
            alreadyAdded
              ? "cursor-not-allowed bg-white/10 text-white/30"
              : "bg-violet-500 text-white hover:bg-violet-600"
          }`}
        >
          {alreadyAdded ? "Already Added" : "Add to Backlog"}
        </button>
      </div>
    </article>
  );
};

export default AddGameResultCard;
