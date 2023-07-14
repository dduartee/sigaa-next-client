import { TextFieldProps, TextField, Box } from "@mui/material";
import React from "react";
function Input(props: TextFieldProps) {
  return <TextField {...props} variant="standard" fullWidth />;
}

function InputBox(props: InputBoxProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      width="90%"
      justifyContent="center"
      mb={1}
    >
      <Box marginRight={1} marginTop="8px">
        {props.icon}
      </Box>
      <Box width="85%">
        {props.input}
      </Box>
    </Box>
  );
}
type InputBoxProps = {
  children?: React.ReactNode;
  icon: React.ReactNode;
  input: React.ReactNode;
};
export { Input, InputBox };
