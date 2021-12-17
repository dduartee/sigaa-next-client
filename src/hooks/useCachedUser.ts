import { userInitialState } from '@contexts/User'
import { User } from '@services/api/types/User'
import { useEffect, useState } from 'react'

const useCachedUser = () => {
  const [user, setUser] = useState<User>(userInitialState)
  const [valid, setValid] = useState<boolean>(true)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') ?? '') as User &{createdAt: string}
    const createdAtDate = new Date(user.createdAt)
    const now = new Date()
    const diff = now.getTime() - createdAtDate.getTime()
    const sevenDays = 1000 * 60 * 60 * 24 * 7
    if (diff < sevenDays) {
      setUser(user)
    } else {
      localStorage.removeItem('user')
      setValid(false)
    }
  }, [])
  return { user, setUser, valid, setValid }
}
export default useCachedUser
