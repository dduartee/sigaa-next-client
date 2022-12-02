import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useTabHandler({
  order,
  valid,
  registration,
  courseId
}: {
  order: number;
  valid: boolean;
  registration: string;
  courseId?: string;
}) {
  const router = useRouter()
  const [tab, setTab] = useState(order);
  useEffect(() => {
    let path = ""
    if (courseId) {
      switch (tab) {
        case 0:
          path = `/bond/${registration}/courses`;
          break;
        case 1:
          path = `/bond/${registration}/course/${courseId}`;
          break;
        default:
          path = `/`;
          break;
      }
    } else {
      switch (tab) {
        case 0:
          path = `/bond/${registration}/`;
          break;
        case 1:
          path = `/bond/${registration}/grades`;
          break;
        case 2:
          path = `/bond/${registration}/absences`;
          break;
        case 3:
          path = `/bond/${registration}/courses`;
          break;
        case 4:
          path = `/bond/${registration}/schedules`;
          break;
        default:
          path = `/`;
          break;
      }
    }
    if (path === "/") {
      window.location.href = "/";
    } else {
      router.push(path);
    }
  }, [tab, registration, courseId])
  return { tab, setTab, order, valid, registration };
}