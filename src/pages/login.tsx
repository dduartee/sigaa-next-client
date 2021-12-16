import LoginForm from '@components/Login/LoginForm'
import { useState } from 'react'
import { Box, Card, CardActions, CardContent, CircularProgress, Collapse, Grid } from '@mui/material'
import LoginActions from '@components/Login/LoginActions'
import { IInstitutionInfo, InstitutionsResponse } from '@services/api/types/Institutions'
import api from '@services/api'
import { LoginOptions, LoginRequest, LoginResponse } from '@services/api/types/Login'
import { useRouter } from 'next/router'
import { AxiosResponse } from 'axios'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import MainGrid from '@components/MainGrid'

export default function LoginPage (props: { institutions: IInstitutionInfo[] }) {
  const router = useRouter()
  const [credentials, setCredentials] = useState<{ username: string, password: string, token: undefined }>({ username: '', password: '', token: undefined })
  const [options, setOptions] = useState<LoginOptions & { rememberMe: boolean }>({ institution: '', url: '', rememberMe: false })
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
    const token = parseCookies().token
    console.log(token)
    const username = credentials.username
    api.post<LoginResponse, AxiosResponse<LoginResponse>, LoginRequest>('/auth/login', {
      username,
      password: token ? undefined : credentials.password,
      token: token ?? undefined,
      institution: options.institution,
      url: options.url
    }).then((response) => {
      console.log(response.status)
      const { success, data, message } = response.data
      if (success && data) {
        const { token, bonds, user } = data
        setCookie(null, 'token', token, {
          maxAge: options.rememberMe ? 60 * 60 * 24 * 1 : undefined,
          path: '/'
        })
        setCookie(null, 'username', user.username, {
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: '/'
        })
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('bonds', JSON.stringify(bonds))
        router.push('/bonds')
      } else {
        console.error(message)
      }
    }).catch(error => {
      if (error.response.data.message === 'Session has expired' || error.response.data.message === 'Session related to token not found') {
        console.log('Session has expired')
        destroyCookie(null, 'token')
        handleLogin()
      } else {
        console.error(error.response.data)
      }
    })
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
              in={!conditionals.isAuthenticated && !conditionals.isLoading}
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
            <Collapse in={conditionals.isLoading}>
              <Box display={'flex'} justifyContent={'center'}>
                <CircularProgress />
              </Box>
            </Collapse>
          </CardContent>
          <Collapse in={!conditionals.isAuthenticated && !conditionals.isLoading}>
            <CardActions>
              <LoginActions handleLogin={handleLogin} />
            </CardActions>
          </Collapse>
        </Card>
      </Grid>
    </MainGrid>
  )
}

async function getCompatiblesInstitutions () {
  const response = await api.get('/institutions')
  const institutions = await response.data as InstitutionsResponse
  if (institutions.success) {
    return institutions.data as IInstitutionInfo[]
  } else {
    throw new Error(institutions.message)
  }
}

export async function getServerSideProps () {
  const institutions = await getCompatiblesInstitutions()
  return {
    props: {
      institutions
    }
  }
}
