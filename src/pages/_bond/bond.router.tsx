import { useRouteMatch, Route, Switch } from "react-router-dom";
import ActionRouter from "./registration/action/action.router";
import RegistrationPage from "./registration/registration.page";
export interface BondRouterParams {
  registration: string;
}
export default function BondRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <h3>Selecione um vinculo...</h3>
      </Route>
      <Route path={`${match.path}/:registration`} exact>
        <RegistrationPage />
      </Route>
      <Route path={`${match.path}/:registration`}>
        <ActionRouter />
      </Route>
    </Switch>
  );
}
