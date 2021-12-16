import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import useTabHandler from '@hooks/useTabHandler'
import { getUser } from '@pages/_app'
import { User } from '@services/api/types/User'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

export default function GradesPage (props: {grades: any, user: User}) {
  const { query } = useRouter()
  const { tab, setTab } = useTabHandler({ page: 'grades' })
  const registration = query.registration as string
  return (
    <>
      <h3>Grades</h3>
      <p>{registration}</p>
      <BottomTabs
        tabHook={{
          tab, setTab
        }}
        tabsData={primaryActionTabs(registration)}
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
      grades: [],
      user
    }
  }
}
