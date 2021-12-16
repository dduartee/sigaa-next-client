// User Context with User Data

import { User } from '@services/api/types/User'
import { createContext } from 'react'

export const userInitialState: User = {
  fullName: '',
  emails: [],
  institution: '',
  profilePictureURL: 'https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png',
  username: ''
}

export const UserContext = createContext({
  User: userInitialState,
  setUser (_User: User) {}
})
