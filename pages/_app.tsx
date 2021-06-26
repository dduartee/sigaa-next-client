import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { dark } from "@styles/themes";
import { createTheme } from "@material-ui/core";
import "@styles/global.css";
const cache = createCache({ key: "css", prepend: true });
cache.compat = true;

export default function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const darkTheme = createTheme(dark);
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
