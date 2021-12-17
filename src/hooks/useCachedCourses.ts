import { Course } from '@services/api/types/Courses'
import { useEffect, useState } from 'react'

const useCachedCourses = (registration: string) => {
  const [courses, setCourses] = useState<Course[]>([])
  const [valid, setValid] = useState<boolean>(true)
  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem(`courses@${registration}`) ?? '') as Course[] &{createdAt: string}
    const createdAtDate = new Date(courses.createdAt)
    const now = new Date()
    const diff = now.getTime() - createdAtDate.getTime()
    const sevenDays = 1000 * 60 * 60 * 24 * 7
    if (diff < sevenDays) {
      setCourses(courses)
    } else {
      localStorage.removeItem(`courses@${registration}`)
      setValid(false)
    }
  }, [registration])
  return {
    courses,
    valid,
    setValid
  }
}

export default useCachedCourses
