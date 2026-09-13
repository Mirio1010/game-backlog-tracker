const supabase = require("../config/supabaseClient");

const saveGame = async (req, res) => {
  try {
    const game = req.body;

    if (!game.rawg_id || !game.title) {
      return res.status(400).json({
        message: "Game must include rawg_id and title",
      });
    }

    const { data, error } = await supabase
      .from("saved_games")
      .insert({
        user_id: req.user.id,

        rawg_id: game.rawg_id,
        title: game.title,
        cover_image: game.cover_image,
        released: game.released,
        rating: game.rating,

        genres: game.genres,
        platforms: game.platforms,

        status: game.status || "Backlog",
        selected_platform: game.selected_platform,
        notes: game.notes || "",
        average_playtime: game.average_playtime || 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving game:", error);

      return res.status(500).json({
        message: "Error saving game",
        error: error.message,
      });
    }

    res.status(201).json({
      message: "Game saved successfully",
      game: data,
    });
  } catch (error) {
    console.error("Save game server error:", error);

    res.status(500).json({
      message: "Server error while saving game",
    });
  }
};

const getMyGames = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("saved_games")
      .select("*")
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching games:", error);
      return res.status(500).json({
        message: "Error fetching games",
        error: error.message,
      });
    }

    res.status(200).json({
      message: "Games fetched successfully",
      games: data,
    });
  } catch (error) {
    console.error("Fetch games server error:", error);
    res.status(500).json({
      message: "Server error while fetching games",
    });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("saved_games")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error deleting game:", error);

      return res.status(500).json({
        message: "Error deleting game",
      });
    }

    if (!data) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    res.status(200).json({
      message: "Game deleted successfully",
      game: data,
    });
  } catch (error) {
    console.error("Delete game server error:", error);

    res.status(500).json({
      message: "Server error while deleting game",
    });
  }
};


const importSteamGames = async (req, res) => {
  try {
    const games = req.body;


     const { data: existingGames, error: fetchError } = await supabase
       .from("saved_games")
       .select("rawg_id")
       .eq("user_id", req.user.id);

     const existingRawgIds = new Set(existingGames.map((game) => game.rawg_id));

     const filteredGames = games.filter(
       (game) => !existingRawgIds.has(game.rawgId),
     );

     if (filteredGames.length === 0) {
      return res.status(500).json({
        message: 'These games are already in your backlog!',
        games: []
      })
     }


    const gamesToInsert = filteredGames.map((game) => ({
      user_id: req.user.id,
      rawg_id: game.rawgId,
      title: game.title,
      cover_image: game.coverImage,
      released: game.released,
      rating: game.rawgRating,
      genres: game.genres,
      platforms: game.platforms,
      status: game.status || "Backlog",
      selected_platform: game.selected_platform,
      notes: game.notes || "",
      average_playtime: game.rawgPlaytime || 0,
    }));

    const { data, error } = await supabase
      .from("saved_games")
      .insert(gamesToInsert)
      .select();

    // handle error + response

    if (error) {
      console.error("Error importing games:", error);

      return res.status(500).json({
        message: "Error importing games",
      });
    }

    res.status(201).json({
      message: "Games imported successfully",
      games: data,
    });

  } catch (error) {
    // server error

     console.error("Importing games server error:", error);

     res.status(500).json({
       message: "Server error while importing games",
     });
  }
};

module.exports = {
  saveGame,
  getMyGames,
  deleteGame,
  importSteamGames,
};
