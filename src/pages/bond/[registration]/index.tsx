import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import Link from '@components/Link'
import MainGrid from '@components/MainGrid'
import useTabHandler from '@hooks/useTabHandler'
import { Button } from '@mui/material'
import { getUser } from '@pages/_app'
import { User } from '@services/api/types/User'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { getCourses } from './courses'

export default function RegistrationPage (props: {
  user: User
}) {
  const { query } = useRouter()
  const User = props.user
  const registration = query.registration as string
  const { username, token } = parseCookies()
  const [bgAction, setBgAction] = useState<string>('')
  useEffect(() => {
    if (registration) {
      setBgAction('getCourses')
      getCourses({ username, token }, registration).then(() => {
        setBgAction('')
      }).catch(error => {
        console.error(error.response.data)
      })
    }
  }, [registration])
  const { tab, setTab } = useTabHandler({ page: 'home' })
  return (
    <MainGrid>
      <div>
        <h1>Bond Registration</h1>
        <h2>{registration}</h2>
        <p>{User.fullName}</p>
        <p>{bgAction}</p>
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
        <BottomTabs
        tabHook={{
          tab,
          setTab
        }}
          tabsData={primaryActionTabs(registration)}
          profilePictureURL={User.profilePictureURL}
        />
      </div>
      </MainGrid>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const { username, token } = cookies
  const user = await getUser({ username, token, password: undefined })
  return {
    props: {
      user
    }
  }
}
