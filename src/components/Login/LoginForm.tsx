import { InputBox } from "@components/Login/Input";
import { AccountCircle, Lock, AccountBalance } from "@mui/icons-material";
import { FormControl, TextField, MenuItem, Collapse } from "@mui/material";
import React from "react";

export default function loginForm(
  props: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > & {
    hooks: {
      institution: string;
      credentials: { username: string; password: string | undefined };
      changeInstitution: (event: {
        target: {
          value: string;
        };
      }) => void;
      setCredentialsMerge: ({
        name,
        value,
      }: {
        name: string;
        value: any;
      }) => void;
      error: boolean;
    };
  }
) {
  const {
    institution,
    credentials,
    changeInstitution,
    setCredentialsMerge,
    error,
  } = props.hooks;
  const [openInstitution, setOpenInstitution] = React.useState(false);
  const [openUsername, setOpenUsername] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);
  setTimeout(() => {
    setOpenUsername(true);
  }, 100);
  setTimeout(() => {
    setOpenPassword(true);
  }, 400);
  setTimeout(() => {
    setOpenInstitution(true);
  }, 600);
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      autoComplete="on"
      {...props}
    >
      <Collapse style={{ width: "100%" }} in={openUsername} timeout={200}>
        <InputBox
          icon={
            <AccountCircle
              sx={{ color: "action.active", mr: 1, marginBottom: "20px" }}
            />
          }
          input={
            <FormControl fullWidth>
              <TextField
                onChange={({ target }) =>
                  setCredentialsMerge({
                    name: target.name,
                    value: target.value,
                  })
                }
                value={credentials.username ?? ""}
                error={error}
                name="username"
                label="Usuário"
                size="small"
                fullWidth
                helperText="Seu usuário na SIGAA"
              />
            </FormControl>
          }
        />
      </Collapse>
      <Collapse style={{ width: "100%" }} in={openPassword} timeout={400}>
        <InputBox
          icon={
            <Lock
              sx={{ color: "action.active", mr: 1, marginBottom: "20px" }}
            />
          }
          input={
            <FormControl fullWidth>
              <TextField
                onChange={({ target }) =>
                  setCredentialsMerge({
                    name: target.name,
                    value: target.value,
                  })
                }
                value={credentials.password ?? ""}
                error={error}
                name="password"
                label="Senha"
                size="small"
                fullWidth
                type="password"
                helperText="Sua senha do SIGAA"
              />
            </FormControl>
          }
        />
      </Collapse>
      <Collapse style={{ width: "100%" }} in={openInstitution} timeout={600}>
        <InputBox
          icon={
            <AccountBalance
              sx={{ color: "action.active", mr: 1, marginBottom: "20px" }}
            />
          }
          input={
            <FormControl fullWidth sx={{ minWidth: 210 }}>
              <TextField
                error={error}
                autoComplete="off"
                id="outlined-select-currency"
                select
                value={institution}
                label="Instituição"
                onChange={changeInstitution}
                size="small"
                helperText="Selecione sua instituição"
                fullWidth
              >
                <MenuItem value="IFSC - https://sigaa.ifsc.edu.br">
                  IFSC
                </MenuItem>
                <MenuItem value="UFPB - https://sigaa.ufpb.br">UFPB</MenuItem>
              </TextField>
            </FormControl>
          }
        />
      </Collapse>
    </form>
  );
}
