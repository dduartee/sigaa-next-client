import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../styles/theme'
import createCache from '@emotion/cache'
import '@styles/global.css'
import { UserContext } from '@contexts/User'
import { useState } from 'react'
import { User } from '@services/api/types/User'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  user: User;
}

export default function MyApp (props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, user } = props
  const [User, setUser] = useState<User>(user)
  return (
    <UserContext.Provider value={{ User, setUser }}>
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
    </UserContext.Provider>
  )
}

function createEmotionCache () {
  return createCache({ key: 'css' })
}
