const express = require("express");
const protect = require("../middleware/auth.middleware");
const { saveGame, getMyGames, deleteGame, importSteamGames } = require("../controllers/games.controller");

const router = express.Router();

router.post("/", protect, saveGame);
router.get("/", protect, getMyGames);
router.delete("/:id", protect, deleteGame);
router.post('/import', protect, importSteamGames)


module.exports = router;
