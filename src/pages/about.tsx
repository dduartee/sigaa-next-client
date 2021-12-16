import Link from '@components/Link'
import MainGrid from '@components/MainGrid'
import Build from '@mui/icons-material/Build'
import ExitToApp from '@mui/icons-material/ExitToApp'
import PersonSearch from '@mui/icons-material/PersonSearch'
import {
  CardContent,
  Box,
  Typography,
  CardActions,
  Button,
  Collapse,
  Card,
  Grid
} from '@mui/material'
import { LogoText } from '@pages'
import { useState } from 'react'
export default function About () {
  const [open, setOpen] = useState(false)
  const [openSecond, setOpenSecond] = useState(false)
  setTimeout(() => {
    setOpen(true)
  }, 100)
  setTimeout(() => {
    setOpenSecond(true)
  }, 2000)
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
            maxWidth: '100%'
          }}
        >
          <LogoText />
          <Collapse in={open}>
            <CardContent>
              <Typography variant="h4">Sobre</Typography>
              <Box display="flex" justifyContent="center" flexWrap={'wrap'}>
                <Typography width="100%" fontSize="1rem">
                  O propósito de vida do sigaa-next-client, é facilitar as tarefas
                  repetitivas (e demoradas) do SIGAA como por exemplo:
                  <ul>
                    <li>Ver as notas de todas as matérias</li>
                    <li>Ver as atividades</li>
                    <li>Ver os horários de forma mais intuitiva</li>
                    <li>Ver as faltas</li>
                    <li>Ver as notícias publicadas</li>
                  </ul>
                  <Collapse in={openSecond}>
                    Claro que tudo isso de forma mais simples (e preguiçosa)
                  </Collapse>
                </Typography>
              </Box>
            </CardContent>
            <AboutButtons />
          </Collapse>
        </Card>
      </Grid>
    </MainGrid>
  )
}

function AboutButtons () {
  const [open, setOpen] = useState(false)
  setTimeout(() => {
    setOpen(true)
  }, 350)
  return (
    <Collapse in={open}>
      <CardActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="text"
              startIcon={
                <Box dir="rtl" display="flex">
                  <ExitToApp />
                </Box>
              }
            >
              <Typography fontSize="1rem">Voltar</Typography>
            </Button>
          </Link>
          <div>
            <Link
              href="/about-personal"
              style={{ textDecoration: 'none', marginLeft: '10px' }}
            >
              <Button
                variant="text"
                startIcon={
                  <Box display="flex">
                    <PersonSearch />
                  </Box>
                }
              >
                <Typography fontSize="1rem">Sobre mim</Typography>
              </Button>
            </Link>
            <Link href="/about-technical" style={{ textDecoration: 'none' }}>
              <Button
                variant="text"
                startIcon={
                  <Box display="flex">
                    <Build />
                  </Box>
                }
              >
                <Typography fontSize="1rem">Detalhes Técnicos</Typography>
              </Button>
            </Link>
          </div>
        </Box>
      </CardActions>
    </Collapse>
  )
}
