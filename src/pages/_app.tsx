import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../styles/theme'
import createCache from '@emotion/cache'
import '@styles/global.css'
import { UserContext, userInitialState } from '@contexts/User'
import { useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import api from '@services/api'
import { User, UserRequest, UserResponse } from '@services/api/types/User'
import { AxiosResponse } from 'axios'
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
export async function getUser (credentials: { username: string, token: string, password: undefined }) {
  const { data: response } = await api.post<UserResponse, AxiosResponse<UserResponse>, UserRequest>('/users/me', credentials)
  const { success, data, message } = response
  if (success && data) {
    return data.user
  } else {
    console.error(message)
    return userInitialState
  }
}
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = parseCookies(context)
  const credentials = {
    username: cookies.username,
    token: cookies.token,
    password: undefined
  }
  const user = await getUser(credentials)
  return {
    props: {
      user
    }
  }
}
function createEmotionCache () {
  return createCache({ key: 'css' })
}
