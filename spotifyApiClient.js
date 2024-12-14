class SpotifyClient {
  constructor(client_id, client_secret) {
    this.clientId = client_id;
    this.clientSecret = client_secret;
    this.accessToken = undefined;
    this.tokenExpirationDate = undefined;
    this.baseURL = "https://api.spotify.com/v1/playlists/";
  }

  validateToken() {
    if (!this.accessToken || !this.tokenExpirationDate) return false;
    return Math.floor(Date.now() / 1000) < this.tokenExpirationDate;
  }

  async refreshAccessToken() {
    console.log("Requesting server for access token");

    try {
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

      if (!response.body) throw Error("request body could not be found");

      const json = await response.json();
      this.accessToken = json.access_token;

      // Take unix timestamp and calculate date of expiration
      console.log("Setting token expiration date");
      const dateOfExpiration =
        Math.floor(Date.now() / 1000) + json.expires_in - 60;
      this.tokenExpirationDate = dateOfExpiration;
      console.log("Access token refreshed");

      return "Access token refreshed";
    } catch (err) {
      console.log(err);
      return Error(err);
    }
  }

  async getPlaylist(spotifyId) {
    try {
      console.log("Validating token");
      const isValid = this.validateToken();

      if (!isValid) {
        console.log("Invalid Token, fetching new access token now");
        await this.refreshAccessToken();
      } else {
        console.log("Token is valid");
      }

      console.log("Assembling URL");
      const requestUrl = this.baseURL + spotifyId;

      // Checking if token is valid

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
      console.log("Retrieved items count: ", json?.tracks?.items.length);
      return json.tracks.items;
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = SpotifyClient;
