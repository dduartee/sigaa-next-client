import { InputBox } from "@components/Login/Input";
import { AccountCircle, Lock, AccountBalance } from "@mui/icons-material";
import {
  FormControl,
  TextField,
  MenuItem,
  Collapse,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { optionsState, setOptions } from "@redux/reducers/options.reducer";
import { credentialsArgs } from "@types";
import React from "react";

export default function LoginForm(
  props: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > & {
    hooks: {
      credentials: credentialsArgs;
      error: boolean;
      setCredentials: (credentials: credentialsArgs) => void;
    };
  }
) {
  // TRANSIÇÕES
  const [openInstitution, setOpenInstitution] = React.useState(false);
  const [openCheckbox, setOpenCheckbox] = React.useState(false);
  const [openUsername, setOpenUsername] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);
  React.useEffect(() => {
    const timeoutOpenUsername = setTimeout(() => {
      setOpenUsername(true);
    }, 100);
    const timeoutOpenPassword = setTimeout(() => {
      setOpenPassword(true);
    }, 400);
    const timeoutOpenInstitution = setTimeout(() => {
      setOpenInstitution(true);
    }, 600);
    const timeoutOpenCheckbox = setTimeout(() => {
      setOpenCheckbox(true);
    }, 800);
    return () => {
      clearTimeout(timeoutOpenUsername);
      clearTimeout(timeoutOpenPassword);
      clearTimeout(timeoutOpenInstitution);
      clearTimeout(timeoutOpenCheckbox);
    };
  }, []);

  const { credentials, setCredentials, error } = props.hooks;
  const dispatch = useAppDispatch();
  const options = useAppSelector(
    (state: { options: optionsState }) => state.options
  );
  const onChangeCredentials = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  const onChangeRememberMe = (
    _event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    dispatch(setOptions({ ...options, rememberMe: checked }));
  };
  const onChangeInstitutionAndURLValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [institution, url] = event.target.value.split(" | ");
    dispatch(setOptions({ ...options, institution, url }));
  };
  const listOfInstitution = [
    {
      institution: "IFSC",
      url: "https://sigaa.ifsc.edu.br",
      disabled: false,
    },
  ];

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
                onChange={onChangeCredentials}
                value={credentials.username ?? ""}
                error={error}
                name="username"
                label="Usuário"
                size="small"
                autoComplete="username"
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
                onChange={onChangeCredentials}
                value={credentials.password ?? ""}
                error={error}
                name="password"
                label="Senha"
                size="small"
                fullWidth
                autoComplete="current-password"
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
                id="outlined-select-currency"
                select
                value={
                  options.institution
                    ? `${options.institution} | ${options.url}`
                    : ""
                }
                label="Instituição"
                onChange={onChangeInstitutionAndURLValue}
                size="small"
                helperText="Selecione sua instituição"
                fullWidth
              >
                {listOfInstitution.map((option) => (
                  <MenuItem
                    key={option.institution}
                    value={`${option.institution} | ${option.url}`}
                    disabled={option.disabled}
                  >
                    {option.institution}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          }
        />
      </Collapse>
      <Collapse in={openCheckbox} sx={{ width: "100%" }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Lembrar de mim"
            value={options.rememberMe}
            onChange={onChangeRememberMe}
          />
        </FormGroup>
      </Collapse>
    </form>
  );
}
