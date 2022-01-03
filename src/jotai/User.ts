import { User } from '@services/api/types/User'
import { atomWithStorage } from 'jotai/utils'

type UserAtomType = User & {
  createdAt: Date
}

const userInitialState = {
  fullName: '',
  emails: [],
  institution: '',
  profilePictureURL: 'https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png',
  username: '',
  createdAt: new Date()
} as UserAtomType
const userAtom = atomWithStorage<UserAtomType>('user', userInitialState)

type setUserAction = {
  type: 'SET_USER'
  payload: UserAtomType
}
type resetUserAction = {
  type: 'RESET_USER'
}
type unknownAction = {
  type: string,
  payload?: any
}
type UserActions = setUserAction | resetUserAction | unknownAction
const userReducer = (_state: UserAtomType, action: UserActions) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'RESET_USER':
      return userInitialState
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
export {
  userAtom,
  userReducer
}
