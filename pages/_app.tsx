import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme } from "@material-ui/core/styles";
import { dark, light } from "@styles/themes";
import "@styles/global.css";
import "@styles/material-dark.min.css"
import { SocketContext, socketInstance } from "@context/socket";

function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const darkTheme = createTheme(dark);
  return (
    <ThemeProvider theme={darkTheme}>
      <SocketContext.Provider value={socketInstance}>
        <CssBaseline />
        <Component {...pageProps} />
      </SocketContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
