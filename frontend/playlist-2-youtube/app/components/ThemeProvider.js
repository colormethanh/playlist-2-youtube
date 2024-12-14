"use client";
import React from "react";
import useThemes from "../hooks/useThemes";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export default function MyThemeProvider({ children }) {
  const { darkTheme } = useThemes();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
