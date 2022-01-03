import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import MainGrid from '@components/MainGrid'
import useTabHandler from '@hooks/useTabHandler'
import { userAtom, userReducer } from '@jotai/User'
import { useReducerAtom } from 'jotai/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ActivitiesPage () {
  const { query } = useRouter()
  const { tab, setTab } = useTabHandler({ page: 'activities' })
  const [user] = useReducerAtom(userAtom, userReducer)
  const registration = query.registration as string
  return (
    <>
      <Head>
        <title>Atividades - sigaa-next-client</title>
      </Head>
      <MainGrid>
        <h3>Activities</h3>
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
