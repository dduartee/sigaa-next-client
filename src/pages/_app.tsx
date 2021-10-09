import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { EmotionCache } from "@emotion/react";
import theme from "@styles/theme";
import createEmotionCache from "@createEmotionCache";
import "@styles/global.css";
import { IUserSchema, userInitialState } from "@contexts/User";
import {
  IProfileSchema,
  profileInitialState,
} from "@contexts/Profile";
import { dataInitialState, DataState } from "@contexts/Data";
import { BrowserRouter } from "react-router-dom";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [User, setUser] = React.useState<IUserSchema>(userInitialState);
  const [Profile, setProfile] =
    React.useState<IProfileSchema>(profileInitialState);
  const [Data, setData] = React.useState<DataState>(dataInitialState);

  return (
    <div suppressHydrationWarning>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {typeof window === "undefined" ? null : (
          <BrowserRouter>
            <Component {...pageProps} />
          </BrowserRouter>
        )}
      </ThemeProvider>
    </div>
  );
}
