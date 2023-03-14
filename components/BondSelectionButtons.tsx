import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Send, ArrowBack } from "@material-ui/icons";

export function BondSelectionButtons(props: { handleLogout: () => void; handleAccess: () => void; }) {
  return <Grid
    justifyContent="space-evenly"
    alignContent="center"
    display="flex"
    m={1}
  >
    <Button
      variant="contained"
      startIcon={<ArrowBack direction="right" />}
      onClick={props.handleLogout}
      sx={{ margin: ".25rem", width: "45%" }}
    >
      Sair
    </Button>
    <Button
      variant="contained"
      endIcon={<Send />}
      sx={{ margin: ".25rem", width: "45%" }}
      onClick={props.handleAccess}
    >
      Acessar
    </Button>
  </Grid>;
}
