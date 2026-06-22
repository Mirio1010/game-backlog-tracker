import { Trash2, Monitor, Smartphone, Gamepad2 } from "lucide-react";

import {
  SiSteam,
  SiSteamdeck,
  SiPlaystation5,
  SiPlaystation4,
} from "@icons-pack/react-simple-icons";

import { Link } from "react-router-dom";

export const getPlatformIcon = (platform) => {
  const platformIcons = {
    PC: <Gamepad2 size={18} />,
    Steam: <SiSteam size={18} />,
    "PlayStation 5": <SiPlaystation5 size={18} />,
    "PlayStation 4": <SiPlaystation4 size={18} />,
    "Xbox Series X/S": <Gamepad2 size={18} />,
    "Xbox One": <Gamepad2 size={18} />,

    "Nintendo Switch": <Gamepad2 size={18} />,
    "Nintendo Switch 2": <Gamepad2 size={18} />,

    "Steam Deck": <SiSteamdeck size={18} />,
    Mobile: <Smartphone size={18} />,
    Other: <Gamepad2 size={18} />,
  };

  return platformIcons[platform] || <Monitor size={18} />;
};

const GameCard = ({ game, onRemove }) => {
  const title = game.title || game.name;

  const coverImage =
    game.coverImage || game.cover_image || game.background_image;

  const platform = game.platform || game.selected_platform;

  const timeToBeat = game.howLongToBeat || game.rawgPlaytime || game.average_playtime;

  const rating = game.rating || game.rawgRating;
 
  
  
  
  
  return (
    <Link to={`/dashboard/games/${game.id}`}>
      <article className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl transition hover:-translate-y-1 hover:bg-white/10 ">
        {onRemove && (
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onRemove(game.id);
            }}
            aria-label="Remove game"
            title="Remove game"
            className="absolute right-3 top-3 z-10 rounded-full border border-red-500/20 bg-black/60 p-2 text-red-300 backdrop-blur transition hover:bg-red-500/20 hover:text-red-200"
          >
            <Trash2 size={18} />
          </button>
        )}

        <div className="h-56 overflow-hidden rounded-xl bg-black/30 sm:h-60">
          {coverImage ? (
            <img
              src={coverImage}
              alt={game.coverAlt || `${title} cover art`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center border border-white/10 bg-white/5 text-sm text-white/40">
              No cover available
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-semibold text-white">{title}</h2>

              <div className="mt-1 flex items-center gap-2 text-white/50">
                <span className="shrink-0 text-lg">
                  {getPlatformIcon(platform)}
                </span>
                <span className="min-w-0 truncate text-sm">
                  {platform || "No platform"}
                </span>
              </div>
            </div>

            <span className="shrink-0 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
              {game.status}
            </span>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-xl bg-black/20 p-3">
              <p className="text-white/40">Time to Beat</p>
              <p className="mt-1 font-semibold text-white">
                {timeToBeat ? `${timeToBeat}h` : "N/A"}
              </p>
            </div>

            <div className="rounded-xl bg-black/20 p-3">
              <p className="text-white/40">Rating</p>
              <p className="mt-1 font-semibold text-white">
                {rating ? `${rating}/5` : "Not rated"}
              </p>
            </div>
          </div>

          <p className="mt-4 line-clamp-2 text-sm text-white/50">
            {game.notes || "No notes added yet."}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default GameCard;
