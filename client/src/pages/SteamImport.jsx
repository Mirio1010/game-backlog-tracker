import { useState } from "react";
import { fetchUserSteamGames, enrichSteamGameData } from "../api/steamApi";
import MainLayout from '../components/layout/MainLayout'
const SteamImport = () => {
  const [vanityName, setVanityName] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGameIds, setSelectedGameIds] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completedGames, setCompletedGames] = useState([]);
  const [step, setStep] = useState('selection')
  const [isImporting, setIsImporting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setGames([]);
    setSelectedGameIds([]);
    try {
      const data = await fetchUserSteamGames(vanityName);
      setGames(data);
    } catch (error) {
      console.error(`Error fetching this user's games: ${error}`);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleGame = (steamAppId) => {
    setSelectedGameIds((previousIds) => {
      if (previousIds.includes(steamAppId)) {
        return previousIds.filter((id) => id !== steamAppId);
      } else {
        return [...previousIds, steamAppId];
      }
    });
  };

  const handleImport = async () => {
    if (selectedGameIds.length === 0) {
      setError("Select at least one game to continue.");
      return;
    }

    const selected = getSelectedGames(selectedGameIds, games);
    const backendData = createBackendPayload(selected);

    setError(null);
    setIsImporting(true);

    try {
      const res = await enrichSteamGameData({
        games: backendData,
      });

      setCompletedGames(res.games);
      setStep("preview");
    } catch (error) {
      console.error("Error enriching Steam games:", error);
      setError(error.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <MainLayout>
      {step === "preview" ? (
        <SteamPreviewScreen
          completedGames={completedGames}
          onBack={() => setStep("selection")}
        />
      ) : (
        <SteamSelectionScreen
          handleSubmit={handleSubmit}
          setVanityName={setVanityName}
          vanityName={vanityName}
          games={games}
          toggleGame={toggleGame}
          selectedGameIds={selectedGameIds}
          isLoading={isLoading}
          isImporting={isImporting}
          error={error}
          handleImport={handleImport}
        />
      )}
    </MainLayout>
  );
};

const SteamSelectionScreen = ({
  handleSubmit,
  setVanityName,
  vanityName,
  games,
  toggleGame,
  selectedGameIds,
  isLoading,
  error,
  handleImport,
  isImporting,
}) => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Import Steam Library
        </h1>

        <p className="mt-2 text-sm text-muted sm:text-base">
          Enter your Steam vanity name and choose the games you want to add to
          your backlog.
        </p>
      </div>

      {/* Steam account form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          value={vanityName}
          onChange={(e) => setVanityName(e.target.value)}
          placeholder="Steam vanity name"
          className="
            w-full flex-1 rounded-xl
            border border-border
            bg-card px-4 py-3
            text-foreground
            outline-none
            transition
            placeholder:text-muted
            focus:border-primary
            focus:ring-2 focus:ring-primary/20
          "
        />

        <button
          type="submit"
          disabled={isLoading || !vanityName.trim()}
          className="
            rounded-xl bg-primary
            px-6 py-3
            font-semibold text-white
            transition
            hover:opacity-90
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isLoading ? "Loading..." : "Get Library"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Library */}
      {games.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {/* Library header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-semibold text-foreground">
                Your Steam Library
              </h2>

              <p className="mt-0.5 text-sm text-muted">
                {games.length} games found
              </p>
            </div>

            <span className="text-sm font-medium text-primary">
              {selectedGameIds.length} selected
            </span>
          </div>

          {/* Games */}
          <div className="max-h-[600px] overflow-y-auto p-3">
            <GameList
              games={games}
              toggleGame={toggleGame}
              selectedGameIds={selectedGameIds}
            />
          </div>

          {/* Import footer */}
          <div className="flex items-center justify-between border-t border-border px-5 py-4">
            <p className="text-sm text-muted">
              {selectedGameIds.length === 0
                ? "Select games to continue"
                : `${selectedGameIds.length} game${
                    selectedGameIds.length === 1 ? "" : "s"
                  } ready to import`}
            </p>

            <button
              type="button"
              onClick={handleImport}
              disabled={isImporting || selectedGameIds.length === 0}
              className="
                rounded-xl bg-primary
                px-5 py-2.5
                font-semibold text-white
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isImporting ? "Importing..." : "Import Games"}
            </button>
          </div>
        </div>
      )}

      {/* Initial loading state */}
      {isLoading && games.length === 0 && (
        <div className="rounded-2xl border border-border bg-card py-16 text-center text-muted">
          Loading your Steam library...
        </div>
      )}
    </div>
  );
};


