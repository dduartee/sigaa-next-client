import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import useTabHandler from '@hooks/useTabHandler'
import api from '@services/api'
import { User } from '@services/api/types/User'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

export default function ActivitiesPage (props: {activities: any, user: User}) {
  const { query } = useRouter()
  const { tab, setTab } = useTabHandler({ page: 'activities' })
  const registration = query.registration as string
  return (
    <>
      <h3>Activities</h3>
      <p>{registration}</p>
      <BottomTabs
        tabHook={{
          tab, setTab
        }}
        tabsData={primaryActionTabs(registration, props.user.profilePictureURL)}
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
  const user = await api.getUser(credentials)
  return {
    props: {
      activities: [],
      user
    }
  }
}
