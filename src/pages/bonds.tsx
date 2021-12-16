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
import { Bond, BondsRequest, BondsResponse } from '@services/api/types/Bonds'
import { AxiosResponse } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import { User } from '@services/api/types/User'
import MainGrid from '@components/MainGrid'
export default function BondsPage (props: { bonds: Bond[] }) {
  const [currentBond, setCurrentBond] = useState<string>(props.bonds[0].registration)
  const [user, setUser] = useState<User>({
    emails: [],
    fullName: '',
    institution: '',
    profilePictureURL: '',
    username: ''
  })
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') ?? '') as User
    setUser(user)
  }, [])
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

async function getBonds (credentials: { username: string, token: string }): Promise<Bond[]> {
  const { data: response } = await api.post<BondsResponse, AxiosResponse<BondsResponse>, BondsRequest>('/bonds', {
    username: credentials.username,
    token: credentials.token,
    password: undefined
  })
  const { success, data, message } = response
  if (success && data) {
    return data.bonds
  } else {
    console.error(message)
    return []
  }
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const credentials = {
    username: cookies.username,
    token: cookies.token
  }
  const bonds = await getBonds(credentials)
  return {
    props: {
      bonds,
      credentials
    }
  }
}
