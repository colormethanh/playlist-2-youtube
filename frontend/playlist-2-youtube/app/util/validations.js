export function validateSpotifyURL(url) {
  try {
    // Parse the URL
    const parsedUrl = new URL(url);

    // Check the hostname
    if (parsedUrl.hostname !== "open.spotify.com") {
      return false;
    }

    // Check the path contains 'playlist'
    const pathSegments = parsedUrl.pathname.split("/");
    if (!pathSegments.includes("playlist")) {
      return false;
    }

    // URL is valid
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
