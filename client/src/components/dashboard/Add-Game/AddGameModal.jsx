import { useState } from "react";

const platforms = [
  "PC",
  "Steam",
  "PlayStation 5",
  "PlayStation 4",
  "Xbox Series X/S",
  "Xbox One",
  "Nintendo Switch",
  "Nintendo Switch 2",
  "Steam Deck",
  "Mobile",
  "Other",
];

const statuses = ["Backlog", "Playing", "Completed", "Dropped"];

const AddGameModal = ({ game, onClose, onSaveGame }) => {
  const [status, setStatus] = useState("Backlog");
  const [platform, setPlatform] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const genreText = Array.isArray(game.genres)
    ? game.genres.slice(0, 2).join(", ")
    : game.genre || "Genre unknown";

  const timeToBeat = game.howLongToBeat || game.rawgPlaytime;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const gameToAdd = {
      rawg_id: game.rawg_id || game.rawgId || game.id,
      title: game.title || game.name,
      cover_image: game.cover_image || game.coverImage || game.background_image,
      released: game.released || null,
      rating: game.rating ?? game.rawgRating ?? null,

      genres: game.genres || [],
      platforms: game.platforms || [],

      status,
      selected_platform: platform,
      notes,
      average_playtime:
        game.average_playtime || game.rawgPlaytime || game.playtime || 0,
    };

    try {
      setIsSaving(true);
      await onSaveGame(gameToAdd);
    } catch (error) {
      console.error("Error saving game:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const displayTitle = game.title || game.name;
  const displayCover =
    game.coverImage || game.cover_image || game.background_image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/70 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-full w-full max-w-lg rounded-2xl border border-border bg-card p-4 text-foreground shadow-2xl backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Add to Backlog</h2>
            <p className="mt-1 text-sm text-muted">{displayTitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-muted transition hover:bg-surface hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="mb-5 flex flex-col gap-4 rounded-xl bg-surface p-3 sm:flex-row">
          <img
            src={displayCover}
            alt={game.coverAlt || `${displayTitle} cover art`}
            className="h-32 w-full rounded-lg object-contain sm:h-24 sm:w-20"
          />

          <div className="min-w-0">
            <h3 className="font-semibold text-foreground">{displayTitle}</h3>
            <p className="text-sm text-muted">{genreText}</p>
            <p className="text-sm text-muted">
              Time to Beat: {timeToBeat ? `${timeToBeat}h` : "N/A"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted">
              Status
            </label>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none backdrop-blur-md focus:border-primary"
            >
              {statuses.map((status) => (
                <option
                  className="bg-surface text-foreground"
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-muted">
              Platform
            </label>

            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
              required
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none backdrop-blur-md focus:border-primary"
            >
              <option className="bg-surface text-foreground" value="">
                Select a platform
              </option>

              {platforms.map((platform) => (
                <option
                  className="bg-surface text-foreground"
                  key={platform}
                  value={platform}
                >
                  {platform}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-muted">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add personal notes about this game..."
              rows="4"
              className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none placeholder:text-muted backdrop-blur-md focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Game"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGameModal;
