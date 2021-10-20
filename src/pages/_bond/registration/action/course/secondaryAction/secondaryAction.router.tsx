import { useRouteMatch, Route, Switch, useParams } from "react-router-dom";
import { CourseRouterParams } from "../course.router";
export interface SecondaryActionRouterParams extends CourseRouterParams {
  secondaryAction: string;
}
export default function SecondaryActionRouter() {
  const match = useRouteMatch();
  const params = useParams() as SecondaryActionRouterParams;
  return (
    <Switch>
      <Route path={`${match.path}/news`} exact>
        <h3>News of {params.courseID}</h3>
      </Route>
      <Route path={`${match.path}/grades`} exact>
        <h3>Grades of {params.courseID}</h3>
      </Route>
      <Route path={`${match.path}/activities`} exact>
        <h3>Activities of {params.courseID}</h3>
      </Route>
    </Switch>
  );
}
