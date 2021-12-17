import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import Link from '@components/Link'
import MainGrid from '@components/MainGrid'
import { userInitialState } from '@contexts/User'
import useCachedUser from '@hooks/useCachedUser'
import useTabHandler from '@hooks/useTabHandler'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material'
import api from '@services/api'
import { Course } from '@services/api/types/Courses'
import { withToken } from '@services/api/types/Login'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'

export default function CoursesPage (props: { courses: Course[], credentials: withToken }) {
  const { query } = useRouter()
  const registration = query.registration as string
  const { tab, setTab } = useTabHandler({ page: 'courses' })
  const listCourses: Course[] = props.courses.map(({ id, title, code, period, numberOfStudents, schedule }) => ({ id, title, code, period, numberOfStudents, schedule }))
  const { user, setUser, valid: validUser, setValid: setValidUser } = useCachedUser()
  useEffect(() => {
    if (validUser === false) {
      api.getUser(props.credentials).then(response => {
        if (response.success && response.data) {
          localStorage.setItem('user', JSON.stringify(response.data))
          setUser(response.data.user)
          setValidUser(true)
        } else {
          console.error(response.message)
          setUser(userInitialState)
        }
      })
    }
  }, [props.credentials, setUser, setValidUser, validUser])
  return (
    <MainGrid>
      <div style={{ margin: '.5rem' }}>
        <h1>Matérias</h1>
        <Breadcrumbs separator="›" sx={{ color: '#268E36' }}>
          <Link href={'/bonds'}>Vínculos</Link>
          <Link href={`/bond/${registration}`}>{registration}</Link>
          <Link href={`/bond/${registration}/courses`}>Matérias</Link>
        </Breadcrumbs>
        <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'}>
          {listCourses.map((course, index) => (
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
          ))}
        </Box>
        <BottomTabs
          tabHook={{
            tab,
            setTab
          }}
          tabsData={primaryActionTabs(registration, user.profilePictureURL)}
        />
      </div>
    </MainGrid>
  )
}
/*
<BottomTabs
        tab={tab}
        setTab={setTab}
        tabsData={primaryActionTabs(params.registration)}
      /> */
export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const credentials = {
    username: cookies.username,
    token: cookies.token
  }
  const coursesResponse = await api.getCourses(credentials, context.query.registration as string)
  if (coursesResponse.success && coursesResponse.data) {
    return {
      props: {
        courses: coursesResponse.data.bond.courses,
        credentials
      }
    }
  } else {
    return {
      props: {
        courses: [],
        credentials
      }
    }
  }
}
