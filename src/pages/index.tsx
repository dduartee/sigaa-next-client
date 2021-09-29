import * as React from "react";
import {
  AccountCircle,
  Lock,
  AccountBalance,
  ExitToApp,
  Send,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Typography,
} from "@mui/material";
import { InputBox } from "@components/Login/Input";
import {
  credentialsArgs,
  LoginHook,
  optionsArgs,
} from "@hooks/Auth/Login";
import { IProfileSchema } from "@contexts/Profile";
import { DataContext } from "@contexts/Data";
import { Bond } from "@types";
import { BondListHook } from "@hooks/Bond/List";
export default function Index() {
  const [vinculo, setVinculo] = React.useState("");
  const [options, setOptions] = React.useState<optionsArgs>({
    institution: "",
    url: "",
  });
  const [error, setError] = React.useState<boolean>(false);
  const [retryLogin, setRetryLogin] = React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState<credentialsArgs>({
    password: "",
    username: "",
    unique: undefined,
  });
  const { Data } = React.useContext(DataContext);
  const bondListHook = BondListHook(setError);
  const { getBonds } = bondListHook;

  const setCredentialsMerge = ({
    name,
    value,
  }: {
    name: string;
    value: any;
  }) => {
    setCredentials({ ...credentials, [name]: value } as credentialsArgs);
  };
  const handleAccess = () => {
    // redirect to homepage
  };
  const handleLogin = (credentials: credentialsArgs, options: optionsArgs) => {
    setStatus("Logando");
    setError(false);
    emitLogin(options, credentials);
  };
  const handleLogout = () => {
    setStatus("Deslogando");
    emitLogout(options, {
      username: credentials.username,
      unique: credentials.unique ?? localStorage.getItem("unique") ?? "",
      password: undefined,
    });
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleLogin(credentials, options);
    }
    setError(false);
  };
  const loginHook = LoginHook(
    setError,
    setCredentials,
    setCredentialsMerge,
    setRetryLogin,
    (unique: string, username: string) => {
      getBonds({
        credentials: {
          password: undefined,
          unique,
          username,
        },
        options: JSON.parse(
          localStorage.getItem("options") ?? "{url: '', institution: ''}"
        ),
        query: { type: "student" },
      });
    }
  );
  const { Profile, emitLogin, setStatus, status, emitLogout } = loginHook;
  React.useEffect(() => {
    setVinculo(Data[0].registration);
  }, [Data]);
  React.useEffect(() => {
    if (!vinculo) setVinculo(Data[0].registration);
  }, [vinculo, Data]);
  React.useEffect(() => {
    emitLogin(options, credentials);
  }, [retryLogin]);
  React.useEffect(() => {
    if (options.institution != "") {
      localStorage.setItem("options", JSON.stringify(options));
    }
  }, [options]);
  React.useEffect(() => {
    const unique = localStorage.getItem("unique");
    const options = JSON.parse(
      localStorage.getItem("options") ?? ""
    ) as optionsArgs;
    const username = localStorage.getItem("username");
    if (!!unique) {
      setCredentialsMerge({ name: "unique", value: unique });
      if (options.institution && options.url) {
        setOptions(options);
        if (!!username) {
          setCredentialsMerge({ name: username, value: username });
          handleLogin({ username, unique, password: undefined }, options);
        }
      }
    }
  }, []);
  const handleChangeVinculo = (
    _event: React.MouseEvent<HTMLElement>,
    nextVinculo: string
  ) => {
    setVinculo(nextVinculo);
  };
  const IsLoggedIn = status === "Logado";
  const logando = status === "Logando";
  const deslogando = status === "Deslogando";
  const esperando = logando || deslogando;
  const loggedOut = WhileIsLoggedOut();
  const loggedIn = WhileIsLoggedIn();

  const [institution, setInstitution] = React.useState<string>("");
  const changeInstitution = (event: { target: { value: string } }) => {
    setInstitution(event.target.value);
    const [institution, url] = event.target.value.split(" - ");
    setOptions({ institution, url });
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Grid item sx={{ m: 4, width: "300px" }}>
        <Card
          variant="elevation"
          sx={{ overflow: "visible", borderRadius: "9px" }}
        >
          <Collapse in={IsLoggedIn}>{loggedIn.cardHeader(Profile)}</Collapse>
          <CardContent>
            <Collapse in={!IsLoggedIn && !esperando} timeout={250}>
              {loggedOut.form(
                institution,
                {
                  username: credentials.username,
                  password: credentials.password,
                },
                changeInstitution,
                setCredentialsMerge,
                error,
                {
                  onKeyPress: handleKeyPress,
                }
              )}
            </Collapse>
            {!!Data[0].registration && IsLoggedIn && !esperando ? (
              <Collapse
                in={IsLoggedIn && !esperando && !!Data[0].registration}
                timeout={250}
              >
                {loggedIn.bondSelector(Data, vinculo, handleChangeVinculo)}
              </Collapse>
            ) : IsLoggedIn && !esperando ? (
              <p>Estamos recebendo seus vinculos...</p>
            ) : null}
            {retryLogin && esperando ? <p>Tentando novamente...</p> : null}
          </CardContent>
          {esperando ? (
            <CardContent>
              <Collapse in={esperando} sx={{ width: "100%" }}>
                <Box justifyContent="center" display="flex">
                  <CircularProgress />
                </Box>
              </Collapse>
            </CardContent>
          ) : null}
          <CardActions>
            {!esperando ? (
              <Collapse in={!esperando} sx={{ width: "100%" }}>
                {IsLoggedIn
                  ? loggedIn.buttonSignOut(handleLogout, handleAccess)
                  : loggedOut.buttonSignIn(() =>
                      handleLogin(credentials, options)
                    )}
              </Collapse>
            ) : null}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

const WhileIsLoggedIn = () => {
  const buttonSignOut = (
    handleLogout: () => void,
    handleAccess: () => void
  ) => (
    // align buttons space between
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="contained"
        fullWidth
        onClick={handleLogout}
        sx={{ margin: 0.5 }}
        startIcon={
          <Box dir="rtl" display="flex">
            <ExitToApp />
          </Box>
        }
      >
        Sair
      </Button>
      <Button
        variant="contained"
        fullWidth
        onClick={handleAccess}
        sx={{ margin: 0.5 }}
        endIcon={
          <Box display="flex">
            <Send />
          </Box>
        }
      >
        Acessar
      </Button>
    </Box>
  );
  const bondSelector = (
    data: Bond[],
    vinculo: string,
    handleChangeVinculo: (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
      value: any
    ) => void
  ) => (
    <Box textAlign="center">
      <Typography>Escolha um vínculo para acessar</Typography>
      <ToggleButtonGroup
        exclusive
        aria-label=""
        value={vinculo}
        onChange={handleChangeVinculo}
        orientation="vertical"
      >
        {data?.map((value, index) => {
          return (
            <ToggleButton
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#268E36",
                  color: "#ffffff",
                  transition:
                    "background-color .25s cubic-bezier(.4,0,.2,1) 0ms,box-shadow .25s cubic-bezier(.4,0,.2,1) 0ms,border-color .25s cubic-bezier(.4,0,.2,1) 0ms,color .25s cubic-bezier(.4,0,.2,1) 0ms,-webkit-box-shadow .25s cubic-bezier(.4,0,.2,1) 0ms",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#1b7d2b90",
                },
              }}
              key={index}
              value={value.registration}
              style={{
                marginTop: ".5rem",
                marginLeft: "1rem",
                marginRight: "1rem",
                marginBottom: ".5rem",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "4px",
                color: "#fff",
              }}
            >
              {value.program}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
  const cardHeader = (Profile: IProfileSchema) => (
    <CardContent
      sx={{
        overflow: "visible",
        padding: 0,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={Profile.profilePictureURL}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "50%",
          marginTop: "-50px",
          userSelect: "none",
        }}
      />
      <p style={{ fontSize: "1.25rem", border: 0, margin: 0 }}>
        {Profile.fullName}
      </p>
    </CardContent>
  );
  return {
    buttonSignOut,
    cardHeader,
    bondSelector,
  };
};

const WhileIsLoggedOut = () => {
  const buttonSignIn = (handleLogin: () => void) => (
    <Button
      variant="contained"
      fullWidth
      onClick={handleLogin}
      endIcon={<Send />}
    >
      Entrar
    </Button>
  );
  const form = (
    institution: string,
    credentials: { username: string; password: string | undefined },
    changeInstitution: (event: {
      target: {
        value: string;
      };
    }) => void,
    setCredentialsMerge: ({
      name,
      value,
    }: {
      name: string;
      value: any;
    }) => void,
    error: boolean,
    props: React.DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >
  ) => {
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
      </form>
    );
  };
  return {
    buttonSignIn,
    form,
  };
};
