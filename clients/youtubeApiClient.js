class YoutubeApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.googleapis.com/youtube/v3";
  }

  buildURL(parameters, queryParameters) {
    console.log("Building for yt api");
    let url = this.baseUrl;

    // fill url with parameters
    parameters.forEach((parameter) => (url += `/${parameter}`));

    // fill url with parameter
    Object.keys(queryParameters).forEach((parameter, i) => {
      if (i === 0) {
        url += `?${parameter}=${queryParameters[parameter]}`;
      } else {
        url += `&${parameter}=${queryParameters[parameter]}`;
      }
    });

    return url;
  }

  async searchVideos(searchQuery) {
    console.log("Setting up request for", searchQuery);
    const parameters = ["search"];

    const queryParameters = {
      part: "snippet",
      key: this.apiKey,
      type: "video",
      q: searchQuery,
    };

    const requestUrl = this.buildURL(parameters, queryParameters);

    console.log("Requesting search query:", searchQuery);
    const response = await fetch(requestUrl);
    const json = await response.json();

    return json;
  }
}

module.exports = YoutubeApiClient;
