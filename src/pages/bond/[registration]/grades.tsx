import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import useTabHandler from '@hooks/useTabHandler'
import { useRouter } from 'next/router'
import { Course } from '@services/api/types/Courses'
import api from '@services/api'
import MainGrid from '@components/MainGrid'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { credentialsAtom, credentialsReducer } from '@jotai/Credentials'
import { userAtom, userReducer } from '@jotai/User'
import { useReducerAtom } from 'jotai/utils'
import Head from 'next/head'

export default function GradesPage () {
  const { query } = useRouter()
  const { tab, setTab } = useTabHandler({ page: 'grades' })
  const [{ username, token }] = useReducerAtom(credentialsAtom, credentialsReducer)
  const [user] = useReducerAtom(userAtom, userReducer)
  const [coursesWithGrades, setCoursesWithGrades] = useState<Course[]>([])
  const registration = query.registration as string
  useEffect(() => {
    if (registration) {
      api.getGrades({ username, token }, registration).then(({ message, success, data }) => {
        if (success && data) {
          setCoursesWithGrades(data.courses)
          console.log(data.courses)
        } else {
          console.error(message)
          setCoursesWithGrades([])
        }
      })
    }
  }, [registration, token, username])
  return (
    <>
      <Head>
        <title>Notas - {registration} - sigaa-next-client</title>
      </Head>
      <MainGrid>
        <Box width="90%" display="flex">
          <h3>Grades</h3>
          <p>{registration}</p>
          <div>
            {coursesWithGrades.map(course => (
              <>
                <div key={course.id}>
                  <h4>{course.title}</h4>
                  {course.gradeGroups?.map(gradeGroup => (
                    <>
                      <div key={gradeGroup.name}>
                        <h5>{gradeGroup.name}</h5>
                        <p>{gradeGroup.value}</p>
                      </div>
                    </>
                  ))}
                </div>
              </>
            ))}
          </div>
        </Box>
      </MainGrid>
      <BottomTabs
        tabHook={{
          tab, setTab
        }}
        tabsData={primaryActionTabs(registration, user.profilePictureURL)}
      />
    </>
  )
}

export interface Grade { name: string; value?: number; }
export interface SubGrade extends Grade { code: string; }
export interface SubGradeSumOfGrades extends SubGrade { maxValue: number; }
export interface SubGradeWeightedAverage extends SubGrade { weight: number; }
export interface GradeGroupOnlyAverage extends Grade { type: 'only-average'; }
export interface GradeGroupWeightedAverage extends Grade { grades: SubGradeWeightedAverage[]; type: 'weighted-average'; }
export interface GradeGroupSumOfGrades extends Grade { grades: SubGradeSumOfGrades[]; type: 'sum-of-grades'; }
export declare type GradeGroup = GradeGroupSumOfGrades | GradeGroupOnlyAverage | GradeGroupWeightedAverage;
