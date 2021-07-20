import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import { Grid } from "@material-ui/core";
function Input(props: TextFieldProps) {
  return <TextField {...props} variant="standard" fullWidth />;
}

function InputBox({ icon, input }: InputBoxProps) {
  return (
    <Grid
      container
      alignItems="center"
      width="90%"
      justifyContent="center"
      spacing={1}
      mb={0.5}
    >
      <Grid item marginTop="8px">
        {icon}
      </Grid>
      <Grid item width="85%">
        {input}
      </Grid>
    </Grid>
  );
}
type InputBoxProps = {
  children?: React.ReactNode;
  icon: React.ReactNode;
  input: React.ReactNode;
};
export { Input, InputBox };
