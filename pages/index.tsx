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
  FormControl,
  FormHelperText,
  Box,
  Typography,
} from "@material-ui/core";
import { AccountCircle, Lock, Send, ArrowBack, Info } from "@material-ui/icons";
import { Bond, UserCredentials } from "@types";
import Particulas from "@components/Index/Particles";
import { SocketContext } from "@context/socket";
import { Input, InputBox } from "@components/Index/Input";
import LoginBox from "@components/Index/LoginBox";
import { CardBottom, CardHeader } from "@components/Index/Card";
import useTokenHandler from "@hooks/useTokenHandler";
import useUserHandler from "@hooks/useUserHandler";
import useBondsHandler from "@hooks/useBondsEvents";
import { useRouter } from "next/router";
import useAPIHandler from "@hooks/useAPIEvents";
import Head from "next/head";
import { Ajuda } from "@components/Ajuda";
import { Donate } from "@components/Donate";
import { formatFullName } from "@components/Home/CustomDrawer";
function Index(): JSX.Element {
  const router = useRouter();
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
    token: "",
  });
  const [registrationSelected, setRegistrationSelected] = useState<string>("");
  const [openHelp, setOpenHelp] = useState<boolean>(false);
  const [openDonate, setOpenDonate] = useState<boolean>(false);

  const socket = useContext(SocketContext);
  const [valid, setValid] = useState(false);
  useTokenHandler(setValid);
  const { status, user, setStatus } = useUserHandler();
  const { bonds } = useBondsHandler();
  const { error, setError } = useAPIHandler();

  useEffect(() => {
    if (valid) {
      console.debug("@validUseEffect", valid);
      socket.emit("user::login", { token: localStorage.getItem("token") }); // tenta logar pelo token
    }
  }, [valid, socket, setStatus]);
  useEffect(() => {
    socket.on("auth::store", (token: string) => {
      setCredentials({ token, password: "", username: "" })
    });
  }, [socket]);
  useEffect(() => {
    if (bonds.length != 0) {
      setRegistrationSelected(bonds[0].registration);
    }
  }, [bonds]);
  const [donateTimeout, setDonateTimeout] = useState<NodeJS.Timeout>();
  useEffect(() => {
    if (status === "Logando") {
      setOpenDonate(true)
    }
    if (bonds[0]?.registration && user?.fullName) {
      setDonateTimeout(setTimeout(() => {
        setOpenDonate(false)
      }, 1500))
    }
    if (error) {
      setOpenDonate(false)
    }
  }, [bonds, user, status, error])
  useEffect(() => {
    if (!openDonate && donateTimeout) {
      clearTimeout(donateTimeout)
    }
  }, [donateTimeout, openDonate])
  useEffect(() => {
    if (!registrationSelected && bonds.length != 0) setRegistrationSelected(bonds[0].registration);
  }, [bonds, registrationSelected]);
  const handleLogin = () => {
    if (credentials.username && credentials.password) {
      setStatus("Logando");
      socket.emit("user::login", credentials); // loga pela "primeira vez" sem o cache
    } else {
      setError(true);
    }
  };
  const handleAccess = () => {
    setStatus("Logando");
    setError(false);
    window.location.href = `/bond/${encodeURIComponent(registrationSelected)}`
    //router.push(`/bond/${encodeURIComponent(registrationSelected)}`, undefined, { shallow: true });
  };
  const handleLogout = () => {
    setError(false);
    socket.emit("user::logoff", { token: localStorage.getItem("token") });
    setCredentials({ username: "", password: "", token: "" });
    localStorage.clear();
  };

  const conditionals = {
    willLogout: status === "Deslogando",
    willLogin: status === "Logando",
    isLoggedIn: status === "Logado",
    isLoggedOut: status === "Deslogado" && !openHelp,
    hasFullName: user?.fullName ? true : false,
    hasBond: bonds.length != 0 ? true : false,
    hasFullNameAndIsLoggedIn:
      (user?.fullName ? true : false) && (status === "Logado" ? true : false),
    hasBondAndIsLoggedIn: bonds.length != 0 && status === "Logado" ? true : false,
    userIsWaiting: status === "Logando" || status === "Deslogando" || (status === "Logado" && !(user?.fullName || bonds.length != 0)) ? true : false,
  };

  const [activeParticles, setActiveParticles] = useState(true);
  useEffect(() => {
    localStorage.getItem("particles")?.toString() === "false" ? setActiveParticles(false) : setActiveParticles(true);
  }, [])
  const [increaseBoxSize, setIncreaseBoxSize] = useState(openHelp || openDonate);
  useEffect(() => setIncreaseBoxSize(openHelp || openDonate), [openHelp, openDonate])
  const [openCardBody, setOpenCardBody] = useState(!openHelp && !openDonate);
  useEffect(() => setOpenCardBody(!openHelp && !openDonate), [openHelp, openDonate])
  return (
    <>
      <Head>
        <title>Login | sigaa-next-client</title>
        <meta name='description' content="SIGAA de forma rápida e prática" />
        <meta property="og:title" content="sigaa-next" />
        <meta property="og:description" content="SIGAA de forma rápida e prática" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sigaa-next-client.vercel.app/" />
        <meta property="og:image" itemProp="image" content="/og-image.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="l3dA98khZkgdacKAYSDoYNF1SJy1qhZAvoVqHI3KrYE" />
      </Head>
      <NoSsr>
        <Fade in={true} timeout={500}>
          <Grid display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
            width={"100vw"}
            height={"100vh"}>
            <Particulas disable={!activeParticles} />
            <Box textAlign={"center"} width="100%" padding={3} position="absolute" bottom={0}>
              <img src="/img/logo.png" height="50rem" />
            </Box>
            <Box display={"flex"}
              alignContent={"center"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              height={"100%"}
              maxWidth={"100vw"}
              position={"absolute"}>
              <Paper
                elevation={4}
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  width: increaseBoxSize ? "97%" : "20rem",
                  maxWidth: "700px",
                  overflowY: increaseBoxSize ? "scroll" : "visible",
                  height: "fit-content"
                }}
              >
                <Collapse in={openHelp} timeout={500}>
                  {openHelp ?
                    <Box>
                      <Ajuda activeParticles={activeParticles} setActiveParticles={setActiveParticles} />
                      <CardBottom>
                        <Button
                          variant="outlined"
                          startIcon={<ArrowBack />}
                          onClick={() => setOpenHelp(false)}
                        >
                          Voltar
                        </Button>
                      </CardBottom>
                    </Box>
                    : null}
                </Collapse>
                <Collapse in={conditionals.hasFullNameAndIsLoggedIn && openCardBody} sx={{ overflow: 'visible' }} /* Collapse especifico para o CardHeader por causa do overflow visible*/>
                  {
                    (user?.profilePictureURL && user?.fullName) ? (

                      <CardHeader>
                        <img
                          src={user.profilePictureURL}
                          style={{
                            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.4)",
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginTop: "-50px",
                            userSelect: "none",
                          }}
                        />
                        <Typography fontSize="1.3rem" marginTop={2}>{formatFullName(user.fullName)}</Typography>
                      </CardHeader>
                    ) : null
                  }
                </Collapse>
                <Collapse /** Collapse para a tela de vinculos e botoes */
                  in={conditionals.hasFullNameAndIsLoggedIn && openCardBody}
                  unmountOnExit
                >
                  <>
                    <BondSelection registrationSelected={registrationSelected} setRegistrationSelected={setRegistrationSelected} bonds={bonds} />
                    <CardBottom>
                      <BondSelectionButtons handleAccess={handleAccess} handleLogout={handleLogout} />
                    </CardBottom>
                  </>
                </Collapse>
                <Collapse in={conditionals.isLoggedOut}>
                  {conditionals.isLoggedOut ? (
                    <LoginCard handleLogin={handleLogin}
                      setOpenHelp={setOpenHelp}
                      credentials={credentials}
                      setCredentials={setCredentials}
                      error={error}
                      setError={setError} />
                  ) : null}
                </Collapse>


                {conditionals.userIsWaiting || openDonate ? ( // usuario esta "esperando" o login ou logout
                  <CardBottom>
                    <Box display={"flex"} flexDirection="column">
                      <Collapse in={openDonate} timeout={1000}>
                        <Donate email="sigaanext@gmail.com" fontSize="1.2rem" iconWidth="70px" fontSizeEmail="1.4rem">
                          Veja mais na aba ajuda...
                        </Donate>
                      </Collapse>
                      <CircularProgress style={{ alignSelf: "center" }} />
                    </Box>
                  </CardBottom>
                ) : null}

              </Paper>
            </Box>
          </Grid>
        </Fade>
      </NoSsr >
    </>
  );
}

