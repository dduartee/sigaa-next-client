import { Bond } from '@services/api/types/Bonds'
import { useState, useEffect } from 'react'

const useCachedBonds = () => {
  const [bonds, setBonds] = useState<Bond[]>([])
  const [valid, setValid] = useState<boolean>(true)

  useEffect(() => {
    const bonds = JSON.parse(localStorage.getItem('bonds') ?? '') as Bond[] &{createdAt: string}
    const createdAtDate = new Date(bonds.createdAt)
    const now = new Date()
    const diff = now.getTime() - createdAtDate.getTime()
    const sevenDays = 1000 * 60 * 60 * 24 * 7
    if (diff < sevenDays) {
      setBonds(bonds)
    } else {
      localStorage.removeItem('bonds')
      setValid(false)
    }
  }, [])
  return {
    bonds,
    valid,
    setValid
  }
}

export default useCachedBonds
