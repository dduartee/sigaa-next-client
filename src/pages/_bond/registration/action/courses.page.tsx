import BottomTabs, { primaryActionTabs } from "@components/BottomTabs";
import { SocketContext } from "@contexts/Socket";
import useCoursesAPI from "@hooks/useCoursesAPI";
import useDelayedAuthentication from "@hooks/useDelayedAuthentication";
import useTabHandler from "@hooks/useTabHandler";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ActionRouterParams } from "./action.router";

export default function CoursesPage() {
  const params = useParams() as ActionRouterParams;
  const { registration } = params;
  const { tab, setTab } = useTabHandler({ page: "courses" });

  const socket = useContext(SocketContext);
  const { emitGetCourses, storeState } = useCoursesAPI(socket);

  const handleGetCourses = () => {
    const { user, bonds } = storeState;
    emitGetCourses(
      {
        password: undefined,
        username: user.username,
        unique: user.unique,
      },
      {
        bond: {
          registration,
          inactive: !bonds.filter(
            (bond) => bond.registration === registration
          )[0].active,
        },
        type: "student",
      }
    );
  };
  useDelayedAuthentication(handleGetCourses);
  /*const conditionals = {
    isAuthenticated,
    isLoading: storeState.ui.loading,
    error: storeState.ui.error,
  };*/
  const listCourses = storeState.courses.filter(
    (bond) => bond.registration === registration
  )[0].courses;
  return (
    <div>
      <h1>CoursesPage</h1>
      <p>{registration}</p>
      {listCourses.map((course) => (
        <p key={course.courseID}>{course.title}</p>
      ))}
      <BottomTabs
        tab={tab}
        setTab={setTab}
        tabsData={primaryActionTabs(params.registration)}
      />
    </div>
  );
}
