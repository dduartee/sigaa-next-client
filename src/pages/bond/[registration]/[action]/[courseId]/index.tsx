import BottomTabs, { secondaryActionTabs } from '@components/BottomTabs'
import Link from '@components/Link'
import MainGrid from '@components/MainGrid'
import useTabHandler from '@hooks/useTabHandler'
import { userAtom, userReducer } from '@jotai/User'
import { Button } from '@mui/material'
import { useReducerAtom } from 'jotai/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function CourseIDPage () {
  const { query } = useRouter()
  const { setTab, tab } = useTabHandler({ page: 'course' })
  const [user] = useReducerAtom(userAtom, userReducer)
  const registration = query.registration as string
  const courseID = query.courseID as string
  return (
    <>
      <Head>
        <title>Inicio - {courseID} - sigaa-next-client</title>
      </Head>
      <MainGrid>
        <h1>CourseIDPage</h1>
        <p>
          <b>Registration:</b> {registration}
        </p>
        <p>
          <b>CourseID:</b> {courseID}
        </p>
        <Link href={`${courseID}/news`}>
          <Button>News</Button>
        </Link>
        <Link href={`${courseID}/grades`}>
          <Button>Grades</Button>
        </Link>
        <Link href={`${courseID}/activities`}>
          <Button>Activities</Button>
        </Link>
      </MainGrid>
      <BottomTabs
        tabHook={{
          tab, setTab
        }}
        tabsData={secondaryActionTabs(registration, courseID, user.profilePictureURL)}
      />
    </>
  )
}
