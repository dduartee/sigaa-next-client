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
  Typography
} from '@mui/material'
import { getUser } from '@pages/_app'
import api from '@services/api'
import { Course, CoursesRequest, CoursesResponse } from '@services/api/types/Courses'
import { User } from '@services/api/types/User'
import { AxiosResponse } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

export default function CoursesPage (props: { courses: Course[], user: User }) {
  const { query } = useRouter()
  const registration = query.registration as string
  const { tab, setTab } = useTabHandler({ page: 'courses' })
  const listCourses: Course[] = props.courses.map(({ id, title, code, period, numberOfStudents, schedule }) => ({ id, title, code, period, numberOfStudents, schedule }))
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
          tabsData={primaryActionTabs(registration)}
          profilePictureURL={props.user.profilePictureURL}
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
export async function getCourses (credentials: { username: string, token: string }, registration: string): Promise<Course[]> {
  const { data: response } = await api.post<CoursesResponse, AxiosResponse<CoursesResponse>, CoursesRequest>(`/bonds/${registration}/courses`, {
    username: credentials.username,
    token: credentials.token,
    password: undefined
  })
  const { success, data, message } = response
  if (success && data) {
    return data.bond.courses as Course[]
  } else {
    console.error(message)
    return []
  }
}
export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const credentials = {
    username: cookies.username,
    token: cookies.token,
    password: undefined
  }
  const courses = await getCourses(credentials, context.query.registration as string)
  const user = await getUser(credentials)
  return {
    props: {
      courses,
      user
    }
  }
}
