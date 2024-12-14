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

export default function Home() {
  const [songs, setSongs] = useState([]);
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
      searchInputError(true);
      return;
    }

    setSongs(playlistData);

    // await fetch("")
    setIsLoading(false);
  };

  return (
    <div className="w-full flex grow justify-center px-4">
      <main className="flex flex-col md:flex-row w-full">
        <div className="w-full lg:w-1/3 h-full p-4">
          <div className="border h-full rounded-lg">
            <div className="w-full flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl">Search for Spotify Playlist</h1>

                <Grid container>
                  <Grid size={10}>
                    <TextField
                      id="outlined-basic"
                      label="Spotify URL"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                      onChange={(e) => handleInputChange(e)}
                      error={searchInputError}
                      helperText={helperText}
                    />
                  </Grid>
                  <Grid size={2}>
                    <div className="flex justify-center">
                      <IconButton
                        aria-label="delete"
                        size="medium"
                        onClick={() => handleSearchRequest()}
                      >
                        <SearchIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <Divider />
              <div>
                <h1 className="text-xl underline underline-offset-3">
                  Retrieved Songs from Spotify
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full"></div>
      </main>
    </div>
  );
}
