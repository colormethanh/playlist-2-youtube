require("dotenv").config();
const express = require("express");

const app = express();

function startServer(spotifyClient) {
  app.use(express.json());

  // https://open.spotify.com/playlist/37i9dQZF1EVHGWrwldPRtj?si=2ec4f27298944e33
  app.get("/playlist", async (req, res) => {
    const playlistId = req.query.q;

    if (!playlistId)
      return res.status(200).send("Token and playlist id could are required");

    console.log("Requesting data from spotify");
    const data = await spotifyClient.getPlaylist(playlistId);

    res.send(data);
  });

  app.get("/", (req, res) => {
    res.send("Hello, world");
  });

  return app;
}

module.exports = startServer;
