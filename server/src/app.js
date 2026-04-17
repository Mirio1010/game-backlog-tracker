// imports express package to your app
const express = require("express"); 

/*
This app variable is now your backedn app. It is the thing that will hold:
 - routes
 - middleware
 - settings
*/
const app = express(); 

app.use(express.json()) // middleware that allows express to parse JSON so it can be used in req.body


app.get("/", (req, res) => {
  res.send("Backend is running");
});


module.exports = app; // Allows app to be exported to server.js in order to start the server.