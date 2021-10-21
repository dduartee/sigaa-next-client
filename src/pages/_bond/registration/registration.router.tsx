import { Route, Switch, useRouteMatch } from "react-router";
import ActionRouter from "./action/action.router";
import RegistrationPage from "./registration.page";

export default function RegistrationRouter() {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={`${match.path}`} exact>
          <RegistrationPage />
        </Route>
        <Route path={`${match.path}`}>
          <ActionRouter />
        </Route>
      </Switch>
    </>
  );
}
