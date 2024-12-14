const SpotifyClient = require("./spotifyApiClient");
require("dotenv").config();
const client_id = process.env.SP_CLIENT_ID;
const client_secret = process.env.SP_CLIENT_SECRET;
console.log("clientid", client_id);
console.log("clientSecret", client_secret);

const client = new SpotifyClient(client_id, client_secret);

client.refreshAccessToken();
