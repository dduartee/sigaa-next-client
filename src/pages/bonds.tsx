import BondActions from '@components/Bonds/BondActions'
import { ProfileHeader } from '@components/Bonds/ProfileHeader'
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  NoSsr
} from '@mui/material'
import { useEffect, useState } from 'react'
import api from '@services/api'
import { useRouter } from 'next/router'
import MainGrid from '@components/MainGrid'
import { userAtom, userReducer } from '@jotai/User'
import { useReducerAtom } from 'jotai/utils'
import { bondsAtom, bondsReducer } from '@jotai/Bonds'
import { credentialsAtom, credentialsReducer } from '@jotai/Credentials'
import { BondSelector } from '@components/Bonds/BondSelector'
import Head from 'next/head'

export default function BondsPage () {
  const [user, userDispatch] = useReducerAtom(userAtom, userReducer)
  const [bonds, bondsDispatch] = useReducerAtom(bondsAtom, bondsReducer)
  const [credentials] = useReducerAtom(credentialsAtom, credentialsReducer)
  const [currentBond, setCurrentBond] = useState<string>('')
  const { token, username } = credentials
  useEffect(() => {
    if (username && token) {
      api.getBonds({ username, token }).then(({ message, success, data }) => {
        if (success && data) {
          setCurrentBond(data.bonds[0].registration)
          data.bonds.map(async bond => {
            const getCoursesResponse = await api.getCourses({ username, token }, bond.registration)
            if (getCoursesResponse.success && getCoursesResponse.data) {
              bondsDispatch({
                type: 'PUSH_COURSES',
                payload: {
                  registration: bond.registration,
                  courses: getCoursesResponse.data.bond.courses
                }
              })
            } else console.error(getCoursesResponse.message)
          })
        } else {
          console.error(message)
          bondsDispatch({ type: 'RESET_BONDS' })
        }
      })
    }
  }, [bondsDispatch, token, username])
  const router = useRouter()
  const handleLogout = () => {
    userDispatch({ type: 'RESET_USER' })
    router.push('/')
  }
  return (
    <>
      <Head>
        <title>Vinculos - sigaa-next-client</title>
      </Head>
      <MainGrid>
        <Grid
          item
          sx={{ m: 4 }}
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          display={'flex'}
        >
          <Card
            variant="elevation"
            sx={{
              overflow: 'visible',
              borderRadius: '9px',
              maxWidth: '300px'
            }}
          >
            <NoSsr>
              <Collapse
                in={true}
              >
                <CardContent>
                  <ProfileHeader Profile={user}
                  />
                  <BondSelector
                    bonds={bonds}
                    setCurrentBond={setCurrentBond}
                    currentBond={currentBond}
                  />
                </CardContent>
              </Collapse>
              <Collapse
                in={true}
              >
                <CardActions>
                  <BondActions
                    handleLogout={handleLogout}
                    currentBond={currentBond}
                  />
                </CardActions>
              </Collapse>
            </NoSsr>
          </Card>
        </Grid>
      </MainGrid>
    </>
  )
}
