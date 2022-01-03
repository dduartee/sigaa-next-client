import { Bond } from '@services/api/types/Bonds'
import { Course } from '@services/api/types/Courses'
import { atomWithStorage } from 'jotai/utils'

const bondsInitialState: Bond[] = []

const bondsAtom = atomWithStorage<Bond[]>('bonds', bondsInitialState)

type setBondsAction = {
  type: 'SET_BONDS'
  payload: Bond[]
}
type pushCoursesAction = {
  type: 'PUSH_COURSES'
  payload: { registration: string, courses: Course[] }
}
type resetBondsAction = {
  type: 'RESET_BONDS'
}
type unknownAction = {
  type: string,
  payload?: any
}
type BondsActions = setBondsAction | resetBondsAction | pushCoursesAction | unknownAction
const bondsReducer = (state: Bond[], action: BondsActions) => {
  switch (action.type) {
    case 'SET_BONDS':
      return action.payload
    case 'PUSH_COURSES':
      // eslint-disable-next-line no-case-declarations
      const bond = state.find(b => b.registration === action.payload.registration)
      if (bond) {
        // remove bond from state
        const stateFiltrated = state.filter(b => b.registration !== action.payload.registration)
        // add bond to state
        stateFiltrated.push({
          ...bond,
          courses: action.payload.courses
        })
        return stateFiltrated
      } else {
        return state
      }
    case 'RESET_BONDS':
      return bondsInitialState
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
export {
  bondsAtom,
  bondsReducer
}
