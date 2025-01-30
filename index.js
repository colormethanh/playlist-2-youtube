const SpotifyApiClient = require("./clients/spotifyApiClient");
const YoutubeApiClient = require("./clients/youtubeApiClient");
const YtDlClient = require('./clients/ytDlClient.js');
const startServer = require("./server");

require("dotenv").config();
const client_id = process.env.SP_CLIENT_ID;
const client_secret = process.env.SP_CLIENT_SECRET;
const YT_API_KEY = process.env.YT_API_KEY;
const port = process.env.PORT || 3005;

const spotifyApiClient = new SpotifyApiClient(client_id, client_secret);
const youtubeApiClient = new YoutubeApiClient(YT_API_KEY);
const youtubeDlClient = new YtDlClient();

console.log("Starting server");
const server = startServer(spotifyApiClient, youtubeApiClient, youtubeDlClient);

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
