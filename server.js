require("dotenv").config({path: "../.env"});
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");

const app = express();
const TEMP_DIR = "/tmp";

function startServer(spotifyApiClient, youtubeApiClient, youtubeDlClient) {
  app.use("/files", express.static(path.join(__dirname,"/clients/download")))

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

  app.get("/song", async (req, res) => {
    try {
      const searchURL = req.query.url;
      console.log(searchURL)
      if (!searchURL) return res.status(400).send("search query required");

      console.log("Requesting download from youtube");
      const fileName = await youtubeDlClient.downloadVideo("https://www.youtube.com/watch?v=kPa7bsKwL-c");

       // Auto-delete file after 10 minutes
        // setTimeout(() => {
        //   const filePath = path.join(TEMP_DIR, fileName);
        //   if (fs.existsSync(filePath)) {
        //     fs.unlinkSync(filePath);
        //     console.log(`Deleted file: ${filePath}`);
        //   }
        // }, 10 * 60 * 1000); // 10 minutes
      
      console.log(fileName);
      res.json({downloadUrl: `http://localhost:3005/files/${fileName}`})
    } catch (error) {
      return res.status(500).send(`Server Error: ${error}`);
    }
  })

  app.get("/files/:filename", (req, res) => {
    const filePath = path.join(TEMP_DIR, req.params.filename);

    if (fs.existsSync(filePath)) {
      res.download(filePath, (err) => {
        if (err) console.error("Error sending file:", err);
      });
    } else {
      res.status(404).json({ error: "File not found or expired" });
    }
  })

  return app;
}

module.exports = startServer;
