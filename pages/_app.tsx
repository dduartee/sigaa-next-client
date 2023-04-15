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
  const [forbiddenVersion, setForbiddenVersion] = React.useState(false);
  const forbiddenTheme = createTheme(forbidden);
  const darkTheme = createTheme(dark);
  const [theme, setTheme] = React.useState(darkTheme);
  React.useEffect(() => {
    if (forbiddenVersion) {
      setTheme(forbiddenTheme);
    } else {
      setTheme(darkTheme);
    }
  }, [darkTheme, forbiddenTheme, forbiddenVersion]);
  React.useEffect(() => {
    const forbiddenVersion = localStorage.getItem("forbiddenVersion");
    if (forbiddenVersion === "true") {
      setForbiddenVersion(true);
    } else {
      setForbiddenVersion(false);
    }
  }, []);
  return (
    <ForbiddenContext.Provider value={{forbiddenVersion, setForbiddenVersion}}>
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
