const express = require("express");

const router = express.Router();

const {
  getSteamLibrary,
  enrichGameData,
} = require("../controllers/steamController");


router.get("/library", getSteamLibrary);

// Route for the enrichment process

router.post('/enrich-games', enrichGameData)

module.exports = router;