const SteamPreviewScreen = ({completedGames, onBack}) => {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
      >
        Back
      </button>

      <DisplayPreview completedGames={completedGames} />
    </div>
  );
}

const DisplayPreview = ({ completedGames }) => {
  return (
    <section className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Review your games</h2>

        <p className="mt-1 text-sm text-zinc-400">
          Make sure the game information looks correct before importing.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {completedGames.map(
          ({
            steamAppId,
            rawgId,
            title,
            coverImage,
            coverAlt,
            released,
            rawgRating,
            genres,
            platforms,
          }) => {
            return (
              <article
                key={steamAppId}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
              >
                {/* Cover */}
                <div className="aspect-[16/9] overflow-hidden bg-zinc-800">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={coverAlt}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                      No artwork available
                    </div>
                  )}
                </div>

                {/* Game information */}
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">
                      {title}
                    </h3>

                    <span className="shrink-0 rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-400">
                      Steam
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">RAWG Rating</span>

                      <span className="font-medium text-white">
                        ⭐ {rawgRating ?? "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-500">Released</span>

                      <span className="text-zinc-300">
                        {released || "Unknown"}
                      </span>
                    </div>

                    {/* Genres */}
                    <div>
                      <p className="mb-2 text-zinc-500">Genres</p>

                      <div className="flex flex-wrap gap-2">
                        {genres?.length > 0 ? (
                          genres.map((genre) => (
                            <span
                              key={genre}
                              className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                            >
                              {genre}
                            </span>
                          ))
                        ) : (
                          <span className="text-zinc-500">Unknown</span>
                        )}
                      </div>
                    </div>

                    {/* Platforms */}
                    <div>
                      <p className="mb-2 text-zinc-500">Platforms</p>

                      <div className="flex flex-wrap gap-2">
                        {platforms?.length > 0 ? (
                          platforms.map((platform) => (
                            <span
                              key={platform}
                              className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-400"
                            >
                              {platform}
                            </span>
                          ))
                        ) : (
                          <span className="text-zinc-500">Unknown</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Match controls */}
                  <div className="mt-5 border-t border-zinc-800 pt-4">
                    <p className="mb-3 text-xs text-zinc-500">
                      Does this match your Steam game?
                    </p>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex-1 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
                      >
                        Looks Correct
                      </button>

                      <button
                        type="button"
                        className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-zinc-600">
                    RAWG ID: {rawgId}
                  </p>
                </div>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
};

const GameList = ({ games, toggleGame, selectedGameIds }) => {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {games.map(({ steamAppId, title, iconHash }) => {
        const isSelected = selectedGameIds.includes(steamAppId);

        const iconUrl = iconHash
          ? `https://media.steampowered.com/steamcommunity/public/images/apps/${steamAppId}/${iconHash}.jpg`
          : null;

        return (
          <button
            type="button"
            key={steamAppId}
            onClick={() => toggleGame(steamAppId)}
            className={`
              flex w-full items-center gap-3
              rounded-xl border p-3
              text-left transition

              ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-transparent hover:border-border hover:bg-white/5"
              }
            `}
          >
            {/* Game icon */}
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-background">
              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted">
                  {title.charAt(0)}
                </div>
              )}
            </div>

            {/* Game title */}
            <span className="min-w-0 flex-1 truncate font-medium text-foreground">
              {title}
            </span>

            {/* Selection indicator */}
            <div
              className={`
                flex h-5 w-5 shrink-0 items-center justify-center
                rounded-full border transition

                ${isSelected ? "border-primary bg-primary" : "border-muted"}
              `}
            >
              {isSelected && (
                <span className="text-xs font-bold text-white">✓</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

const getSelectedGames = (selectedGameIds, games) => {
  const userSelectedGames = games.filter((game) =>
    selectedGameIds.includes(game.steamAppId),
  );

  return userSelectedGames;
};

const createBackendPayload = (selectedGames) => {
  const backendData = selectedGames.map((game) => {
    return {
      steamAppId: game.steamAppId,
      title: game.title,
    };
  });

  return backendData;
};

export default SteamImport;
