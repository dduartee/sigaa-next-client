import { ExitToApp, Send } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
export default function LoginActions(props: { handleLogin: () => void }) {
  const { handleLogin } = props;
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Link
        to="/"
        style={{
          textDecoration: "none",
          width: "100%",
        }}
      >
        <Button
          variant="text"
          fullWidth
          startIcon={
            <Box dir="rtl" display="flex">
              <ExitToApp />
            </Box>
          }
        >
          <Typography fontSize="1rem">Voltar</Typography>
        </Button>
      </Link>
      <Button
        variant="contained"
        fullWidth
        endIcon={<Send />}
        onClick={() => handleLogin()}
      >
        Entrar
      </Button>
    </Box>
  );
}
