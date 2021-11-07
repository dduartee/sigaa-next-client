import { Card, Grid } from "@mui/material";

import { useRouteMatch, Route, Switch } from "react-router-dom";
import RegistrationRouter from "./registration/registration.router";
export interface BondRouterParams {
  registration: string;
}
export default function BondRouter() {
  const match = useRouteMatch();
  return (
    <Grid
      item
      width={"90%"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      display={"flex"}
      flexDirection={"column"}
      m={2}
    >
      <Card
        sx={{
          borderRadius: "9px",
          width: "100%",
          height: "100%",
        }}
      >
        <Switch>
          <Route path={match.path} exact>
            <h3>Especifique um vinculo</h3>
          </Route>
          <Route path={`${match.path}/:registration`}>
            <RegistrationRouter />
          </Route>
        </Switch>
      </Card>
    </Grid>
  );
}