export default Index;
function LoginCard(props: {
  handleLogin: () => void;
  setOpenHelp: (openHelp: boolean) => void;
  setCredentials: (credentials: { username: string, password: string }) => void;
  credentials: { username: string; password: string };
  setError: (error: boolean) => void;
  error: boolean;
}) {
  const { handleLogin, setOpenHelp, setCredentials, credentials, setError, error } = props;
  const handleCredentialsChange = (event: React.ChangeEvent<HTMLFormElement>) => (setCredentials({ ...credentials, [event.target.name]: event.target.value }))
  const handleEnterPress = (event: { key: string }) => {
    if (event.key === "Enter") handleLogin();
    setError(false);
  };
  return (
    <Box>
      <LoginBox onChange={handleCredentialsChange} onKeyPress={handleEnterPress}>
        <InputBox
          icon={<AccountCircle />}
          input={
            <FormControl>
              <Input
                label="Usuário"
                type="text"
                name="username"
                value={credentials.username}
                error={error ? true : false}
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
            <FormControl>
              <Input
                label="Senha"
                type="password"
                name="password"
                value={credentials.password}
                error={error ? true : false}
              />
              <FormHelperText sx={{ marginLeft: 0, opacity: "0.8" }}>
                Sua senha do SIGAA
              </FormHelperText>
            </FormControl>
          }
        />
      </LoginBox>
      <CardBottom>
        <Box display="flex" justifyContent={"space-around"} width="100%">
          <Button
            variant="text"
            endIcon={<Info />}
            onClick={() => setOpenHelp(true)}
          >
            Ajuda
          </Button>
          <Button
            variant="outlined"
            endIcon={<Send />}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </CardBottom>
    </Box>
  )
}
function BondSelection(props: { registrationSelected: string, setRegistrationSelected: (registration: string) => void, bonds: Bond[] }) {
  const { registrationSelected, setRegistrationSelected, bonds } = props;
  const handleChangeRegistration = (
    _: React.MouseEvent<HTMLElement>,
    nextVinculo: string
  ) => {
    console.debug("@handleChangeRegistration", nextVinculo);
    setRegistrationSelected(nextVinculo);
  };
  return (<>
    <Typography textAlign={"center"} margin={2}>
      Escolha um vínculo para acessar
    </Typography>
    <ToggleButtonGroup
      exclusive
      aria-label=""
      value={registrationSelected}
      onChange={handleChangeRegistration}
      orientation="vertical"
    >
      {bonds.map((bond, index) => {
        return (
          <ToggleButton
            key={index}
            value={bond.registration}
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
            {bond.program}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  </>)
}

function BondSelectionButtons(props: { handleLogout: () => void, handleAccess: () => void }) {
  return <Grid
    justifyContent="center"
    alignContent="center"
    display="flex"
  >
    <Button
      variant="contained"
      startIcon={<ArrowBack direction="right" />}
      onClick={props.handleLogout}
      fullWidth
      sx={{ margin: ".25rem" }}
    >
      Sair
    </Button>
    <Button
      variant="contained"
      endIcon={<Send />}
      fullWidth
      sx={{ margin: ".25rem" }}
      onClick={props.handleAccess}
    >
      Acessar
    </Button>
  </Grid>
}