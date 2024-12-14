require("dotenv").config();
const express = require("express");

const app = express();

function startServer(spotifyApiClient, youtubeApiClient) {
  app.use(express.json());

  app.get("/playlist", async (req, res) => {
    try {
      const playlistId = req.query.q;

      if (!playlistId)
        return res.status(400).send("Token and playlist id are required");

      console.log("Requesting data from spotify");
      const playlists = await spotifyApiClient.getPlaylist(playlistId);

      res.send(playlists);
    } catch (err) {
      return res.status(500).send(`Server Error: ${error}`);
    }
  });

  app.get("/videos", async (req, res) => {
    try {
      const searchQuery = req.query.q;
      if (!searchQuery) return res.status(400).send("search query required");

      console.log("Requesting data from youtube");
      const videos = await youtubeApiClient.searchVideos(searchQuery);

      return res.send(videos);
    } catch (error) {
      return res.status(500).send(`Server Error: ${error}`);
    }
  });

  app.get("/", (req, res) => {
    res.send("Hello, world");
  });

  return app;
}

module.exports = startServer;
