// This file builds the app

// imports express package to your app
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const rawgRoutes = require("./routes/rawg.routes");
const gamesRoutes = require("./routes/games.routes");
/*
This app variable is now your backend app. It is the thing that will hold:
 - routes
 - middleware
 - settings
*/
const app = express();



app.use(express.json()); // middleware that allows express to parse JSON so it can be used in req.body
app.use(cors());

app.get("/", (req, res) => {
  res.send("Game Backlog API is running");
});

app.use("/api/auth", authRoutes); // For any request that starts with /api/auth, use the routes from authRoutes
app.use("/api/rawg", rawgRoutes); // For any request that starts with /api/rawg, use the routes from rawgRoutes


app.use("/api/games", gamesRoutes);

module.exports = app; // Allows app to be exported to server.js in order to start the server
