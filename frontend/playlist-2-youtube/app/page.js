"use client";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import Grid from "@mui/material/Grid2";

export default function Home() {
  return (
    <div className="w-full flex grow justify-center px-4">
      <main className="flex flex-col md:flex-row w-full">
        <div className="w-full lg:w-1/2 h-full p-4">
          <div className="border h-full rounded-lg">
            <div className="w-full flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-4">
                <h1 className="text-lg underline underline-offset-1">
                  Search for Spotify Playlist
                </h1>

                <Grid container>
                  <Grid size={10}>
                    <TextField
                      id="outlined-basic"
                      label="Spotify URL"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid size={2}>
                    <div className="flex justify-center">
                      <IconButton aria-label="delete" size="medium">
                        <SearchIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <Divider />
              <div>
                <h1 className="text-xl underline underline-offset-1">
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
