import { withToken } from '@services/api/types/Login'
import { atomWithStorage } from 'jotai/utils'
const credentialsAtom = atomWithStorage<withToken>('credentials', {
  token: '',
  username: ''
})

type setCredentialsAction = {
  type: 'SET_CREDENTIALS'
  payload: withToken
}
type resetCredentialsAction = {
  type: 'RESET_CREDENTIALS'
}
type unknownAction = {
  type: string,
  payload?: any
}
type CredentialsActions = setCredentialsAction | resetCredentialsAction | unknownAction
const credentialsReducer = (_state: withToken, action: CredentialsActions) => {
  switch (action.type) {
    case 'SET_CREDENTIALS':
      return action.payload
    case 'RESET_CREDENTIALS':
      return {
        token: '',
        username: ''
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
export {
  credentialsAtom,
  credentialsReducer
}
