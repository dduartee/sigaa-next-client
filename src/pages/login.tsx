import LoginForm from '@components/Login/LoginForm'
import { useState } from 'react'
import { Box, Card, CardActions, CardContent, CircularProgress, Collapse, Grid } from '@mui/material'
import LoginActions from '@components/Login/LoginActions'
import { IInstitutionInfo } from '@services/api/types/Institutions'
import api from '@services/api'
import { LoginOptions, LoginRequest } from '@services/api/types/Login'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import MainGrid from '@components/MainGrid'

export default function LoginPage (props: { institutions: IInstitutionInfo[] }) {
  const router = useRouter()
  const [credentials, setCredentials] = useState<{ username: string, password: string, token: undefined }>({ username: '', password: '', token: undefined })
  const [options, setOptions] = useState<LoginOptions & { rememberMe: boolean }>({ institution: '', url: '', rememberMe: false })
  const [loading, setLoading] = useState<boolean>(false)
  const user = {
    status: 'Deslogado'
  }
  const conditionals = {
    isAuthenticated: user.status === 'Logado',
    isLoading:
      user.status === 'Logando' ||
      user.status === 'Deslogando' ||
      user.status === 'Logado',
    error: user.status === 'Erro'
  }

  const handleLogin = async () => {
    setLoading(true)
    const { username, password } = credentials
    const token = parseCookies().token
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
      setCookie(null, 'token', token, {
        maxAge: options.rememberMe ? 60 * 60 * 24 * 1 : undefined,
        path: '/'
      })
      setCookie(null, 'username', user.username, {
        maxAge: options.rememberMe ? 60 * 60 * 24 * 1 : undefined,
        path: '/'
      })
      localStorage.setItem('user', JSON.stringify({ ...user, createdAt: new Date().toISOString() }))
      localStorage.setItem('bonds', JSON.stringify({ ...bonds, createdAt: new Date().toISOString() }))
      router.push('/bonds')
    } else {
      console.error(message)
      if (message === 'Session has expired' || message === 'Session related to token not found') {
        console.log('Session has expired')
        destroyCookie(null, 'token')
        handleLogin()
      } else {
        setLoading(false)
      }
    }
  }
  return (
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
              <LoginForm
                hooks={{
                  credentialsHooks: {
                    credentials,
                    setCredentials
                  },
                  optionsHooks: {
                    options, setOptions
                  },
                  error: conditionals.error
                }}
                institutions={props.institutions}
              />
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
      </Grid>
    </MainGrid>
  )
}

export async function getServerSideProps () {
  const response = await api.getInstitutions()

  return {
    props: {
      institutions: response.data
    }
  }
}
