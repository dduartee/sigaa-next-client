import { useRouteMatch, Route, Switch } from "react-router-dom";
import { ActionRouterParams } from "../action.router";
import CourseIDPage from "./course.page";
import SecondaryActionRouter from "./secondaryAction/secondaryAction.router";
export interface CourseRouterParams extends ActionRouterParams {
  courseID: string;
}
export default function CourseRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} exact>
        <h3>Selecione uma matéria...</h3>
      </Route>
      <Route path={`${match.path}/:courseID`} exact>
        <CourseIDPage />
      </Route>
      <Route path={`${match.path}/:courseID`}>
        <SecondaryActionRouter />
      </Route>
    </Switch>
  );
}
