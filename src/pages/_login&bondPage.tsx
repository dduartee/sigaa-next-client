import { LoginActions } from "@components/Login/LoginActions";
import {
  Card,
  Button,
  CardActions,
  CardContent,
  Box,
  Typography,
  Collapse,
  LinearProgress,
  LinearProgressProps,
} from "@mui/material";
import React, { useContext } from "react";
import Bonds from "./_bonds";
import LoginForm from "@components/Login/LoginForm";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import {
  credentialsArgs,
  LoginHook,
  optionsArgs,
  useSessionCredentials,
} from "@hooks/Auth/Login";
import { BondListHook } from "@hooks/Bond/List";
import { DataContext } from "@contexts/Data";
import { ExitToApp, Send } from "@mui/icons-material";
import { useLoadingAPI } from "@hooks/Loading";
function initalizateHooks() {
  const [retryLogin, setRetryLogin] = React.useState<boolean>(false);
  const [vinculo, setVinculo] = React.useState("");
  const [options, setOptions] = React.useState<optionsArgs>({
    institution: "",
    url: "",
  });
  const [error, setError] = React.useState<boolean>(false);
  const { loadingPercent } = useLoadingAPI();
  const [credentials, setCredentials] = React.useState<credentialsArgs>({
    password: "",
    username: "",
    unique: undefined,
  });
  const setCredentialsMerge = ({
    name,
    value,
  }: {
    name: string;
    value: any;
  }) => {
    setCredentials({ ...credentials, [name]: value } as credentialsArgs);
  };
  const [institution, setInstitution] = React.useState<string>("");
  const changeInstitution = (event: { target: { value: string } }) => {
    setInstitution(event.target.value);
    const [institution, url] = event.target.value.split(" - ");
    setOptions({ institution, url });
  };
  const sessionCredentials = useSessionCredentials();

  React.useEffect(() => {
    const { options, unique, username } = sessionCredentials;
    setOptions(options);
    setCredentials({
      password: undefined,
      username,
      unique,
    });
  }, []);
  return {
    retryLogin,
    setRetryLogin,
    vinculo,
    setVinculo,
    options,
    setOptions,
    error,
    setError,
    credentials,
    setCredentials,
    setCredentialsMerge,
    institution,
    setInstitution,
    changeInstitution,
    loadingPercent,
  };
}
export default function login() {
  const hooks = initalizateHooks();
  const { Data } = useContext(DataContext);
  const {
    setRetryLogin,
    options,
    setError,
    credentials,
    setCredentials,
    setCredentialsMerge,
    retryLogin,
    loadingPercent,
  } = hooks;
  const bondListHook = BondListHook(setError);
  const { getBonds } = bondListHook;
  const loginHook = LoginHook(
    setError,
    setCredentials,
    setCredentialsMerge,
    setRetryLogin,
    (unique: string, username: string) => {
      getBonds({
        credentials: {
          unique,
          username,
          password: undefined,
        },
        options: JSON.parse(
          localStorage.getItem("options") ?? '{institution: "", url: ""}'
        ),
        query: { type: "student" },
      });
    }
  );
  const handleLogin = () => {
    setStatus("Logando");
    setError(false);
    authEmitter.login(options, credentials); // neste ponto o servidor se resolve, se tiver unique loga com sessão, se não loga com credenciais
  };
  const handleEnterPress = (event: any) => {
    if (event.key === "Enter") {
      handleLogin();
    }
    setError(false);
  };
  const { User, Profile, setStatus, status, authEmitter } = loginHook;
  const conditionals = {
    isLoggingIn: status === "Logando",
    isLoggingOut: status === "Deslogando",
    isLoggedIn: status === "Logado",
    isLoggedOut: status === "Deslogado",
    isWaiting: status === "Logando" || status === "Deslogando",
  };
  const handleLogout = () => {
    setStatus("Deslogando");
    const { unique, username } = credentials;
    authEmitter.logout(options, {
      password: undefined,
      username,
      unique: unique ?? "null",
    });
  };
  React.useEffect(() => {
    if (retryLogin === true) {
      //setRetryLogin(false);
      handleLogin();
    }
  }, [retryLogin]);
  return (
    <Box width="100%" display={"flex"} height="100%" justifyContent={"center"}>
      <Card sx={{ overflow: "visible", borderRadius: "9px", width: 300 }}>
        <Switch>
          <>
            <Collapse in={conditionals.isWaiting}>
              <Box
                display="flex"
                flexDirection={"column"}
                textAlign={"center"}
                alignItems={"center"}
                width="100%"
              >
                {retryLogin ? (
                  <Typography fontSize={"1rem"}>
                    Tentando novamente...
                  </Typography>
                ) : null}
                <Box width={"100%"}>
                  <Collapse timeout={700} in={conditionals.isWaiting}>
                    <LinearProgress
                      variant="determinate"
                      value={loadingPercent}
                      style={{ width: "90%", margin: "1rem" }}
                    />
                  </Collapse>
                  <Collapse timeout={1000} in={conditionals.isWaiting}>
                    <p>{loadingPercent}%</p>
                  </Collapse>
                </Box>
              </Box>
            </Collapse>
            <Route path="/login">
              <Collapse in={!conditionals.isWaiting}>
                <CardContent>
                  <LoginForm hooks={hooks} onKeyPress={handleEnterPress} />
                </CardContent>
                <CardActions>
                  <LoginActions handleLogin={handleLogin} />
                </CardActions>
              </Collapse>
            </Route>
          </>
        </Switch>
      </Card>
    </Box>
  );
}
function LinearProgressWithLabel(props: any) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          style={{ width: "100%" }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
