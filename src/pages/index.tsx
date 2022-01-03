import {
  Grid,
  Card,
  CardContent,
  Typography,
  Collapse,
  CardActions,
  Button,
  Box,
  Grow,
  CircularProgress
} from '@mui/material'
import { Info, Login as LoginIcon } from '@mui/icons-material'
import Link from '@components/Link'
import { useState, useEffect } from 'react'
import MainGrid from '@components/MainGrid'
import api from '@services/api'
import Head from 'next/head'

export default function Index () {
  const [open, setOpen] = useState(false)
  const [openStart, setOpenStart] = useState(false)
  const [openMiddle, setOpenMiddle] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)
  useEffect(() => {
    const timeoutOpen = setTimeout(() => {
      setOpen(true)
    }, 200)
    const timeoutOpenStart = setTimeout(() => {
      setOpenStart(true)
    }, 800)
    const timeoutOpenMiddle = setTimeout(() => {
      setOpenMiddle(true)
    }, 1500)
    const timeoutOpenEnd = setTimeout(() => {
      setOpenEnd(true)
    }, 2300)
    return () => {
      clearTimeout(timeoutOpen)
      clearTimeout(timeoutOpenStart)
      clearTimeout(timeoutOpenMiddle)
      clearTimeout(timeoutOpenEnd)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Inicio - sigaa-next-client</title>
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
            <LogoText />
            <CardContent sx={{ paddingTop: 0 }}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                textAlign={'center'}
                flexDirection={'column'}
                sx={{
                  margin: 1,
                  marginTop: '0',
                  marginBottom: '0'
                }}
              >
                <Box textAlign={'right'} fontWeight={500}>
                  <Collapse
                    in={openStart}
                    sx={{ width: '100%', marginBottom: 0.3, fontSize: '1rem' }}
                    timeout={300}
                  >
                    Um cliente{' '}
                    <span style={{ color: '#268E36', fontSize: '1.2rem' }}>
                      SIGAA
                    </span>{' '}
                  </Collapse>

                  <Collapse
                    in={openMiddle}
                    sx={{ width: '100%', marginBottom: 0.3 }}
                    timeout={300}
                  >
                    feito por{' '}
                    <span style={{ color: '#268E36', fontSize: '1.2rem' }}>
                      estudantes
                    </span>{' '}
                  </Collapse>

                  <Collapse in={openEnd} timeout={600} sx={{ width: '100%' }}>
                    para{' '}
                    <span style={{ color: '#268E36', fontSize: '1.2rem' }}>
                      estudantes
                    </span>
                  </Collapse>
                </Box>
              </Box>
            </CardContent>
            <Collapse in={open}>
              <CardActions>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  sx={{
                    'a:nth-of-type': {
                      marginRight: '.5rem',
                      marginLeft: '.5rem'
                    }
                  }}
                >
                  <Link href="/about">
                    <Button variant="outlined" fullWidth startIcon={<Info />}>
                      <Typography fontSize="1rem">Sobre</Typography>
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="contained" fullWidth endIcon={<LoginIcon />}>
                      <Typography fontSize="1rem">Login</Typography>
                    </Button>
                  </Link>
                </Box>
              </CardActions>
            </Collapse>
          </Card>
          <ServerStatus />
        </Grid>
      </MainGrid>
    </>
  )
}
export function ServerStatus () {
  const [status, setStatus] = useState<'unknown' | 'online' | 'offline'>('unknown')
  const [statusHover, setStatusHover] = useState(false)
  const [opacityFade, setOpacityFade] = useState<number>(0.5)
  const wakeUp = async () => {
    try {
      const { success } = await api.wakeup()
      setStatus(success ? 'online' : 'offline')
    } catch (error) {
      console.error(error)
      setStatus('offline')
    }
  }
  useEffect(() => {
    wakeUp()
  }, [])
  useEffect(() => {
    if (statusHover) {
      const interval = setInterval(() => {
        if (opacityFade < 1) {
          setOpacityFade(opacityFade + 0.05)
        }
      }, 10)
      return () => clearInterval(interval)
    } else {
      const interval = setInterval(() => {
        if (opacityFade > 0.5) {
          setOpacityFade(opacityFade - 0.05)
        }
      }, 10)
      return () => clearInterval(interval)
    }
  }, [statusHover, opacityFade])
  return (
    <Box
      position="absolute"
      bottom="0"
      width="100%"
      display="flex"
      justifyContent="center"
    >
      {
        status !== 'unknown'
          ? (
            <Link href="https://github.com/dduartee/sigaa-http-api" style={{
              opacity: opacityFade
            }}
              onMouseEnter={() => setStatusHover(true)}
              onMouseLeave={() => setStatusHover(false)}
              target="_blank"
            >
              {
                status === 'online'
                  ? (
                    <Grow in={status === 'online'}>
                      <Box
                        sx={{
                          backgroundColor: 'rgba(38, 142, 54, 0.8)',
                          color: '#fff',
                          borderRadius: '9px',
                          padding: '1rem',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          marginBottom: '1rem'
                        }}
                      >
                        Servidor conectado
                      </Box>
                    </Grow>
                    )
                  : (
                    <Grow in={status === 'offline'}>
                      <Box
                        sx={{
                          backgroundColor: '#E53935',
                          color: '#fff',
                          borderRadius: '9px',
                          padding: '1rem',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          marginBottom: '1rem'
                        }}
                      >
                        Servidor desconectado, tente novamente mais tarde
                      </Box>
                    </Grow>
                    )
              }
            </Link>
            )
          : (
            <Box
              sx={{
                color: '#fff',
                borderRadius: '9px',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}
            >
              Inicializando servidor...
              <CircularProgress />
            </Box>
            )
      }
    </Box>
  )
}

export function LogoText () {
  const [openLogo, setOpenLogo] = useState(false)
  const [openCollapseLogo, setOpenCollapseLogo] = useState(false)
  useEffect(() => {
    const timeoutOpenCollapseLogo = setTimeout(() => {
      setOpenCollapseLogo(true)
    }, 3000)
    return () => {
      clearTimeout(timeoutOpenCollapseLogo)
    }
  }, [])
  return (
    <Collapse
      in={openCollapseLogo}
      timeout={1000}
      onEnter={() => setOpenLogo(true)}
    >
      <CardContent>
        <Grow in={openLogo} timeout={1000}>
          <Box display="flex" justifyContent="center" flexWrap={'wrap'}>
            <Typography variant="h2" fontSize="2rem">
              sigaa-next-client
            </Typography>
          </Box>
        </Grow>
      </CardContent>
    </Collapse>
  )
}
