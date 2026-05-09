const express = require("express");

const router = express.Router();

// GET /api/rawg/search?query=elden
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    res.json({
      message: "RAWG search route is working",
      searchTerm: query,
    });
  } catch (error) {
    console.error("RAWG search error:", error);
    res.status(500).json({ message: "Something went wrong searching games" });
  }
});

module.exports = router;