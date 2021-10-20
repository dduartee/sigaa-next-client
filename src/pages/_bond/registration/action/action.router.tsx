import { BondRouterParams } from "@pages/_bond/bond.router";
import CoursesPage from "@pages/_bond/registration/action/courses.page";
import { useRouteMatch, Route, Switch } from "react-router-dom";
import CourseRouter from "./course/course.router";

export interface ActionRouterParams extends BondRouterParams {
  action: string;
}
export default function ActionRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/courses`} exact>
        <CoursesPage />
      </Route>
      <Route path={`${match.path}/course`}>
        <CourseRouter />
      </Route>
      <Route path={`${match.path}/news`} exact>
        <h3>News</h3>
      </Route>
      <Route path={`${match.path}/grades`} exact>
        <h3>Grades</h3>
      </Route>
      <Route path={`${match.path}/activities`} exact>
        <h3>Activities</h3>
      </Route>
      <Route path={`${match.path}/schedules`} exact>
        <h3>Schedules</h3>
      </Route>
    </Switch>
  );
}
