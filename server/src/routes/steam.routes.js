const express = require("express");

const router = express.Router();

const { getSteamLibrary } = require("../controllers/steamController");

router.get("/library", getSteamLibrary);

module.exports = router;