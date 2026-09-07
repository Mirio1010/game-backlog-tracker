const API_KEY = process.env.STEAM_API_KEY;

const getSteamId = async (vanityName) => {
  try {
    const url =
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/` +
      `?key=${API_KEY}&vanityurl=${vanityName}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Steam API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.response.steamid;
  } catch (error) {
      console.error("Error getting Steam ID:", error);
      throw error;
  }
};



const getOwnedGames = async (steamId) => {
  try {
     const url =
       `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/` +
       `?key=${API_KEY}` +
       `&steamid=${steamId}` +
       `&include_appinfo=true`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error getting owned games: ${response.status}`);
    }


    const data = await response.json();
    return data.response.games;

  } catch (error) {
    console.error(`Error getting owned games: ${error}`);
    throw error;
    
  }
};