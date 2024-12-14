export function extractSpotifyIdFromUrl(url) {
  const parsed = url.split("/");
  return parsed[4];
}
