import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  NoSsr,
  Paper,
  TextField,
  CircularProgress,
  Collapse,
  Fade,
  ToggleButton,
  ToggleButtonGroup,
  Grow,
} from "@material-ui/core";
import {
  AccountCircle,
  Lock,
  Send,
  Logout,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { Bond, UserCredentials, UserInfo, UserStatus } from "@types";
import Link from "next/link";
import Particulas from "@components/Particles";
import { SocketContext } from "@context/socket";
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
  topCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loginCard: {
    marginTop: "1rem",
    marginRight: "1rem",
    marginLeft: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonCard: {
    margin: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  inputCard: {
    marginBottom: "1rem",
  },
  profilePicture: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    marginTop: "-50px",
    userSelect: "none",
  },

  box: { display: "flex", alignItems: "flex-end", marginBottom: "1rem" },
});

export default function Index(): JSX.Element {
  const [status, setStatus] = useState<UserStatus>("Deslogado");
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
    token: "",
  });
  const [user, setUser] = useState<UserInfo>({
    fullName: "",
    profilePictureURL: "https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png",
  });
  const [data, setData] = useState<Bond[]>([
    {
      program: "",
      registration: "",
      courses: [],
    },
  ]);
  const [vinculo, setVinculo] = useState("");
  const handleChangeVinculo = (
    event: React.MouseEvent<HTMLElement>,
    nextVinculo: string
  ) => {
    setVinculo(nextVinculo);
  };
  const handleChange = (event: {
    target: HTMLTextAreaElement | HTMLInputElement;
  }) => setCredentialsMerge(event.target);

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
  useEffect(() => {
    socket.emit("auth::valid", { token: localStorage.getItem("token") });
    socket.on("auth::valid", (valid: boolean) => {
      if (valid) {
        setCredentialsMerge({
          name: "token",
          value: localStorage.getItem("token"),
        });
        return socket.emit("user::login", {
          token: localStorage.getItem("token"),
        }); // tenta logar pelo cache
      }
    });

    socket.onAny((...args: any[]) => {
      console.log(args);
    });
    socket.on("user::status", (status: UserStatus) => {
      setStatus(status);
      console.log(status);
    });
    socket.on("auth::store", (token: string) => {
      localStorage.setItem("token", token);
      setCredentialsMerge({ name: "token", value: token });
    });
    socket.on("user::login", (data: string) => {
      const { logado } = JSON.parse(data);
      console.log(logado);
      if (logado) {
        socket.emit("user::info", { token: localStorage.getItem("token") });
        socket.emit("bonds::list", {
          token: localStorage.getItem("token"),
          inactive: true,
        });
      }
    });
    socket.on("user::info", (data: string) => {
      const { fullName, profilePictureURL } = JSON.parse(data);
      localStorage.setItem(
        "user",
        JSON.stringify({ fullName, profilePictureURL })
      );
      setUser({ fullName, profilePictureURL });
      console.log(data);
    });
    socket.on("bonds::list", (data: string) => {
      const bondsJSON = JSON.parse(data);
      setData(bondsJSON);
    });
  }, []);
  useEffect(() => {
    setVinculo(data[0].registration);
  }, [data]);
  const handleLogout = () => {
    socket.emit("user::logoff", { token: localStorage.getItem("token") });
  };

  const styles = useStyles();
  const conditionals = {
    willLogout: status === "Deslogando",
    willLogin: status === "Logando",
    isLoggedIn: status === "Logado",
    isLoggedOut: status === "Deslogado",
    hasFullName: user.fullName ? true : false,
    hasBond: data[0].program ? true : false,
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
            <Fade in={conditionals.hasFullName && conditionals.isLoggedIn}>
              <Collapse
                in={conditionals.hasFullName && conditionals.isLoggedIn}
                sx={
                  user.fullName
                    ? { overflow: "visible" }
                    : { overflow: "hidden" }
                }
              >
                <div className={styles.topCard}>
                  <img
                    src={user.profilePictureURL}
                    className={styles.profilePicture}
                  />
                  <p style={{ fontSize: "1.25rem" }}>{user.fullName}</p>
                </div>
              </Collapse>
            </Fade>

            <Collapse in={conditionals.isLoggedOut}>
              <div className={styles.loginCard}>
                <div className={styles.box}>
                  <AccountCircle
                    style={{ color: "action.active", margin: "0.25rem" }}
                  />
                  <TextField
                    fullWidth
                    id="input-with-icon-textfield"
                    label="Usuário"
                    variant="standard"
                    type="text"
                    name="username"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.box}>
                  <Lock style={{ color: "action.active", margin: "0.25rem" }} />
                  <TextField
                    fullWidth
                    id="input-with-icon-textfield"
                    label="Senha"
                    variant="standard"
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Collapse>
            <Collapse in={conditionals.hasBond && conditionals.isLoggedIn}>
              <Grow
                in={conditionals.hasBond && conditionals.isLoggedIn}
                timeout={500}
              >
                <div>
                  <p style={{ textAlign: "center" }}>
                    Escolha um vínculo para acessar
                  </p>
                  <Grow
                    in={conditionals.hasBond && conditionals.isLoggedIn}
                    timeout={750}
                  >
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
            <div className={styles.buttonCard}>
              {conditionals.willLogin || conditionals.willLogout ? (
                <CircularProgress style={{ alignSelf: "center" }} />
              ) : conditionals.isLoggedIn ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    endIcon={<Logout />}
                    onClick={handleLogout}
                    fullWidth
                    sx={{ margin: ".25rem" }}
                  >
                    Sair
                  </Button>
                  <Link
                    href={`/${encodeURIComponent(vinculo)}`}
                    prefetch={true}
                    as={`/bond/${encodeURIComponent(vinculo)}`}
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
                </div>
              ) : conditionals.isLoggedOut ? (
                <Button
                  variant="outlined"
                  endIcon={<Send />}
                  onClick={handleLogin}
                  fullWidth
                >
                  Login
                </Button>
              ) : null}
            </div>
          </Paper>
        </Grid>
      </Fade>
    </NoSsr>
  );
}
