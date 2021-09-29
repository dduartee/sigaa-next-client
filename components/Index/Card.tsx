import { Grid, GridProps } from "@material-ui/core";
import React from "react";

function CardHeader(props: GridProps) {
  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      display="flex"
      {...props}
    />
  );
}

function CardBottom(props: GridProps) {
  return (
    <Grid
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      display="flex"
      m="1rem"
      {...props}
    />
  );
}

export { CardHeader, CardBottom };
