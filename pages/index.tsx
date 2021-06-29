import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
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
  CheckBoxOutlineBlank,
  CheckBox,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import Particles from "react-tsparticles";
import { Bond, UserCredentials, UserInfo, UserStatus } from "@types";
import {
  subscribeEvent,
  sendEvent,
  initiateSocket,
  subscribeAllEvents,
} from "@services/api/socket";
import Link from "next/link";
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
    flexDirection: "column",
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
  particles: {
    "& div": {
      height: "100%",
    },
  },
  box: { display: "flex", alignItems: "flex-end", marginBottom: "1rem" },
});

export default function Index(): JSX.Element {
  let window;
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
    sendEvent("user::login", credentials); // loga pela "primeira vez" sem o cache
  };

  useEffect(() => {
    initiateSocket();
    sendEvent("auth::valid", { token: localStorage.getItem("token") });
    subscribeEvent("auth::valid", (valid: boolean) => {
      if (valid) {
        setCredentialsMerge({
          name: "token",
          value: localStorage.getItem("token"),
        });
        return sendEvent("user::login", {
          token: localStorage.getItem("token"),
        }); // tenta logar pelo cache
      }
    });

    subscribeAllEvents((...args: any[]) => {
      console.log(args);
    });
    subscribeEvent("user::status", (status: UserStatus) => {
      setStatus(status);
      console.log(status);
    });
    subscribeEvent("auth::store", (token: string) => {
      localStorage.setItem("token", token);
      setCredentialsMerge({ name: "token", value: token });
    });
    subscribeEvent("user::login", (data: string) => {
      const { logado } = JSON.parse(data);
      console.log(logado);
      if (logado) {
        sendEvent("user::info", { token: localStorage.getItem("token") });
        sendEvent("bonds::list", {
          token: localStorage.getItem("token"),
          inactive: true,
        });
      }
    });
    subscribeEvent("user::info", (data: string) => {
      const { fullName, profilePictureURL } = JSON.parse(data);
      localStorage.setItem(
        "user",
        JSON.stringify({ fullName, profilePictureURL })
      );
      setUser({ fullName, profilePictureURL });
      console.log(data);
    });
    subscribeEvent("bonds::list", (data: string) => {
      const bondsJSON = JSON.parse(data);
      setData(bondsJSON);
    });
  }, []);
  useEffect(() => {
    setVinculo(data[0].registration);
  }, [data]);
  const handleAccess = () => {
    return true;
  };

  const styles = useStyles();
  return (
    <NoSsr>
      <Fade in={true} timeout={1000}>
        <Grid className={styles.container}>
          <div
            style={{ width: "100%", height: "100%" }}
            className={styles.particles}
          >
            <Particles
              style={{ height: "100%" }}
              options={{
                background: {
                  color: {
                    value: "#212121",
                  },
                },
                fpsLimit: 45,
                interactivity: {
                  detectsOn: "window",
                  events: {
                    onClick: {
                      enable: true,
                      mode: "repulse",
                    },
                    onHover: {
                      enable: true,
                      mode: "grab",
                      parallax: {
                        enable: true,
                        smooth: 100,
                      },
                    },
                    resize: true,
                  },
                  modes: {
                    grab: {
                      distance: 200,
                      lineLinked: {
                        blink: true,
                        color: "#25964a",
                        consent: true,
                        opacity: 1,
                      },
                    },
                    repulse: {
                      distance: 250,
                      duration: 2,
                    },
                  },
                },
                particles: {
                  color: {
                    value: "#74b88b",
                  },
                  links: {
                    color: "#207e3f",
                    distance: 150,
                    enable: true,
                    opacity: 1,
                    width: 1,
                  },
                  collisions: {
                    enable: true,
                    mode: "bounce",
                  },
                  move: {
                    direction: "none",
                    enable: true,
                    outMode: "bounce",
                    random: false,
                    speed: 3,
                    straight: true,
                  },
                  number: {
                    density: {
                      enable: true,
                      value_area: 100,
                    },
                    value: 5,
                  },
                  opacity: {
                    value: 1,
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    random: true,
                    value: 7,
                  },
                },
                detectRetina: true,
              }}
            />
          </div>

          <Paper
            elevation={4}
            className={styles.paperCard}
            style={{ borderRadius: "10px" }}
          >
            <Fade in={user.fullName ? true : false}>
              <Collapse
                in={user.fullName ? true : false}
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

            <Collapse in={status === "Deslogado"}>
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
                <FormControlLabel
                  className={styles.inputCard}
                  style={{ marginLeft: "0px", marginBottom: "0" }}
                  label="Lembrar de mim"
                  control={
                    <Checkbox
                      style={{ padding: "0px", margin: "0.25rem" }}
                      checkedIcon={<CheckBox color="primary" />}
                      icon={<CheckBoxOutlineBlank color="primary" />}
                    />
                  }
                />
              </div>
            </Collapse>
            <Collapse in={data[0].program ? true : false}>
              <Grow in={data[0].program ? true : false} timeout={500}>
                <div>
                  <p style={{ textAlign: "center" }}>
                    Escolha um vínculo para acessar
                  </p>
                  <Grow in={data[0].program ? true : false} timeout={750}>
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
              {status === "Logando" ? (
                <CircularProgress style={{ alignSelf: "center" }} />
              ) : status === "Logado" ? (
                <Link href={`/bond/${encodeURIComponent(vinculo)}`}>
                  <Button
                    variant="contained"
                    endIcon={<Send />}
                    onClick={handleAccess}
                  >
                    Acessar
                  </Button>
                </Link>
              ) : status === "Deslogado" ? (
                <Button
                  variant="outlined"
                  endIcon={<Send />}
                  onClick={handleLogin}
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
