import BottomTabs, { secondaryActionTabs } from '@components/BottomTabs'
import MainGrid from '@components/MainGrid'
import useTabHandler from '@hooks/useTabHandler'
import { userAtom, userReducer } from '@jotai/User'
import { useReducerAtom } from 'jotai/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function NewsSecondaryPage () {
  const { query } = useRouter()
  const { setTab, tab } = useTabHandler({ page: 'news' })
  const [user] = useReducerAtom(userAtom, userReducer)
  const registration = query.registration as string
  const courseID = query.courseID as string
  return (
    <>
      <Head>
        <title>Notícias - {courseID} - sigaa-next-client</title>
      </Head>
      <MainGrid>
        <h3>News Secondary</h3>
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
