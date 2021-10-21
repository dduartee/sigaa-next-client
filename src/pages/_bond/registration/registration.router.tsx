import BottomTabs from "@components/BottomTabs";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import { BondRouterParams } from "../bond.router";
import ActionRouter from "./action/action.router";
import RegistrationPage from "./registration.page";

export default function RegistrationRouter() {
  const params = useParams() as BondRouterParams;
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
