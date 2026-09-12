import { useState, useEffect } from "react";
import { fetchUserSteamGames, enrichSteamGameData } from "../api/steamApi";

import MainLayout from "../components/layout/MainLayout";
const SteamImport = () => {
  const [vanityName, setVanityName] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGameIds, setSelectedGameIds] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completedGames, setCompletedGames] = useState([]);
  const [step, setStep] = useState("selection");
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
          setCompletedGames={setCompletedGames}
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

const SteamPreviewScreen = ({ completedGames, onBack, setCompletedGames }) => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="
          mb-6 inline-flex items-center gap-2
          rounded-lg px-3 py-2
          text-sm font-medium text-muted
          transition
          hover:bg-white/5 hover:text-foreground
        "
      >
        <span>←</span>
        Back to selection
      </button>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Review your games
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            We matched your Steam games with game metadata. Review everything
            below before adding them to your backlog.
          </p>
        </div>

        <div className="shrink-0 rounded-xl border border-border bg-card px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Games selected
          </p>

          <p className="mt-1 text-2xl font-bold text-foreground">
            {completedGames.length}
          </p>
        </div>
      </div>

      <DisplayPreview completedGames={completedGames} setCompletedGames={setCompletedGames}/>
    </div>
  );
};

const DisplayPreview = ({ completedGames, setCompletedGames }) => {
  const [gameToChange, setGameToChange] = useState(null);

 const handleGameChange = (selectedGame) => {
   const newCompletedGames = completedGames.map((game) => {
     return game.steamAppId === gameToChange.steamAppId
       ? {
           ...game,
           ...selectedGame,
           steamAppId: game.steamAppId,
         }
       : game;
   });

   setCompletedGames(newCompletedGames);
 };

  return (
    <section>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {completedGames.map((game) => {
          const {
            steamAppId,
            rawgId,
            title,
            coverImage,
            coverAlt,
            released,
            rawgRating,
            genres,
            platforms,
          } = game;

          return (
            <article
              key={steamAppId}
              className="
                  group overflow-hidden rounded-2xl
                  border border-border bg-card
                  shadow-lg
                  transition duration-200
                  hover:-translate-y-1
                  hover:border-primary/40
                  hover:shadow-xl
                "
            >
              {/* Artwork */}
              <div className="relative aspect-video overflow-hidden bg-background">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={coverAlt}
                    className="
                        h-full w-full object-cover
                        transition duration-300
                        group-hover:scale-[1.03]
                      "
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted">
                    No artwork available
                  </div>
                )}

                {/* Steam badge */}
                <span
                  className="
                      absolute right-3 top-3
                      rounded-full border border-white/10
                      bg-black/70 px-2.5 py-1
                      text-xs font-medium text-white
                      backdrop-blur
                    "
                >
                  Steam
                </span>

                {/* Gradient over bottom of artwork */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="line-clamp-2 text-lg font-bold text-foreground">
                  {title}
                </h2>
                {/* Basic metadata */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background/50 p-3">
                    <p className="text-xs text-muted">RAWG Rating</p>

                    <p className="mt-1 font-semibold text-foreground">
                      ⭐ {rawgRating ?? "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background/50 p-3">
                    <p className="text-xs text-muted">Released</p>

                    <p className="mt-1 truncate font-semibold text-foreground">
                      {released || "Unknown"}
                    </p>
                  </div>
                </div>
                {/* Genres */}
                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                    Genres
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {genres?.length > 0 ? (
                      genres.map((genre) => (
                        <span
                          key={genre}
                          className="
                              rounded-full
                              bg-primary/10 px-2.5 py-1
                              text-xs font-medium text-primary
                            "
                        >
                          {genre}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-muted">Unknown</span>
                    )}
                  </div>
                </div>
                {/* Platforms */}
                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                    Platforms
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {platforms?.length > 0 ? (
                      platforms.map((platform) => (
                        <span
                          key={platform}
                          className="
                              rounded-lg border border-border
                              px-2.5 py-1
                              text-xs text-muted
                            "
                        >
                          {platform}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-muted">Unknown</span>
                    )}
                  </div>
                </div>
                {/* Match verification */}
                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-muted">Not the right game?</p>
                    <button
                      type="button"
                      className="
                        rounded-xl border border-border
                        px-4 py-2.5
                        text-sm font-medium text-foreground
                        transition
                        hover:bg-white/5
                        "
                      onClick={() => setGameToChange(game)}
                    >
                      Change Match
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {gameToChange && (
          <ChangeGameModal
            onClose={() => setGameToChange(null)}
            gameToChange={gameToChange}
            onSelect={handleGameChange}
          />
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

const ChangeGameModal = ({ onClose, gameToChange, onSelect}) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchTerm, setSearchTerm] = useState(gameToChange.title);
  const [gamesFromSearch, setGamesFromSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `${API_URL}/api/rawg/search?query=${encodeURIComponent(searchTerm)}&page_size=5`,
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setGamesFromSearch(data);
      
    } catch (error) {
      console.error("Failed to search games:", error);
      setGamesFromSearch([]);
      setError(`Error searching for this game: ${error.message}`)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Change Game Match
            </h2>

            <p className="mt-1 text-sm text-muted">
              Search for the correct game below.
            </p>
          </div>

          <button
            type="button"
            className="
              rounded-lg px-3 py-2
              text-muted transition
              hover:bg-white/5
              hover:text-foreground
            "
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search for a game..."
            className="
              flex-1 rounded-xl
              border border-border
              bg-background px-4 py-3
              text-sm text-foreground
              outline-none
              placeholder:text-muted
              focus:border-primary
            "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="button"
            className="
              rounded-xl bg-primary
              px-5 py-3
              text-sm font-semibold text-white
              transition hover:opacity-90
            "
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Results */}
        <p className="mb-3 text-sm font-medium text-muted">Search Results</p>

        
        {isLoading ? <h1>loading...</h1> : gamesFromSearch.map((game) => {
          const { title, rawgId, coverImage, released, coverAlt } = game;

          return (
            
              <div className="space-y-3"
              key={rawgId}>
                <div
                  className="
                flex items-center gap-4
                rounded-xl border border-border
                bg-background p-3
              "
                >
                  <img
                    src={coverImage}
                    alt={coverAlt}
                    className="h-20 w-14 rounded-lg bg-white/10 object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{title}</h3>

                    <p className="mt-1 text-sm text-muted">{released}</p>
                  </div>

                  <button
                    type="button"
                    className="
                  rounded-lg border border-border
                  px-4 py-2
                  text-sm font-medium text-foreground
                  transition hover:bg-white/5
                "
                onClick={() => {
                  onSelect(game);
                  onClose();
                }}
                  >
                    Select
                  </button>
                </div>
              </div>
            
          );
        })}

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default SteamImport;
