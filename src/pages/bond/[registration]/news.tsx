import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import MainGrid from '@components/MainGrid'
import { userInitialState } from '@contexts/User'
import useCachedUser from '@hooks/useCachedUser'
import useTabHandler from '@hooks/useTabHandler'
import api from '@services/api'
import { withToken } from '@services/api/types/Login'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'

export default function NewsPage (props: {news: any, credentials: withToken}) {
  const { query } = useRouter()
  const { tab, setTab } = useTabHandler({ page: 'news' })
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
      <MainGrid>
        <div>
      <h3>News</h3>
      <p>{registration}</p>
      </div>
      </MainGrid>
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
    username: cookies.username,
    password: undefined
  }
  return {
    props: {
      news: [],
      credentials
    }
  }
}
