import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "@styles/theme";
import createEmotionCache from "@createEmotionCache";
import "@styles/global.css";
import { IUserSchema, UserContext, userInitialState } from "@contexts/User";
import {
  IProfileSchema,
  ProfileContext,
  profileInitialState,
} from "@contexts/Profile";
import { DataContext, dataInitialState, DataState } from "@contexts/Data";
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
    <UserContext.Provider value={{ User, setUser }}>
      <ProfileContext.Provider value={{ Profile, setProfile }}>
        <DataContext.Provider value={{ Data, setData }}>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </DataContext.Provider>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
}
