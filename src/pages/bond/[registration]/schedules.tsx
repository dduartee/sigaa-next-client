import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import MainGrid from '@components/MainGrid'
import useTabHandler from '@hooks/useTabHandler'
import { userAtom, userReducer } from '@jotai/User'
import { useReducerAtom } from 'jotai/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SchedulePage () {
  const { query } = useRouter()
  const { tab, setTab } = useTabHandler({ page: 'schedules' })
  const registration = query.registration as string
  // const [credentials] = useReducerAtom(credentialsAtom, credentialsReducer)
  const [user] = useReducerAtom(userAtom, userReducer)
  return (
    <>
      <Head>
        <title>Horários - {registration} - sigaa-next-client</title>
      </Head>
      <MainGrid>
        <h3>Schedules</h3>
        <p>{registration}</p>
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
