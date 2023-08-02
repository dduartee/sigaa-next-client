import React, { useCallback, useContext, useEffect, useState } from "react";
import { Bond, UserCredentials, UserData, UserStatus } from "@types";
import Particulas from "@components/Index/Particles";
import { Input, InputBox } from "@components/Index/Input";
import LoginBox from "@components/Index/LoginBox";
import { CardBottom, CardHeader } from "@components/Index/Card";
import Head from "next/head";
import { Ajuda } from "@components/Ajuda";
import { formatFullName } from "@components/Home/CustomDrawer";
import { useRouter } from "next/router";
import { BondSelection } from "@components/BondSelection";
import { BondSelectionButtons } from "@components/BondSelectionButtons";
import { ForbiddenContext } from "@context/forbidden";
import Logo from "@components/Logo";
import { Box, Button, CircularProgress, Collapse, Fade, FormControl, FormHelperText, Grid, Link, NoSsr, Paper, Switch, Typography } from "@mui/material";
import { ArrowBack, AccountCircle, Info, Send, SyncLock, Link as LinkIcon } from "@mui/icons-material";
import { useTheme } from "@mui/system";
import { fetchBonds, fetchCourses, fetchLogin } from "@hooks/useHomeFetch";
import { storeBond } from "@hooks/useCachedBond";

