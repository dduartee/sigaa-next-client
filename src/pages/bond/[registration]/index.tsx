import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import Link from '@components/Link'
import MainGrid from '@components/MainGrid'
import { userInitialState } from '@contexts/User'
import useCachedUser from '@hooks/useCachedUser'
import useTabHandler from '@hooks/useTabHandler'
import { Button } from '@mui/material'
import api from '@services/api'
import { withToken } from '@services/api/types/Login'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'

export default function RegistrationPage (props: {credentials: withToken}) {
  const { query } = useRouter()
  const registration = query.registration as string
  const { tab, setTab } = useTabHandler({ page: 'home' })
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
      <div>
    <MainGrid>
      <div>
        <h1>Bond Registration</h1>
        <h2>{registration}</h2>
        <p>{user.fullName}</p>
        <Link href={`${registration}/courses/`}>
          <Button>Courses</Button>
        </Link>
        <Link href={`${registration}/course/343`}>
          <Button>Course</Button>
        </Link>
        <Link href={`${registration}/news`}>
          <Button>News</Button>
        </Link>
        <Link href={`${registration}/grades`}>
          <Button>Grades</Button>
        </Link>
        <Link href={`${registration}/activities`}>
          <Button>Activities</Button>
        </Link>
        <Link href={`${registration}/schedules`}>
          <Button>Schedules</Button>
        </Link>
        </div>
      </MainGrid>

        <BottomTabs
        tabHook={{
          tab,
          setTab
        }}
        tabsData={primaryActionTabs(registration, user.profilePictureURL)}
          />
          </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const { username, token } = cookies
  const credentials = {
    username,
    token
  }
  return {
    props: {
      credentials
    }
  }
}
