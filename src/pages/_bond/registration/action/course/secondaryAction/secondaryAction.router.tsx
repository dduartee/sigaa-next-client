import { useRouteMatch, Route, Switch } from "react-router-dom";
import { CourseRouterParams } from "../course.router";
import ActivitiesSecondaryPage from "./activities.page";
import GradesSecondaryPage from "./grades.page";
import NewsSecondaryPage from "./news.page";
export interface SecondaryActionRouterParams extends CourseRouterParams {
  secondaryAction: string;
}
export default function SecondaryActionRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/news`} exact>
        <NewsSecondaryPage />
      </Route>
      <Route path={`${match.path}/grades`} exact>
        <GradesSecondaryPage />
      </Route>
      <Route path={`${match.path}/activities`} exact>
        <ActivitiesSecondaryPage />
      </Route>
    </Switch>
  );
}
