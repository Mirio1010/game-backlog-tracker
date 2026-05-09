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

    res.json({
      message: "RAWG API key is loaded successfully",
      searchTerm: query,
      hasApiKey: true,
    });
  } catch (error) {
    console.error("RAWG search error:", error);

    res.status(500).json({
      message: "Something went wrong searching RAWG games",
    });
  }
});

module.exports = router;