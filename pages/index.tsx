import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  NoSsr,
  Paper,
  CircularProgress,
  Collapse,
  Fade,
  ToggleButton,
  ToggleButtonGroup,
  Grow,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import {
  AccountCircle,
  Lock,
  Send,
  ArrowBack,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { UserCredentials } from "@types";
import Link from "next/link";
import Particulas from "@components/Particles";
import { SocketContext } from "@context/socket";
import { Input, InputBox } from "@components/Index/Input";
import LoginBox from "@components/Index/LoginBox";
import { CardBottom, CardHeader } from "@components/Index/Card";
import useValidToken from "@hooks/useValidToken";
import useUserLogin from "@hooks/useUserLogin";
import useUserBonds from "@hooks/useUserBonds";
const useStyles = makeStyles({
  container: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
  paperCard: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "20rem",
    height: "auto",
  },
  profilePicture: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    marginTop: "-50px",
    userSelect: "none",
  },
});

function Index(): JSX.Element {
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
    token: "",
  });
  const [vinculo, setVinculo] = useState("");
  const handleChangeVinculo = (
    event: React.MouseEvent<HTMLElement>,
    nextVinculo: string
  ) => {
    setVinculo(nextVinculo);
  };
  const handleChange = (event?: any) => setCredentialsMerge(event.target);

  const setCredentialsMerge = ({
    name,
    value,
  }: {
    name: string;
    value: any;
  }) => {
    setCredentials({ ...credentials, [name]: value } as UserCredentials);
  };
  const handleLogin = () => {
    socket.emit("user::login", credentials); // loga pela "primeira vez" sem o cache
  };
  const socket = useContext(SocketContext);
  const tokenIsValid = useValidToken();
  const { status, user } = useUserLogin();
  const { data } = useUserBonds();
  useEffect(() => {
    if (tokenIsValid) {
      setCredentialsMerge({
        name: "token",
        value: localStorage.getItem("token"),
      });
      socket.emit("user::login", {
        token: localStorage.getItem("token"),
        username: "",
        password: "",
      }); // tenta logar pelo cache
    }
  }, [tokenIsValid]);
  useEffect(() => {
    socket.onAny((...args: any[]) => {
      console.log(args);
    });
    socket.on("auth::store", (token: string) => {
      localStorage.setItem("token", token);
      setCredentialsMerge({ name: "token", value: token });
    });
  }, []);
  useEffect(() => {
    setVinculo(data[0].registration);
  }, [data]);
  const handleLogout = () => {
    socket.emit("user::logoff", { token: localStorage.getItem("token") });
    setCredentials({ username: "", password: "", token: "" });
    localStorage.removeItem("token");
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  useEffect(() => {
    if (!vinculo) setVinculo(data[0].registration);
  }, [vinculo]);
  const styles = useStyles();
  const conditionals = {
    willLogout: status === "Deslogando",
    willLogin: status === "Logando",
    isLoggedIn: status === "Logado",
    isLoggedOut: status === "Deslogado",
    hasFullName: user.fullName ? true : false,
    hasBond: data[0].program ? true : false,
    hasFullNameAndIsLoggedIn:
      (user.fullName ? true : false) && (status === "Logado" ? true : false),
    hasBondAndIsLoggedIn: data[0].program && status === "Logado" ? true : false,
    userIsWaiting: status === "Logando" || status === "Deslogando",
  };

  return (
    <NoSsr>
      <Fade in={true} timeout={1000}>
        <Grid className={styles.container}>
          <Particulas />
          <Paper
            elevation={4}
            className={styles.paperCard}
            style={{ borderRadius: "10px" }}
          >
            <Fade in={conditionals.hasFullNameAndIsLoggedIn}>
              <Collapse
                in={conditionals.hasFullNameAndIsLoggedIn}
                sx={
                  user.fullName
                    ? { overflow: "visible" }
                    : { overflow: "hidden" }
                }
              >
                <CardHeader>
                  <img
                    src={user.profilePictureURL}
                    className={styles.profilePicture}
                  />
                  <p style={{ fontSize: "1.25rem" }}>{user.fullName}</p>
                </CardHeader>
              </Collapse>
            </Fade>
            <Collapse in={conditionals.isLoggedOut}>
              <LoginBox onChange={handleChange} onKeyPress={handleKeyPress}>
                <InputBox
                  icon={<AccountCircle />}
                  input={
                    <FormControl fullWidth>
                      <Input
                        label="Usuário"
                        type="text"
                        name="username"
                        value={credentials.username}
                      />
                      <FormHelperText sx={{ marginLeft: 0, opacity: "0.8" }}>
                        Seu usuário do SIGAA
                      </FormHelperText>
                    </FormControl>
                  }
                />
                <InputBox
                  icon={<Lock />}
                  input={
                    <FormControl fullWidth>
                      <Input
                        label="Senha"
                        type="password"
                        name="password"
                        value={credentials.password}
                      />
                      <FormHelperText sx={{ marginLeft: 0, opacity: "0.8" }}>
                        Sua senha do SIGAA
                      </FormHelperText>
                    </FormControl>
                  }
                />
              </LoginBox>
            </Collapse>
            <Collapse in={conditionals.hasBondAndIsLoggedIn}>
              <Grow in={conditionals.hasBondAndIsLoggedIn} timeout={500}>
                <div>
                  <p style={{ textAlign: "center" }}>
                    Escolha um vínculo para acessar
                  </p>
                  <Grow in={conditionals.hasBondAndIsLoggedIn} timeout={750}>
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
                  </Grow>
                </div>
              </Grow>
            </Collapse>
            <CardBottom>
              {conditionals.userIsWaiting ? ( // usuario esta "esperando" o login ou logout
                <CircularProgress style={{ alignSelf: "center" }} />
              ) : conditionals.isLoggedIn ? ( // usuario esta logado
                <Grid
                  justifyContent="center"
                  alignContent="center"
                  display="flex"
                >
                  <Button
                    variant="contained"
                    startIcon={<ArrowBack direction="right" />}
                    onClick={handleLogout}
                    fullWidth
                    sx={{ margin: ".25rem" }}
                  >
                    Sair
                  </Button>
                  <Link
                    href={`/${encodeURIComponent(vinculo)}`}
                    prefetch={true}
                    as={`/home/${encodeURIComponent(vinculo)}`}
                  >
                    <Button
                      variant="contained"
                      endIcon={<Send />}
                      fullWidth
                      sx={{ margin: ".25rem" }}
                    >
                      Acessar
                    </Button>
                  </Link>
                </Grid>
              ) : conditionals.isLoggedOut ? ( // usuario esta deslogado
                <Button
                  variant="outlined"
                  endIcon={<Send />}
                  onClick={handleLogin}
                  fullWidth
                >
                  Login
                </Button>
              ) : null}
            </CardBottom>
          </Paper>
        </Grid>
      </Fade>
    </NoSsr>
  );
}

export default Index;
