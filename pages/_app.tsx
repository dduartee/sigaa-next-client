import * as React from "react";
import { AppProps } from "next/app";
import { dark, forbidden } from "@styles/themes";
import "@styles/global.css";
import "@styles/material-dark.min.css"
import { ForbiddenContext } from "@context/forbidden";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const [forbiddenVersion, setForbiddenVersion] = React.useState(true);
  const forbiddenTheme = createTheme(forbidden);
  const darkTheme = createTheme(dark);
  const [theme, setTheme] = React.useState(darkTheme);
  React.useEffect(() => {
    if (localStorage.getItem("versaoProibida") === null) {
      localStorage.setItem("versaoProibida", "false");
    }
  }, [])
  React.useEffect(() => {
    const storedForbiddenVersion = localStorage.getItem("versaoProibida");
    if (storedForbiddenVersion === "true") {
      setForbiddenVersion(true);
    } else {
      setForbiddenVersion(false);
    }
  }, [setForbiddenVersion]);
  React.useEffect(() => {
    localStorage.setItem("versaoProibida", forbiddenVersion.toString());
    if (forbiddenVersion) {
      setTheme(forbiddenTheme);
    } else {
      setTheme(darkTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forbiddenVersion]);
  return (
    <ForbiddenContext.Provider value={{ forbiddenVersion, setForbiddenVersion }}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
      </ThemeProvider>
    </ForbiddenContext.Provider>
  );
}

export default MyApp;
