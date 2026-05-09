const express = require("express");

const router = express.Router();

// GET /api/rawg/search?query=elden
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    if (!process.env.RAWG_API_KEY) {
      return res.status(500).json({
        message: "RAWG API key is missing",
      });
    }

    const rawgUrl = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=10`;

    const rawgResponse = await fetch(rawgUrl);

    if (!rawgResponse.ok) {
      return res.status(rawgResponse.status).json({
        message: "Failed to fetch games from RAWG",
      });
    }

    const rawgData = await rawgResponse.json();

    const cleanedGames = rawgData.results.map((game) => {
      return {
        rawgId: game.id,
        title: game.name,
        coverImage: game.background_image,
        coverAlt: `${game.name} cover art`,
        released: game.released,
        rawgRating: game.rating,
        rawgPlaytime: game.playtime,
        genres: game.genres.map((genre) => genre.name),
        platforms: game.platforms.map((platformData) => {
          return platformData.platform.name;
        }),
      };
    });

    res.json(cleanedGames);
  } catch (error) {
    console.error("RAWG search error:", error);

    res.status(500).json({
      message: "Something went wrong searching RAWG games",
    });
  }
});

module.exports = router;
