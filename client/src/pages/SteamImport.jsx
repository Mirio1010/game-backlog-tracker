import { useState } from "react";
import { fetchUserSteamGames } from "../api/steamApi";

const SteamImport = () => {
  const [vanityName, setVanityName] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGameIds, setSelectedGameIds] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
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
  }

  const toggleGame = (steamAppId) => {
    setSelectedGameIds((previousIds) => {
      if (previousIds.includes(steamAppId)) {
        return previousIds.filter((id) => id !== steamAppId);
      } else {
        return [...previousIds, steamAppId];
      }
    });
  };

  return (
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


      {games.length > 0 && (
  <button onClick={() => console.log(getSelectedGames(selectedGameIds, games))
  }>Import Games</button>
)}
    </div>
  );
};

const GameList = ({ games, toggleGame, selectedGameIds }) => {
  return games.map(({ steamAppId, title }) => {
    return (
      <li key={steamAppId}>
        {title}
        <input type="checkbox" onChange={() => toggleGame(steamAppId)} 
        checked={selectedGameIds.includes(steamAppId)}/>
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





export default SteamImport;
