import * as React from "react";
import Container from "@material-ui/core/Container";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  NoSsr,
  Paper,
  TextField,
} from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SendIcon from "@material-ui/icons/Send";
import Particles from "react-tsparticles";
import { io } from "socket.io-client";
import { UserCredentials, UserInfo } from "@types";
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
    marginLeft: "1rem",
    marginRight: "1rem",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
});

const client = io("wss://sigaa-socket-api.herokuapp.com/");

export default function Index() {
  const styles = useStyles();
  const [user, setUser] = React.useState({
    username: "",
    fullName: "",
    profilePictureURL: "https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png",
  } as UserInfo);
  let credentials: any = { username: "", password: "" };
  const updateInputValue = (evt: { target: any }) => {
    credentials[evt.target.name] = evt.target.value;
  };
  const handleLogin = () => {
    const { username, password } = credentials;
    client.emit("user::login", { username, password, token: localStorage.getItem("token") });
  };
  client.on("auth::store", (token) => {
    console.log(token);
    localStorage.setItem("token", token);
  });
  client.on("user::login", (data) => {
    const {logado} = JSON.parse(data)
    if (logado) {
      console.log(logado);
      client.emit("user::info", {
        token: localStorage.getItem("token"),
      });
    }
  });
  client.on("user::info", (data) => {
    const { fullName, profilePictureURL } = JSON.parse(data);
    setUser({ fullName, profilePictureURL });
    console.log(data);
  });
  return (
    <NoSsr>
      <Grid className={styles.container}>
        <div style={{ filter: "blur(5px)", width: "100vw" }}>
          <Particles
            id="tsparticles"
            options={{
              background: {
                color: {
                  value: "#212121",
                },
              },
              fpsLimit: 60,
              interactivity: {
                detectsOn: "canvas",
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "grab",
                    parallax: {
                      enable: true,
                      smooth: 700,
                    },
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 250,
                    lineLinked: {
                      blink: true,
                      color: "#25964a",
                      consent: true,
                      opacity: 1,
                    },
                  },
                  repulse: {
                    distance: 200,
                    duration: 1,
                  },
                  push: {
                    quantity: 5,
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
                  opacity: 0.7,
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
                    value_area: 1000,
                  },
                  value: 150,
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
          sx={{ borderRadius: "10px" }}
        >
          <div className={styles.topCard}>
            <img
              src={user.profilePictureURL}
              className={styles.profilePicture}
            />
            <p style={{ fontSize: "1.25rem" }}>{user.fullName}</p>
          </div>
          <div className={styles.loginCard}>
            <Box
              sx={{ display: "flex", alignItems: "flex-end" }}
              className={styles.inputCard}
            >
              <AccountCircle
                sx={{ color: "action.active", margin: "0.25rem" }}
              />
              <TextField
                fullWidth
                id="input-with-icon-textfield"
                label="Usuário"
                variant="standard"
                type="text"
                name="username"
                onChange={updateInputValue}
              />
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "flex-end" }}
              className={styles.inputCard}
            >
              <Lock sx={{ color: "action.active", margin: "0.25rem" }} />
              <TextField
                fullWidth
                id="input-with-icon-textfield"
                label="Senha"
                variant="standard"
                type="password"
                name="password"
                onChange={updateInputValue}
              />
            </Box>
            <FormControlLabel
              className={styles.inputCard}
              sx={{ marginLeft: "0px" }}
              label="Lembrar de mim"
              control={
                <Checkbox
                  sx={{ padding: "0px", margin: "0.25rem" }}
                  checkedIcon={<CheckBoxIcon color="primary" />}
                  icon={<CheckBoxOutlineBlankIcon color="primary" />}
                />
              }
            />
            <Button
              variant="outlined"
              endIcon={<SendIcon />}
              onClick={handleLogin}
            >
              Entrar
            </Button>
          </div>
        </Paper>
      </Grid>
    </NoSsr>
  );
}
