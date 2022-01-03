/* eslint-disable @next/next/no-img-element */
import { userAtom, userReducer } from '@jotai/User'
import { Box } from '@mui/system'
import api from '@services/api'
import { useEffect, useState } from 'react'
import { useReducerAtom } from 'jotai/utils'
import { CircularProgress } from '@mui/material'
import NoSsr from '@mui/base/NoSsr'
import Head from 'next/head'
import { credentialsAtom, credentialsReducer } from '@jotai/Credentials'

const ProfilePage = () => {
  const [loading, setLoading] = useState(false)
  const [user, userDispatch] = useReducerAtom(userAtom, userReducer)
  const [credentials] = useReducerAtom(credentialsAtom, credentialsReducer)

  useEffect(() => {
    if (credentials.token && credentials.username) {
      setLoading(true)
      api.getUser(credentials).then(({ message, success, data }) => {
        if (success && data) {
          userDispatch({ type: 'SET_USER', payload: data.user })
          setLoading(false)
        } else {
          throw new Error(message)
        }
      }).catch(err => {
        console.log(err)
        userDispatch({ type: 'RESET_USER' })
        setLoading(false)
      })
    }
  }, [credentials, userDispatch])
  return (
    <>
      <Head>
        <title>Perfil - sigaa-next-client</title>
      </Head>
      <NoSsr>
        <Box>
          {loading
            ? <CircularProgress />
            : <img alt="ProfilePicture" src={user.profilePictureURL} style={{
              width: '100vw',
              height: '100vh'
            }} />
          }
        </Box>
      </NoSsr>
    </>
  )
}

export default ProfilePage
