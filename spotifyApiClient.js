class SpotifyClient {
  constructor(client_id, client_secret) {
    this.clientId = client_id;
    this.clientSecret = client_secret;
    this.accessToken = undefined;
    this.accessTokenTimeoutTime = undefined;
    this.baseURL = "https://api.spotify.com/v1/playlists/";
  }

  async refreshAccessToken() {
    console.log("Requesting server for access token");
    const requestBody = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.clientId,
      client_secret: this.clientSecret,
    }).toString();

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    });
    console.log(response);
  }

  async getPlayList(spotifyId) {
    console.log("Assembling URL");
    const requestUrl = this.baseURL + spotifyId;

    try {
      const response = await fetch(requestUrl, {
        method: "get",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
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
}

module.exports = SpotifyClient;
