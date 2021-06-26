import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider,  } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { light, dark } from "@styles/themes";
import { Button, createTheme } from "@material-ui/core";
import "@styles/global.css";
const cache = createCache({ key: "css", prepend: true });
cache.compat = true;

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [isLight, setIsLight] = React.useState(true);
  const toggleColor = () => {
    setIsLight(isLight ? false : true);
  };
  const darkTheme = createTheme(dark)
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
