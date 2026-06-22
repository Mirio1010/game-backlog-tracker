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


// GET /api/rawg/games/:rawgId/videos
router.get("/games/:rawgId/videos", async (req, res) => {
  try {
    const { rawgId } = req.params;

    if (!rawgId) {
      return res.status(400).json({
        message: "RAWG game id is required",
      });
    }

    if (!process.env.RAWG_API_KEY) {
      return res.status(500).json({
        message: "RAWG API key is missing",
      });
    }

    const rawgUrl = `https://api.rawg.io/api/games/${rawgId}/movies?key=${process.env.RAWG_API_KEY}`;

    const rawgResponse = await fetch(rawgUrl);

    if (!rawgResponse.ok) {
      return res.status(rawgResponse.status).json({
        message: "Failed to fetch videos from RAWG",
      });
    }

    const rawgData = await rawgResponse.json();

    const cleanedVideos = rawgData.results
      .map((video) => {
        return {
          id: video.id,
          title: video.name,
          preview: video.preview,
          videoUrl: video.data?.max || video.data?.["480"],
        };
      })
      .filter((video) => video.videoUrl);

    res.json(cleanedVideos);
  } catch (error) {
    console.error("RAWG videos error:", error);

    res.status(500).json({
      message: "Something went wrong fetching RAWG videos",
    });
  }
});

// GET /api/rawg/games/:rawgId/screenshots
router.get("/games/:rawgId/screenshots", async (req, res) => {
  try {
    const { rawgId } = req.params;

    if (!rawgId) {
      return res.status(400).json({
        message: "RAWG game id is required",
      });
    }

    if (!process.env.RAWG_API_KEY) {
      return res.status(500).json({
        message: "RAWG API key is missing",
      });
    }

    const rawgUrl = `https://api.rawg.io/api/games/${rawgId}/screenshots?key=${process.env.RAWG_API_KEY}`;

    const rawgResponse = await fetch(rawgUrl);

    if (!rawgResponse.ok) {
      return res.status(rawgResponse.status).json({
        message: "Failed to fetch screenshots from RAWG",
      });
    }

    const rawgData = await rawgResponse.json();

    const cleanedScreenshots = rawgData.results
      .map((screenshot) => {
        return {
          id: screenshot.id,
          image: screenshot.image,
          width: screenshot.width,
          height: screenshot.height,
        };
      })
      .filter((screenshot) => screenshot.image);

    res.json(cleanedScreenshots);
  } catch (error) {
    console.error("RAWG screenshots error:", error);

    res.status(500).json({
      message: "Something went wrong fetching RAWG screenshots",
    });
  }
});

module.exports = router;
