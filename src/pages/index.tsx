import {
  Grid,
  Card,
  CardContent,
  Typography,
  Collapse,
  CardActions,
  Button,
  Box,
  Grow,
  NoSsr,
} from "@mui/material";
import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import About from "./_about";
import AboutPersonal from "./_about-personal";
import AboutTechnical from "./_about-technical";
import LoginPage from "./_login";
import { Info, Login as LoginIcon } from "@mui/icons-material";
import BondsPage from "./_bonds";
import BondRouter from "./_bond/bond.router";
export default function Index() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      height="100vh"
      spacing={2}
    >
      <Switch>
        <Route path="/" exact>
          <IndexContent />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/bonds" exact>
          <BondsPage />
        </Route>
        <Route path="/bond">
          <BondRouter />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/about-personal" exact>
          <AboutPersonal />
        </Route>
        <Route path="/about-technical" exact>
          <AboutTechnical />
        </Route>
      </Switch>
    </Grid>
  );
}
export function LogoText() {
  const [openLogo, setOpenLogo] = React.useState(false);
  const [openCollapseLogo, setOpenCollapseLogo] = React.useState(false);
  React.useEffect(() => {
    const timeoutOpenCollapseLogo = setTimeout(() => {
      setOpenCollapseLogo(true);
    }, 3000);
    return () => {
      clearTimeout(timeoutOpenCollapseLogo);
    };
  }, []);
  return (
    <Collapse
      in={openCollapseLogo}
      timeout={1000}
      onEnter={() => setOpenLogo(true)}
    >
      <CardContent>
        <Grow in={openLogo} timeout={1000}>
          <Box display="flex" justifyContent="center" flexWrap={"wrap"}>
            <Typography variant="h2" fontSize="2rem">
              sigaa-next-client
            </Typography>
          </Box>
        </Grow>
      </CardContent>
    </Collapse>
  );
}
function IndexContent() {
  const [open, setOpen] = React.useState(false);
  const [openStart, setOpenStart] = React.useState(false);
  const [openMiddle, setOpenMiddle] = React.useState(false);
  const [openEnd, setOpenEnd] = React.useState(false);
  React.useEffect(() => {
    const timeoutOpen = setTimeout(() => {
      setOpen(true);
    }, 200);
    const timeoutOpenStart = setTimeout(() => {
      setOpenStart(true);
    }, 800);
    const timeoutOpenMiddle = setTimeout(() => {
      setOpenMiddle(true);
    }, 1500);
    const timeoutOpenEnd = setTimeout(() => {
      setOpenEnd(true);
    }, 2300);
    return () => {
      clearTimeout(timeoutOpen);
      clearTimeout(timeoutOpenStart);
      clearTimeout(timeoutOpenMiddle);
      clearTimeout(timeoutOpenEnd);
    };
  }, []);

  return (
    <Grid
      item
      sx={{ m: 4 }}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
    >
      <Card
        variant="elevation"
        sx={{
          overflow: "visible",
          borderRadius: "9px",
          width: "300px",
        }}
      >
        <LogoText />
        <CardContent sx={{ paddingTop: 0 }}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            flexDirection={"column"}
            sx={{
              margin: 1,
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            <Box textAlign={"right"} fontWeight={500}>
              <Collapse
                in={openStart}
                sx={{ width: "100%", marginBottom: 0.3, fontSize: "1rem" }}
                timeout={300}
              >
                Um cliente{" "}
                <span style={{ color: "#268E36", fontSize: "1.2rem" }}>
                  SIGAA
                </span>{" "}
              </Collapse>

              <Collapse
                in={openMiddle}
                sx={{ width: "100%", marginBottom: 0.3 }}
                timeout={300}
              >
                feito por{" "}
                <span style={{ color: "#268E36", fontSize: "1.2rem" }}>
                  estudantes
                </span>{" "}
              </Collapse>

              <Collapse in={openEnd} timeout={600} sx={{ width: "100%" }}>
                para{" "}
                <span style={{ color: "#268E36", fontSize: "1.2rem" }}>
                  estudantes
                </span>
              </Collapse>
            </Box>
          </Box>
        </CardContent>
        <Collapse in={open}>
          <CardActions>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              sx={{
                "a:nth-of-type": {
                  marginRight: ".5rem",
                  marginLeft: ".5rem",
                },
              }}
            >
              <Link to="/about" style={{ textDecoration: "none" }}>
                <Button variant="outlined" fullWidth startIcon={<Info />}>
                  <Typography fontSize="1rem">Sobre</Typography>
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth endIcon={<LoginIcon />}>
                  <Typography fontSize="1rem">Login</Typography>
                </Button>
              </Link>
            </Box>
          </CardActions>
        </Collapse>
      </Card>
    </Grid>
  );
}
