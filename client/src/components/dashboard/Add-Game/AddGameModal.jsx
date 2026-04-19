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

 

  const handleSubmit = (event) => {
    event.preventDefault();

    const gameToAdd = {
      ...game,
      id: crypto.randomUUID(),
      status,
      platform,
      notes,
      dateAdded: new Date().toISOString().split("T")[0],
    };

    onSaveGame(gameToAdd);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-950 p-6 text-white shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Add to Backlog</h2>
            <p className="mt-1 text-sm text-white/50">{game.title}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mb-5 flex gap-4 rounded-xl bg-white/5 p-3">
          <img
            src={game.coverImage}
            alt={game.coverAlt}
            className="h-24 w-20 rounded-lg object-contain"
          />

          <div>
            <h3 className="font-semibold text-white">{game.title}</h3>
            <p className="text-sm text-white/50">{game.genre}</p>
            <p className="text-sm text-white/50">
              Time to Beat: {game.howLongToBeat}h
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Status
            </label>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-violet-400"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Platform
            </label>

            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-violet-400"
            >
              <option value="">Select a platform</option>

              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add personal notes about this game..."
              rows="4"
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-violet-400"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
            >
              Save Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGameModal;
