"use client";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// if (typeof window === "undefined") {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const { server } = require("../mocks/server");
//   server.listen();
// } else {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const { worker } = require("../mocks/browser");
//   worker.start();
// }

const themeOptions: ThemeOptions = {
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#bdbdbd" },
    success: { main: "#DDFFDD" },
    warning: { main: "#FADBDA", dark: "#ff0000", light: "#fd7e00" },
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const theme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
