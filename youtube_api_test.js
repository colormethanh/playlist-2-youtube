const youtubeApiClient = require("./youtubeApiClient");

const ytClient = new youtubeApiClient(
  "AIzaSyA14EBa0SvxoxfXFkP_1m7iIrzu3dI2qTM"
);

const testClient = async () => {
  console.log(await ytClient.searchVideos("Bruno Mars"));
};

testClient();