function Index(): JSX.Element {
  const router = useRouter();
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: "",
    session: "",
    token: "",
    institution: "IFSC"
  });
  const [registrationSelected, setRegistrationSelected] = useState<string>("");
  const [openHelp, setOpenHelp] = useState<boolean>(false);
  const [openDonate, setOpenDonate] = useState<boolean>(false);

  const [status, setStatus] = useState<UserStatus>("Deslogado");
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [errorFeedback, setErrorFeedback] = useState("");
  const [bonds, setBonds] = useState<Bond[]>([]);
  const loginProcess = useCallback(async () => {
    const response = await fetchLogin(credentials)
    if (!response.error && response.data) {
      const { emails, fullName, profilePictureURL, token: newToken } = response.data
      sessionStorage.setItem("token", newToken)
      sessionStorage.setItem("username", credentials.username)
      setUser({ username: credentials.username, emails, fullName, profilePictureURL })
      return newToken as string;
    } else {
      throw new Error("Erro ao logar")
    }
  }, [credentials])
  // TO-DO: LOGIN POR TOKEN SALVO NO SESSION STORAGE
  const handleLogin = () => {
    if (credentials.username && credentials.session) {
      setStatus("Logando");
      loginProcess().then(async (token) => {
        const { data: bonds } = await fetchBonds({ username: credentials.username, token })
        const bondsWithCourses = bonds.map(bond => ({ ...bond, courses: [], activities: [] }))
        setBonds(bondsWithCourses)
        bondsWithCourses.map(storeBond)
        setStatus("Logado")
      })
    } else {
      setErrorFeedback("");
    }
  };
  useEffect(() => {
    if (bonds.length != 0) {
      setRegistrationSelected(bonds[0].registration);
    }
  }, [bonds]);
  const [donateTimeout, setDonateTimeout] = useState<NodeJS.Timeout>();
  useEffect(() => {
    if (status === "Logando") {
      setOpenDonate(false)
    }
    if (bonds[0]?.registration && user?.fullName && status === "Logado") {
      setDonateTimeout(setTimeout(() => {
        setOpenDonate(false)
      }, 100))
    }
    if (errorFeedback) {
      setOpenDonate(false)
    }
  }, [bonds, user, status, errorFeedback])
  useEffect(() => {
    if (!openDonate && donateTimeout) {
      clearTimeout(donateTimeout)
    }
  }, [donateTimeout, openDonate])
  useEffect(() => {
    if (!registrationSelected && bonds.length != 0) setRegistrationSelected(bonds[0].registration);
  }, [bonds, registrationSelected]);

  const handleAccess = async () => {
    setStatus("Logando");
    setErrorFeedback("");
    const token = sessionStorage.getItem("token") as string;
    const username = user?.username as string
    await fetchCourses({ username, token }, registrationSelected)
    router.push(`/bond/${encodeURIComponent(registrationSelected)}`);
  };
  const handleLogout = () => {
    setErrorFeedback("");
    setCredentials({ username: "", session: "", token: "", institution: "IFSC" });
    sessionStorage.clear();
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
    sessionStorage.getItem("particles")?.toString() === "false" ? setActiveParticles(false) : setActiveParticles(true);
  }, [])
  const [increaseBoxSize, setIncreaseBoxSize] = useState(openHelp || openDonate);
  useEffect(() => setIncreaseBoxSize(openHelp || openDonate), [openHelp, openDonate])
  const [openCardBody, setOpenCardBody] = useState(!openHelp && !openDonate);
  useEffect(() => setOpenCardBody(!openHelp && !openDonate), [openHelp, openDonate])
  const { forbiddenVersion, setForbiddenVersion } = useContext(ForbiddenContext)

  const handleChangeForbiddenVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForbiddenVersion(event.target.checked);
  };
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>Login | sigaa-next</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name='description' content="SIGAA de forma rápida e prática" />
        <meta property="og:title" content="sigaa-next" />
        <meta property="og:description" content="SIGAA de forma rápida e prática" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sigaanext.com.br/" />
        <meta property="og:image" itemProp="image" content="/og-image.png" />
        <meta name="google-site-verification" content="l3dA98khZkgdacKAYSDoYNF1SJy1qhZAvoVqHI3KrYE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NoSsr>
        <Fade in={true} timeout={500}>
          <Grid display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
            width={"100vw"}
            height={"100vh"}>

            <Particulas disable={!activeParticles} />
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
                  width: increaseBoxSize ? "97%" : "80%",
                  minWidth: "320px",
                  maxWidth: "700px",
                  overflowY: increaseBoxSize ? "scroll" : "visible",
                  height: "auto",
                  zIndex: 1,
                }}
              >
                <Fade in={openHelp} timeout={500}>
                  {openHelp ?
                    <Box maxHeight={"600px"}>
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
                    : <div></div>}
                </Fade>
                <Collapse in={conditionals.hasFullNameAndIsLoggedIn && openCardBody} sx={{ overflow: 'visible' }} /* Collapse especifico para o CardHeader por causa do overflow visible*/>
                  {
                    (user?.profilePictureURL && user?.fullName) ? (
                      <CardHeader>
                        <img
                          src={user.profilePictureURL}
                          style={{
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
                    <BondSelectionButtons handleAccess={handleAccess} handleLogout={handleLogout} />
                  </>
                </Collapse>
                <Collapse in={conditionals.isLoggedOut}>
                  {conditionals.isLoggedOut ? (
                    <LoginCard handleLogin={handleLogin}
                      setOpenHelp={setOpenHelp}
                      credentials={credentials}
                      setCredentials={setCredentials}
                      errorFeedback={errorFeedback}
                      setErrorFeedback={setErrorFeedback} />
                  ) : null}
                </Collapse>


                {conditionals.userIsWaiting ? ( // usuario esta "esperando" o login ou logout
                  <CardBottom m={0}>
                    <Box p={2}>
                      <CircularProgress style={{ alignSelf: "center" }} />
                    </Box>
                  </CardBottom>
                ) : null}
              </Paper>
              <Box display="flex" flexDirection="column" alignItems={"center"} position="absolute" bottom="0" p={2} zIndex={0}>
                <Logo height="60rem" />
                <Box display="flex" flexDirection={"row"} alignItems="center" >
                  <Switch
                    checked={forbiddenVersion}
                    onChange={handleChangeForbiddenVersion}
                  />
                  <Typography color={theme.palette.primary['500']} fontSize={"1rem"}>Versão Proibida</Typography>
                </Box>
              </Box>
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
  setCredentials: React.Dispatch<React.SetStateAction<UserCredentials>>;
  credentials: UserCredentials;
  setErrorFeedback: (error: string) => void;
  errorFeedback: string;
}) {
  const { handleLogin, setOpenHelp, setCredentials, credentials, setErrorFeedback, errorFeedback } = props;
  const handleCredentialsChange = (event: React.ChangeEvent<HTMLFormElement>) => (setCredentials({ ...credentials, [event.target.name]: event.target.value }))
  const handleEnterPress = (event: { key: string }) => {
    if (event.key === "Enter") handleLogin();
    setErrorFeedback("");
  };
  const [showCookieMenu, setShowCookieMenu] = useState(false)
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
                error={errorFeedback ? true : false}
              />
              <FormHelperText sx={{ marginLeft: 0, opacity: "0.8" }}>
                Seu usuário do SIGAA
              </FormHelperText>
            </FormControl>
          }
        />
        {
          showCookieMenu ?
            (<CookieMenu handleSessionChange={(JSESSIONID) => {
              setCredentials({ ...credentials, session: JSESSIONID })
            }} />)
            : null}
        <InputBox
          icon={<SyncLock />}
          input={
            <FormControl>
              <Input
                label="Sessão"
                InputLabelProps={{ size: "small" }}
                type="password"
                name="session"
                value={credentials.session}
                error={errorFeedback ? true : false}
                autoComplete="new-password"
                disabled={showCookieMenu}
              />
              <FormHelperText sx={{ marginLeft: 0, opacity: "0.8" }}>
                Seu cookie JSESSIONID do SIGAA
              </FormHelperText>
            </FormControl>
          }
        />
        {
          !showCookieMenu ?
            <Button variant="text" onClick={() => setShowCookieMenu(true)}>Obter cookie pela URL</Button>
            : null
        }
        <Typography sx={{ fontSize: "1rem" }} color="#ff4336">{errorFeedback}</Typography>
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

function CookieMenu(props: {
  handleSessionChange: (JSESSIONID: string) => void
}) {
  const theme = useTheme();
  const [url, setURL] = React.useState("");
  useEffect(() => {
    if (url) {
      const sigaaURL = new URL(url);
      if (!sigaaURL) return alert("URL inválida");
      const part1 = url.split(";")[1]
      if (!part1) return alert("Tente reiniciar seu navegador ou abrir em uma aba anônima");
      
      const part2 = part1.split("=")[1]

      const cookie = `JSESSIONID=${part2}`;

      props.handleSessionChange(cookie)
    }
  }, [props, url])
  return (
    <Box width="320px" display="flex" textAlign="center" alignItems="center" flexDirection="column" mt={2}>
      <Typography>Entre no SIGAA pelo link abaixo: </Typography>
      <Link
        href="https://sigrh.ifsc.edu.br/sigaa"
        onClick={(event) => {
          event.preventDefault()
          window.open("https://sigrh.ifsc.edu.br/sigaa", "SIGAAWindow", "popup");
        }}
        style={{ color: theme.palette.primary.main }}
      >
        sigaa.ifsc.edu.br
      </Link>
      <Typography>
        Antes de fazer o login, copie a URL do navegador e FAÇA o login normalmente no SIGAA
      </Typography>

      <Typography mt={2}>
        Após o login, cole a URL no campo abaixo e logue por aqui
      </Typography>
      <form
        autoComplete="off"
      >
        <InputBox
          icon={<LinkIcon />}
          input={<Input
            label="URL"
            type="password"
            name="url"
            autoComplete="new-password"
            value={url}
            onChange={(e) => {
              setURL(e.target.value)
            }
            } />} />
      </form>
    </Box>
  );
}