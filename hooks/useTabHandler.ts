import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export enum BondTab {
  ACTIVITIES = 0,
  GRADES = 1,
  ABSENCES = 2,
  COURSES = 3,
  SCHEDULES = 4,
}
export enum CourseTab {
  LESSONS = 0,
  SYLLABUS = 1,
}
export default function useTabHandler({
  order,
  registration,
  courseId
}: {
  order: number;
  registration: string | undefined;
  courseId?: string;
}) {
  const router = useRouter()
  const [tab, setTab] = useState(order);
  useEffect(() => {
    if (registration) {
      let path = ""
      if (courseId) {
        switch (tab) {
          case CourseTab.LESSONS:
            path = `/bond/${registration}/course/${courseId}/`;
            break;
          case CourseTab.SYLLABUS:
            path = `/bond/${registration}/course/${courseId}/syllabus`;
            break;
          default:
            path = `/bond/${registration}/courses/`;
            break;
        }
      } else {
        switch (tab) {
          case BondTab.ACTIVITIES:
            path = `/bond/${registration}/`;
            break;
          case BondTab.GRADES:
            path = `/bond/${registration}/grades`;
            break;
          case BondTab.ABSENCES:
            path = `/bond/${registration}/absences`;
            break;
          case BondTab.COURSES:
            path = `/bond/${registration}/courses`;
            break;
          case BondTab.SCHEDULES:
            path = `/bond/${registration}/schedules`;
            break;
          default:
            path = `/`;
            break;
        }
      }
      if (path === "/") {
        router.push("/");
      } else {
        router.push(path);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, registration, courseId])
  return { tab, setTab, order, registration };
}