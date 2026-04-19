import { Trash2 } from "lucide-react";

const GameCard = ({ game, onRemove }) => {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl transition hover:-translate-y-1 hover:bg-white/10">
      {onRemove && (
        <button
          onClick={() => onRemove(game.id)}
          aria-label={`Remove ${game.title}`}
          className="absolute right-3 top-3 z-10 rounded-full border border-red-500/20 bg-black/60 p-2 text-red-300 backdrop-blur transition hover:bg-red-500/20 hover:text-red-200"
        >
          <Trash2 size={18} />
        </button>
      )}

      <div className="flex h-72 items-center justify-center bg-black/30 p-3">
        <img
          src={game.coverImage}
          alt={game.coverAlt}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">{game.title}</h2>
            <p className="text-sm text-white/50">{game.platform}</p>
          </div>

          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
            {game.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-white/40">Time to Beat</p>
            <p className="mt-1 font-semibold text-white">
              {game.howLongToBeat}h
            </p>
          </div>

          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-white/40">Rating</p>
            <p className="mt-1 font-semibold text-white">
              {game.rating ? `${game.rating}/10` : "Not rated"}
            </p>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm text-white/50">{game.notes}</p>
      </div>
    </article>
  );
};

export default GameCard;
