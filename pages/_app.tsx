import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme } from "@material-ui/core/styles";
import { dark, forbidden } from "@styles/themes";
import "@styles/global.css";
import "@styles/material-dark.min.css"
import { SocketContext, socketInstance } from "@context/socket";
import { ForbiddenContext } from "@context/forbidden";

function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const [forbiddenVersion, setForbiddenVersion] = React.useState(true);
  const forbiddenTheme = createTheme(forbidden);
  const darkTheme = createTheme(dark);
  const [theme, setTheme] = React.useState(darkTheme);
  React.useEffect(() => {
    if (localStorage.getItem("versaoProibida") === null) {
      localStorage.setItem("versaoProibida", "true");
    }
  }, [])
  React.useEffect(() => {
    const forbiddenVersion = localStorage.getItem("versaoProibida");
    if (forbiddenVersion === "true") {
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
        <SocketContext.Provider value={socketInstance}>
          <CssBaseline />
          <Component {...pageProps} />
        </SocketContext.Provider>
      </ThemeProvider>
    </ForbiddenContext.Provider>
  );
}

export default MyApp;
