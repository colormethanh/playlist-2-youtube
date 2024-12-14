"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function useThemes() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return { darkTheme };
}
