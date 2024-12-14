const SpotifyApiClient = require("./spotifyApiClient");
require("dotenv").config();
const client_id = process.env.SP_CLIENT_ID;
const client_secret = process.env.SP_CLIENT_SECRET;

const client = new SpotifyApiClient(client_id, client_secret);

async function testClient() {
  await client.refreshAccessToken();
  const items = await client.getPlaylist(
    "0cY8cn2ziWuFpnomQOElMq?si=bd4c1cb0dd134c5a"
  );
  console.log(items);
}
testClient();
