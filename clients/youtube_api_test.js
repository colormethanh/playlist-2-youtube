require("dotenv").config({path: "../.env"});
const youtubeApiClient = require("./youtubeApiClient");

console.log(process.env.YT_API_KEY)
const ytClient = new youtubeApiClient(process.env.YT_API_KEY);

const testClient = async () => {
  // console.log(await ytClient.searchVideos("Bruno Mars"));
  const video = await ytClient.searchVideos("Bruno Mars");

  console.log(video.items[0].snippet)
};

testClient();
