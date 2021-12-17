import BottomTabs, { secondaryActionTabs } from '@components/BottomTabs'
import Link from '@components/Link'
import useTabHandler from '@hooks/useTabHandler'
import { Button } from '@mui/material'
import api from '@services/api'
import { User } from '@services/api/types/User'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

export default function CourseIDPage (props: {
  user: User;
}) {
  const { setTab, tab } = useTabHandler({ page: 'course' })
  const { query } = useRouter()
  const registration = query.registration as string
  const courseID = query.courseID as string
  return (
    <div>
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
      <BottomTabs
        tabHook={{
          tab, setTab
        }}
        tabsData={secondaryActionTabs(registration, courseID, props.user.profilePictureURL)}
      />
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const credentials = {
    token: cookies.token,
    username: cookies.username
  }
  const user = await api.getUser(credentials)
  return {
    props: {
      user
    }
  }
}
