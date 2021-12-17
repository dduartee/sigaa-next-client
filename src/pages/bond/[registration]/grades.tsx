import BottomTabs, { primaryActionTabs } from '@components/BottomTabs'
import useTabHandler from '@hooks/useTabHandler'
import { User } from '@services/api/types/User'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { Course } from '@services/api/types/Courses'
import api from '@services/api'
import MainGrid from '@components/MainGrid'
import { Box } from '@mui/system'

export default function GradesPage (props: { coursesWithGrades: Course[], user: User }) {
  const { query } = useRouter()
  const { tab, setTab } = useTabHandler({ page: 'grades' })
  const registration = query.registration as string
  return (
    <>
    <MainGrid>
      <Box width="90%" display="flex">
      <h3>Grades</h3>
      <p>{registration}</p>
      <div>
        {props.coursesWithGrades.map(course => (
          <><div key={course.id}>
            <h4>{course.title}</h4>
            {course.gradeGroups?.map(gradeGroup => (
              <><div key={gradeGroup.name}>
                <h5>{gradeGroup.name}</h5>
                <p>{gradeGroup.value}</p>
              </div></>
            ))}
          </div></>
        ))}
      </div>
      </Box>
      </MainGrid>
      <BottomTabs
        tabHook={{
          tab, setTab
        }}
        tabsData={primaryActionTabs(registration, props.user.profilePictureURL)}
      />
        </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const credentials = {
    token: cookies.token,
    username: cookies.username
  }
  const userResponse = await api.getUser(credentials)
  const user = userResponse.data?.user
  const gradesResponse = await api.getGrades(credentials, context.query.registration as string)
  if (gradesResponse.success && gradesResponse.data) {
    return {
      props: {
        coursesWithGrades: gradesResponse.data.courses as Course[],
        user
      }
    }
  } else {
    console.error(gradesResponse.message)
    return {
      props: {
        coursesWithGrades: []
      }
    }
  }
}

export interface Grade { name: string; value?: number; }
export interface SubGrade extends Grade { code: string; }
export interface SubGradeSumOfGrades extends SubGrade { maxValue: number; }
export interface SubGradeWeightedAverage extends SubGrade { weight: number; }
export interface GradeGroupOnlyAverage extends Grade { type: 'only-average'; }
export interface GradeGroupWeightedAverage extends Grade { grades: SubGradeWeightedAverage[]; type: 'weighted-average'; }
export interface GradeGroupSumOfGrades extends Grade { grades: SubGradeSumOfGrades[]; type: 'sum-of-grades'; }
export declare type GradeGroup = GradeGroupSumOfGrades | GradeGroupOnlyAverage | GradeGroupWeightedAverage;
