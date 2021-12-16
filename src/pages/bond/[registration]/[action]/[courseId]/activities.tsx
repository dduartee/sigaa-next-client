import BottomTabs, { secondaryActionTabs } from '@components/BottomTabs'
import useTabHandler from '@hooks/useTabHandler'
import { getUser } from '@pages/_app'
import { User } from '@services/api/types/User'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

export default function ActivitiesSecondaryPage (props: {activities: any, user: User}) {
  const { query } = useRouter()
  const registration = query.registration as string
  const courseID = query.courseID as string
  const { setTab, tab } = useTabHandler({ page: 'activities' })
  return (
    <>
      <h3>Activities Secondary</h3>
      <BottomTabs
        tabHook={{
          tab, setTab
        }}
        tabsData={secondaryActionTabs(registration, courseID)}
        profilePictureURL={props.user.profilePictureURL}
      />
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const credentials = {
    token: cookies.token,
    username: cookies.username,
    password: undefined
  }
  const user = await getUser(credentials)
  return {
    props: {
      activities: [],
      user
    }
  }
}
