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
        hours_played: game.hours_played || 0,
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

module.exports = {
  saveGame,
  getMyGames,
};
