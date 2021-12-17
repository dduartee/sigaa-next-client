import BondActions from '@components/Bonds/BondActions'
import { BondSelector } from '@components/Bonds/BondSelector'
import { ProfileHeader } from '@components/Bonds/ProfileHeader'

import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid
} from '@mui/material'
import { useEffect, useState } from 'react'
import api from '@services/api'
import { Bond } from '@services/api/types/Bonds'
import { GetServerSidePropsContext } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import MainGrid from '@components/MainGrid'
import { withToken } from '@services/api/types/Login'
import { userInitialState } from '@contexts/User'
import useCachedUser from '@hooks/useCachedUser'
export default function BondsPage (props: { bonds: Bond[], credentials: withToken }) {
  const [currentBond, setCurrentBond] = useState<string>(props.bonds[0].registration)
  const { user, setUser, valid: validUser, setValid: setValidUser } = useCachedUser()
  useEffect(() => {
    props.bonds.map(async bond => {
      const getCoursesResponse = await api.getCourses(props.credentials, bond.registration)
      if (getCoursesResponse.success) {
        localStorage.setItem(`courses@${bond.registration}`, JSON.stringify(getCoursesResponse.data?.bond.courses))
      } else {
        console.error(getCoursesResponse.message)
      }
    })
  }, [props.bonds, props.credentials])
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
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('bonds')
    destroyCookie(null, 'token')
    destroyCookie(null, 'username')
    router.push('/')
  }
  return (
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
          <Collapse
            in={true}
          >
            <CardContent>
              <ProfileHeader Profile={{
                fullName: user.fullName,
                profilePictureURL: user.profilePictureURL
              }}
              />
              <BondSelector
                bonds={props.bonds}
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
        </Card>
      </Grid>
    </MainGrid>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const credentials = {
    username: cookies.username,
    token: cookies.token
  }
  const response = await api.getBonds(credentials)
  if (response.success && response.data) {
    return {
      props: {
        bonds: response.data.bonds,
        credentials
      }
    }
  } else {
    console.error(response.message)
    return {
      props: {
        bonds: [],
        credentials
      }
    }
  }
}
