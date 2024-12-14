require("dotenv").config();
const youtubeApiClient = require("./youtubeApiClient");

const ytClient = new youtubeApiClient(process.env.YT_API_KEY);

const testClient = async () => {
  console.log(await ytClient.searchVideos("Bruno Mars"));
};

testClient();
