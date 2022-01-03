/* eslint-disable @next/next/no-img-element */
import { CardContent } from '@mui/material'

export function ProfileHeader (props: { Profile: { fullName: string, profilePictureURL: string }; }) {
  const { Profile } = props
  return (
    <CardContent
      sx={{
        overflow: 'visible',
        padding: 0,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <img
        src={Profile.profilePictureURL}
        alt="profilePicture"
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'cover',
          borderRadius: '50%',
          marginTop: '-50px',
          userSelect: 'none'
        }} />
      <p style={{ fontSize: '1.25rem', border: 0, margin: 0 }}>
        {Profile.fullName}
      </p>
    </CardContent>
  )
}
