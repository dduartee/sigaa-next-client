import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@styles/theme";
import "@styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "@redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { SocketInstance, SocketContext } from "@contexts/Socket";
export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const socketInstance = SocketInstance();

  return (
    <div suppressHydrationWarning>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      {typeof window === "undefined" ? null : (
        <>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider theme={theme}>
                <SocketContext.Provider value={socketInstance}>
                  <CssBaseline />
                  <BrowserRouter>
                    <Component {...pageProps} />
                  </BrowserRouter>
                </SocketContext.Provider>
              </ThemeProvider>
            </PersistGate>
          </ReduxProvider>
        </>
      )}
    </div>
  );
}
