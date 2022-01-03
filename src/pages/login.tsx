import LoginForm from '@components/Login/LoginForm'
import { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, CircularProgress, Collapse, Grid } from '@mui/material'
import LoginActions from '@components/Login/LoginActions'
import { IInstitutionInfo } from '@services/api/types/Institutions'
import api from '@services/api'
import { LoginOptions, LoginRequest } from '@services/api/types/Login'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import MainGrid from '@components/MainGrid'
import { ServerStatus } from '@pages'
import { userAtom, userReducer } from '@jotai/User'
import { useReducerAtom } from 'jotai/utils'
import { bondsAtom, bondsReducer } from '@jotai/Bonds'
import NoSsr from '@mui/base/NoSsr'
import { credentialsAtom, credentialsReducer } from '@jotai/Credentials'
import Head from 'next/head'

export default function LoginPage () {
  const router = useRouter()
  const [{ username, token }, credentialsDispatch] = useReducerAtom(credentialsAtom, credentialsReducer)
  const [credentials, setCredentials] = useState<any>({
    username: username,
    token: token,
    password: undefined
  })
  const [options, setOptions] = useState<LoginOptions & { rememberMe: boolean }>({ institution: '', url: '', rememberMe: false })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [institutions, setInstitutions] = useState<IInstitutionInfo[]>([])
  const [, userDispatch] = useReducerAtom(userAtom, userReducer)
  const [, bondsDispatch] = useReducerAtom(bondsAtom, bondsReducer)
  useEffect(() => {
    api.getInstitutions().then(({ data }) => {
      setInstitutions(data)
    })
  }, [])

  const handleLogin = async () => {
    userDispatch({ type: 'RESET_USER' })
    bondsDispatch({ type: 'RESET_BONDS' })
    setLoading(true)
    setError(false)
    const { username, password } = credentials
    const { institution, url } = options
    const loginRequest: LoginRequest = {
      username,
      password: password as any,
      token: undefined as any,
      institution,
      url
    }
    if (credentials.password) {
      loginRequest.password = password
      loginRequest.token = undefined
    } else {
      loginRequest.password = undefined
      loginRequest.token = token
    }
    const { success, data, message } = await api.doLogin(loginRequest)
    if (success && data) {
      const { token, bonds, user } = data
      // sort bonds by bond.active, true first
      credentialsDispatch({ type: 'SET_CREDENTIALS', payload: { username, token } })
      userDispatch({ type: 'SET_USER', payload: user })
      bondsDispatch({ type: 'SET_BONDS', payload: bonds })
      router.push('/bonds')
    } else {
      console.error(message)
      if (message === 'Session has expired' || message === 'Session related to token not found') {
        console.log('Session has expired')
        destroyCookie(null, 'token')
        handleLogin()
      } else {
        setLoading(false)
        setError(true)
      }
    }
  }
  return (
    <>
      <Head>
        <title>Login - sigaa-next-client</title>
      </Head>
      <MainGrid>
        <Grid
          item
          sx={{ m: 4 }}
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          display={'flex'}
        >
          <Card
            variant="elevation"
            sx={{
              overflow: 'visible',
              borderRadius: '9px',
              width: '300px'
            }}
          >
            <CardContent>
              <Collapse
                in={!loading}
              >
                <NoSsr>
                  <LoginForm
                    hooks={{
                      credentialsHooks: {
                        credentials,
                        setCredentials
                      },
                      optionsHooks: {
                        options, setOptions
                      },
                      error: error
                    }}
                    institutions={institutions}
                  />
                </NoSsr>
              </Collapse>
              <Collapse in={loading}>
                <Box display={'flex'} justifyContent={'center'}>
                  <CircularProgress />
                </Box>
              </Collapse>
            </CardContent>
            <Collapse in={!loading}>
              <CardActions>
                <LoginActions handleLogin={handleLogin} />
              </CardActions>
            </Collapse>
          </Card>
          <ServerStatus />
        </Grid>
      </MainGrid>
    </>
  )
}
