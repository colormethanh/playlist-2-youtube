require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

function startServer(spotifyApiClient, youtubeApiClient) {
  app.use(express.json());

  const corsOptions = {
    origin: [process.env.ALLOWED_ORIGIN_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
    sameSite: "None",
  };
  app.use(cors(corsOptions));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get("/playlist", async (req, res) => {
    try {
      const playlistId = req.query.q;

      if (!playlistId)
        return res.status(400).send("Token and playlist id are required");

      console.log("Requesting data from spotify");
      const playlistData = await spotifyApiClient.getPlaylist(playlistId);

      res.send(playlistData);
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

  return app;
}

module.exports = startServer;
