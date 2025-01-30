"use client";

import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useServer({ onStatusUpdate = (message) => {} }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const updateStatus = (message) => {
    setStatus(message);
    onStatusUpdate(message);
  };

  async function getPlaylistData(spotifyId) {
    try {
      const requestUrl = `${BASE_URL}/playlist?q=${spotifyId}`;
      const response = await fetch(requestUrl);
      updateStatus(
        "Searching for your playlist...\nplease be patient while the server starts up ☺️"
      );
      if (response.status !== 200) {
        return {
          data: [],
          error: {
            hasError: true,
            statusCode: response.status,
            message: response.statusText,
          },
        };
      }
      const json = await response.json();
      return { data: json, error: { hasError: false, error: {} } };
    } catch (error) {
      return { data: [], error: { hasError: true, error: error } };
    }
  }

  async function getDownloadLink() {
    try {
      const requestUrl = `${BASE_URL}/song?url=${encodeURIComponent('https://www.youtube.com/watch?v=kPa7bsKwL-c')}`;
      console.log(requestUrl)
      const resp = await fetch(requestUrl);
      const json = await resp.json()
      debugger;
      return json.downloadUrl;
    } catch (error) {
      console.error("Error fetching download link", error)
    }
  }

  return { getPlaylistData, isLoading, setIsLoading, status, getDownloadLink };
}
