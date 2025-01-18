"use client";
import { use, useState } from "react";

import Divider from "@mui/material/Divider";

import { validateSpotifyURL } from "./util/validations";
import { extractSpotifyIdFromUrl } from "./util/parsers";
import useServer from "./hooks/useServer";
import SpotifySearchBar from "./components/SpotifySearchBar";
import PlaylistSearchResultItem from "./components/PlaylistSearchResultItem";


export default function Home() {
  const [playlist, setPlaylist] = useState({});
  const [searchInputError, setSearchInputError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const { getPlaylistData, isLoading, setIsLoading, status } = useServer(
    (message) => {
      setHelperText(message);
    }
  );

  const handleSearchRequest = async (searchQuery) => {
    const queryValid = validateSpotifyURL(searchQuery);

    if (!queryValid) {
      setSearchInputError(true);
      setHelperText("Input must be a valid spotify URL");
      setIsLoading(false);
      return;
    }

    const spotifyId = extractSpotifyIdFromUrl(searchQuery);
    const playlistData = await getPlaylistData(spotifyId);

    if (playlistData.error.hasError) {
      setHelperText(
        `Error Occurred when searching for playlist: ${playlistData.error.statusCode} - ${playlistData.error.message}`
      );
      setSearchInputError(true);
      return;
    }
    setPlaylist(playlistData.data);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto">
      <main>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="p-4 h-[90vh] border rounded-lg py-3">
            <div className="flex flex-col gap-4 px-4">
              <h1 className="text-2xl">Search for Spotify Playlist</h1>
              <SpotifySearchBar
                setHelperText={setHelperText}
                helperText={helperText}
                onSubmit={handleSearchRequest}
              />
              <Divider />
            </div>
            <div className="flex flex-col h-4/5 px-4 py-3">
              <h1 className="text-xl underline underline-offset-3">
                Retrieved Songs from Spotify
              </h1>
              <div className="overflow-y-auto md:w-[25vw]">
                {playlist?.tracks &&
                  playlist.tracks.map((song, i) => {
                    return (
                      <PlaylistSearchResultItem key={song.track.id} thumbnailSrc={song.track.album.images[0].url} trackName={song.track.name} trackArtist={song?.track.artists[0].name}/>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="w-[20vw] h-[90vh] border rounded-lg"></div>
        </div>
      </main>
    </div>
  );
}
