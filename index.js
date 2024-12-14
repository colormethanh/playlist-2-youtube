require("dotenv").config();
const express = require("express");
const SpotifyClient = require("./spotifyApiClient");
const StartServer = require("./server");
const startServer = require("./server");
const client_id = process.env.SP_CLIENT_ID;
const client_secret = process.env.SP_CLIENT_SECRET;
const port = process.env.PORT || 3000;

const spotifyClient = new SpotifyClient(client_id, client_secret);

console.log("Starting server");
const server = startServer(spotifyClient);
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
