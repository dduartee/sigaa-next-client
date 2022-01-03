import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import Link from '@components/Link'
import MainGrid from '@components/MainGrid'
import useTabHandler from '@hooks/useTabHandler'
import { Button } from '@mui/material'
import { userAtom, userReducer } from '@jotai/User'
import { useReducerAtom } from 'jotai/utils'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function RegistrationPage () {
  const { query } = useRouter()
  const registration = query.registration as string
  const { tab, setTab } = useTabHandler({ page: 'home' })
  const [user] = useReducerAtom(userAtom, userReducer)
  return (
    <div>
      <Head>
        <title>Inicio - {registration} - sigaa-next-client</title>
      </Head>
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
