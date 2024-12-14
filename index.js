require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

async function getData(id, token) {
  const baseUrl = "https://api.spotify.com/v1/playlists/";

  console.log("Assembling URL");
  const requestUrl = baseUrl + id;

  try {
    const response = await fetch(requestUrl, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json?.tracks?.items.length);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

app.use(express.json());

// https://open.spotify.com/playlist/37i9dQZF1EVHGWrwldPRtj?si=2ec4f27298944e33
app.get("/playlist/:token", async (req, res) => {
  const { token } = req.params;
  const playlistId = req.query.q;

  if (!token || !playlistId)
    return res.status(200).send("Token and playlist id could are required");

  console.log(`Retrieved \ntoken: ${token} \nplaylistId: ${playlistId}`);

  console.log("Requesting data from spotify");
  const data = await getData(playlistId, token);

  res.send(data);
});

app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
