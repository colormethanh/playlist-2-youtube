import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SpotifySearchBar({
  searchInputError,
  onSubmit,
  helperText = "",
}) {
  const [textInputValue, setTextInputValue] = useState("");

  const handleInputChange = (e) => {
    setTextInputValue(e.target.value);
    // Todo: add validation field to this component
  };

  const handleSubmit = () => {
    // todo: run validation on query
    onSubmit(textInputValue);
  };

  return (
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
        <IconButton aria-label="delete" size="medium" onClick={handleSubmit}>
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}
