const AddGameResultCard = ({ game, alreadyAdded, onAddGame }) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl transition hover:-translate-y-1 hover:bg-white/10">
      <div className="flex h-72 items-center justify-center bg-black/30 p-3">
        <img
          src={game.coverImage}
          alt={game.coverAlt}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h2 className="font-semibold text-white">{game.title}</h2>
          <p className="text-sm text-white/50">{game.genre}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-white/40">Platform</p>
            <p className="mt-1 font-semibold text-white">{game.platform}</p>
          </div>

          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-white/40">Time to Beat</p>
            <p className="mt-1 font-semibold text-white">
              {game.howLongToBeat}h
            </p>
          </div>
        </div>

        <button
          onClick={() => onAddGame(game)}
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
