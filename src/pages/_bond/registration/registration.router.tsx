import { useRouteMatch, Route, Switch } from "react-router-dom";
import ActionRouter from "./action/action.router";
import RegistrationPage from "./registration.page";
export interface BondRouterParams {
  registration: string;
}
export default function RegistrationRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} exact>
        <RegistrationPage />
      </Route>
      <Route path={`${match.path}`} exact>
        <ActionRouter />
      </Route>
    </Switch>
  );
}
