import { useRouteMatch, Route, Switch } from "react-router-dom";
import RegistrationRouter from "./registration/registration.router";

export default function BondRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <h3>Selecione um vinculo...</h3>
      </Route>
      <Route path={`${match.path}/:registration`}>
        <RegistrationRouter />
      </Route>
    </Switch>
  );
}
