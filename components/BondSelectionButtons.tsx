import { ArrowBack, Send } from "@mui/icons-material";
import { Grid, Button } from "@mui/material";
import React from "react";

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
