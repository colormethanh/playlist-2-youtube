"use client";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useServer() {
  async function getPlaylistData(spotifyId) {
    try {
      const requestUrl = `${BASE_URL}/playlist?q=${spotifyId}`;
      const response = await fetch(requestUrl);
      const json = await response.json();
      return { data: json, error: { hasError: false, error: {} } };
    } catch (error) {
      return { data: [], error: { hasError: true, error: error } };
    }
  }

  return { getPlaylistData };
}
