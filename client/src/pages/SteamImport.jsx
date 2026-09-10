import { useState } from "react";
import { fetchUserSteamGames } from "../api/steamApi";

const SteamImport = () => {
  const [vanityName, setVanityName] = useState("");
  const [games, setGames] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    setIsLoading(true);
    setGames([]);
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
        <ul>
          <GameList games={games} />
        </ul>
      )}

      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

const GameList = ({games}) => {
    return games.map(({steamAppId, title}) => {
        return <li key={steamAppId}>{title}</li>
    })
}



export default SteamImport;
