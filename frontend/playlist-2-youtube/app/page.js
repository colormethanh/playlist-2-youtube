"use client";
import { use, useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { validateSpotifyURL } from "./util/validations";
import { extractSpotifyIdFromUrl } from "./util/parsers";
import useServer from "./hooks/useServer";
import Grid from "@mui/material/Grid2";
import { Stack } from "@mui/system";

export default function Home() {
  const [playlist, setPlaylist] = useState({});
  const [searchInputError, setSearchInputError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { getPlaylistData } = useServer();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length < 10 && value.length > 0) {
      setSearchInputError(true);
      setHelperText("Input must be a valid spotify URL");
    } else {
      setSearchInputError(false);
      setHelperText("");
    }
  };

  const handleSearchRequest = async () => {
    setIsLoading(true);
    const queryValid = validateSpotifyURL(searchQuery);

    if (!queryValid) {
      setSearchInputError(true);
      setHelperText("Input must be a valid spotify URL");
      setIsLoading(false);
      return;
    }

    console.log("Query Valid:", searchQuery);
    const spotifyId = extractSpotifyIdFromUrl(searchQuery);

    console.log("requesting server for playlist data");
    const playlistData = await getPlaylistData(spotifyId);

    if (playlistData.error.hasError) {
      setHelperText("Error Occurred when searching for playlist");
      setSearchInputError(true);
      return;
    }

    console.log("Playlist data retrieved");
    console.log(playlistData.data);
    setPlaylist(playlistData.data);

    setIsLoading(false);
  };

  return (
    <div className="w-full h-full px-4">
      <div className="h-12"> </div>
      <main className="flex flex-col md:flex-row w-full h-full">
        <div className="w-full lg:w-2/5 p-4">
          <div className="border rounded-lg py-3">
            <div className="w-full h-[75vh] flex flex-col gap-4">
              <div className="flex h-1/4 flex-col gap-4 px-4">
                <h1 className="text-2xl">Search for Spotify Playlist</h1>

                <div className="flex w-full gap-4">
                  {/* Input Field */}
                  <div className="flex-grow">
                    <TextField
                      id="outlined-basic"
                      label="Spotify URL"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      onChange={(e) => handleInputChange(e)}
                      error={searchInputError}
                      helperText={helperText}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <IconButton
                      aria-label="delete"
                      size="medium"
                      onClick={() => handleSearchRequest()}
                    >
                      <SearchIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </div>
                <Divider />
              </div>
              <div className="flex flex-col h-3/4 px-4">
                <h1 className="text-xl underline underline-offset-3">
                  Retrieved Songs from Spotify
                </h1>
                <div className="w-full h-16"></div>
                <div className="overflow-y-auto">
                  {playlist?.tracks &&
                    playlist.tracks.map((song, i) => {
                      if (i === 0) {
                        console.log(song);
                        console.log(song.track.album.images[0].url);
                      }
                      return (
                        <div
                          key={`track-${song.track.id}`}
                          className="ps-3 my-4"
                        >
                          <div className="flex gap-4">
                            <Image
                              src={song.track.album.images[0].url}
                              height={50}
                              width={50}
                              alt="track thumbnail"
                            />
                            <div>
                              <h2> {song?.track?.name}</h2>
                              <span className="text-sm">
                                {" "}
                                {song?.track.artists[0].name}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full"></div>
      </main>
    </div>
  );
}
