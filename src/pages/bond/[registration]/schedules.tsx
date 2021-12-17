import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import { userInitialState } from '@contexts/User'
import useCachedUser from '@hooks/useCachedUser'
import useTabHandler from '@hooks/useTabHandler'
import api from '@services/api'
import { withToken } from '@services/api/types/Login'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'

export default function SchedulePage (props: {schedule: any, credentials: withToken}) {
  const { query } = useRouter()
  const { tab, setTab } = useTabHandler({ page: 'schedules' })
  const registration = query.registration as string
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
    <>
      <h3>Schedules</h3>
      <p>{registration}</p>
      <BottomTabs
        tabHook={{
          tab, setTab
        }}
        tabsData={primaryActionTabs(registration, user.profilePictureURL)}
      />
    </>
  )
}
export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const credentials = {
    token: cookies.token,
    username: cookies.username
  }
  return {
    props: {
      news: [],
      credentials
    }
  }
}
