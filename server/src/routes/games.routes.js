const express = require("express");
const protect = require("../middleware/auth.middleware");
const { saveGame, getMyGames } = require("../controllers/games.controller");

const router = express.Router();

router.post("/", protect, saveGame);
router.get("/", protect, getMyGames);

module.exports = router;
