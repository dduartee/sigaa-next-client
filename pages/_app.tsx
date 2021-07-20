import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { dark } from "@styles/themes";
import { createTheme } from "@material-ui/core";
import "@styles/global.css";
import "@styles/material-dark.min.css"
import { SocketContext, socketInstance } from "@context/socket";
import "moment-timezone";

const cache = createCache({ key: "css", prepend: true });
cache.compat = true;

function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const darkTheme = createTheme(dark);
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={darkTheme}>
        <SocketContext.Provider value={socketInstance}>
          <CssBaseline />
          <Component {...pageProps} />
        </SocketContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
