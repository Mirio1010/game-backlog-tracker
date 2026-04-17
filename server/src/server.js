// This file Runs the app

const app = require('./app'); // This imports the Express app from app.js

/*
This stores the port number your backend will run on.
A port is like a door your server listens on.
*/
const PORT = 5000; 


/*
This starts the server!
app.listen() tells Express: "Start listening for incoming requests on this port".
The function inside runs once the server starts successfully.
*/
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});

