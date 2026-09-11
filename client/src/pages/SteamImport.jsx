import { useState } from "react";
import { fetchUserSteamGames, enrichSteamGameData } from "../api/steamApi";

const SteamImport = () => {
  const [vanityName, setVanityName] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGameIds, setSelectedGameIds] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completedGames, setCompletedGames] = useState([]);
  const [step, setStep] = useState('selection')

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
    const selected = getSelectedGames(selectedGameIds, games);
    const backendData = createBackendPayLoad(selected);

    const res = await enrichSteamGameData({
      games: backendData
    });

    console.log(res.message);
    setCompletedGames(res.games);
    
    setStep('preview');

  };

  if (step === 'preview') {
    return <SteamPreviewScreen completedGames={completedGames} />
  }

  return (
   <SteamSelectionScreen handleSubmit={handleSubmit} setVanityName={setVanityName} vanityName={vanityName} games={games} toggleGame={toggleGame} selectedGameIds={selectedGameIds} isLoading={isLoading} error={error} handleImport={handleImport}/>
  );
};

const SteamSelectionScreen = ({handleSubmit, setVanityName, vanityName, games, toggleGame, selectedGameIds, isLoading, error, handleImport}) => {
  return  (
     <div style={{ color: "white" }}>
      <h1>Import Steam Library</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={vanityName}
          onChange={(e) => setVanityName(e.target.value)}
          placeholder="Steam vanity name"
        />

        <button type="submit">Get Library</button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            <GameList
              games={games}
              toggleGame={toggleGame}
              selectedGameIds={selectedGameIds}
            />
          </ul>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {games.length > 0 && <button onClick={handleImport}>Import Games</button>}

      
    </div>
  )
}


const SteamPreviewScreen = ({completedGames}) => {
  return (
    <DisplayPreview completedGames={completedGames}/>
  )
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
  return games.map(({ steamAppId, title }) => {
    return (
      <li key={steamAppId}>
        {title}
        <input
          type="checkbox"
          onChange={() => toggleGame(steamAppId)}
          checked={selectedGameIds.includes(steamAppId)}
        />
      </li>
    );
  });
};

const getSelectedGames = (selectedGameIds, games) => {
  const userSelectedGames = games.filter((game) =>
    selectedGameIds.includes(game.steamAppId),
  );

  return userSelectedGames;
};

const createBackendPayLoad = (selectedGames) => {
  const backendData = selectedGames.map((game) => {
    return {
      steamAppId: game.steamAppId,
      title: game.title,
    };
  });

  return backendData;
};

export default SteamImport;
