const { enrichData } = require("../services/rawgService");

const API_KEY = process.env.STEAM_API_KEY;



const getSteamLibrary = async (req, res) => {
  try {
    const { vanityName } = req.query;

    if (!vanityName) {
      return res.status(400).json({
        message: "Steam vanity name is required",
      });
    }

    const steamId = await getSteamId(vanityName);

    const games = await getOwnedGames(steamId);

    const cleanedGames = cleanGames(games);

    res.status(200).json(cleanedGames);

  } catch (error) {
    console.error(`error getting library: ${error}`);
    
     return res.status(500).json({
       message: "Something went wrong fetching Steam library",
     });
  }
};


// Helper function for controller


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

    if (!data.response.steamid) {
      throw new Error("Steam profile could not be found");
    }

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



    const games = data.response.games;

    if (!games) {
      throw new Error("Steam library is unavailable or private");
    }

    return games;

  } catch (error) {
    console.error(`Error getting owned games: ${error}`);
    throw error;
    
  }
};


const cleanGames = (games) => {
    const cleanedGames = games.map((game) => {
        return {
          steamAppId: game.appid,
          title: game.name,
          playtimeMinutes: game.playtime_forever,
          lastPlayed: game.rtime_last_played,
          iconHash: game.img_icon_url
        };
    })

    return cleanedGames;
}


const enrichGameData = async (req, res) => {
  try {
    const { games } = req.body;

    if (!games) {
      return res.status(400).json({
        message: "Games are required",
      });
    }

    if (!Array.isArray(games)) {
      return res.status(400).json({
        message: "Games must be an array",
      });
    }

    if (games.length === 0) {
      return res.status(400).json({
        message: "No games selected",
      });
    }

    // Enrichment process goes here later

    

   const completedGames = await Promise.all(
     games.map(({ title, steamAppId }) => enrichData(title, steamAppId)),
   );
   
    
    
    
    
    

    return res.status(200).json({
      message: "Games received successfully",
      games: completedGames,
    });
  } catch (error) {
    console.error("Error enriching games:", error);

    return res.status(500).json({
      message: "Something went wrong while enriching games",
    });
  }
};


module.exports = {
  getSteamLibrary,
  enrichGameData
};