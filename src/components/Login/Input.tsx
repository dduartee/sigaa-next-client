import React from "react";
import {
  Box,
  TextField,
  TextFieldProps,
} from "@mui/material";
function Input(props: TextFieldProps) {
  return <TextField {...props} fullWidth />;
}

function InputBox(props: {
  icon: React.ReactNode;
  input: React.ReactNode;
  helper?: React.ReactNode;
}) {
  const { icon, input, helper } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: ".7rem",
      }}
    >
      {icon}
      {input}
      {helper}
    </Box>
  );
}

export { Input, InputBox };
