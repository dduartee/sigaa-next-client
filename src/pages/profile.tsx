/* eslint-disable @next/next/no-img-element */
import { userInitialState } from '@contexts/User'
import api from '@services/api'
import { User } from '@services/api/types/User'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

const profilePage = (props: {user: User}) => {
  return <img alt="ProfilePicture" src={props.user.profilePictureURL} style={{
    width: '100vw',
    height: '100vh'
  }}>
    </img>
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const credentials = {
    token: cookies.token,
    username: cookies.username
  }
  const userResponse = await api.getUser(credentials)
  if (userResponse.success && userResponse.data) {
    return {
      props: {
        user: userResponse.data.user
      }
    }
  } else {
    return {
      props: {
        user: userInitialState
      }
    }
  }
}

export default profilePage
