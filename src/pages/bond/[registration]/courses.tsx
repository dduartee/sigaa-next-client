import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import Link from '@components/Link'
import MainGrid from '@components/MainGrid'
import useTabHandler from '@hooks/useTabHandler'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  NoSsr,
  Typography
} from '@mui/material'
import { bondsAtom, bondsReducer } from '@jotai/Bonds'
import { userAtom, userReducer } from '@jotai/User'
import api from '@services/api'
import { useReducerAtom } from 'jotai/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import { credentialsAtom, credentialsReducer } from '@jotai/Credentials'

export default function CoursesPage () {
  const { query } = useRouter()
  const { tab, setTab } = useTabHandler({ page: 'courses' })
  const [{ username, token }] = useReducerAtom(credentialsAtom, credentialsReducer)
  const [user] = useReducerAtom(userAtom, userReducer)
  const [bonds, bondsDispatch] = useReducerAtom(bondsAtom, bondsReducer)
  const registration = query.registration as string
  useEffect(() => {
    api.getCourses({ username, token }, registration).then(({ message, success, data }) => {
      if (success && data) {
        bondsDispatch({ type: 'PUSH_COURSES', payload: { registration, courses: data.bond.courses } })
      } else {
        console.error(message)
      }
    })
  }, [bondsDispatch, registration, token, username])

  return (
    <>
      <Head>
        <title>Matérias - {registration} - sigaa-next-client</title>
      </Head>
      <MainGrid>
        <div style={{ margin: '.5rem' }}>
          <h1>Matérias</h1>
          <Breadcrumbs separator=">" sx={{ color: '#268E36' }}>
            <Link href={'/bonds'}>Vínculos</Link>
            <Link href={`/bond/${registration}`}>{registration}</Link>
            <Link href={`/bond/${registration}/courses`}>Matérias</Link>
          </Breadcrumbs>
          <NoSsr>
            <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'}>
              {bonds.filter(b => b.registration === registration).map(({ courses }) => courses?.map((course, index) => (
                <Card
                  variant="outlined"
                  sx={{
                    width: 300,
                    margin: 1,
                    maxHeight: 130,
                    minHeight: 100,
                    display: 'flex'
                  }}
                  key={index}
                >
                  <CardContent
                    sx={{
                      width: '60%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignContent: 'center',
                      flexWrap: 'wrap',
                      textAlign: 'center'
                    }}
                  >
                    <Typography>{course.title}</Typography>
                  </CardContent>
                  <CardActions sx={{ width: '40%', height: '100%' }}>
                    <Link href={`/bond/${registration}/course/${course.id}`}>
                      <Button variant="outlined">Visualizar</Button>
                    </Link>
                  </CardActions>
                </Card>
              )))}
            </Box>
          </NoSsr>
          <BottomTabs
            tabHook={{
              tab,
              setTab
            }}
            tabsData={primaryActionTabs(registration, user.profilePictureURL)}
          />
        </div>
      </MainGrid>
    </>
  )
}
