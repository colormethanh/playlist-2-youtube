const YtDlClient = require('./ytDlClient.js');
const client = new YtDlClient();


async function testClient() {
  const url = await client.downloadVideo("https://www.youtube.com/watch?v=kPa7bsKwL-c");
  console.log(url);
} 

testClient();