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
} from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import About from "./_about";
import AboutPersonal from "./_about-personal";
import AboutTechnical from "./_about-technical";
import LoginPage from "./_login&bondPage";
import { Info, Login as LoginIcon } from "@mui/icons-material";
export default function Index() {
  const [openLogo, setOpenLogo] = React.useState(false);
  const [openCollapseLogo, setOpenCollapseLogo] = React.useState(false);
  setTimeout(() => {
    setOpenCollapseLogo(true);
  }, 3000);

  return (
    <Switch>
      <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          spacing={2}
        >
          <Route path="/">
            <Grid item sx={{ m: 4, maxWidth: "1440px" }}>
              <Card
                variant="elevation"
                sx={{
                  overflow: "visible",
                  borderRadius: "9px",
                  width: "fit-content",
                }}
              >
                <Collapse
                  in={openCollapseLogo}
                  timeout={1000}
                  onEnter={() => setOpenLogo(true)}
                >
                  <CardContent>
                    <Grow in={openLogo} timeout={1000}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        flexWrap={"wrap"}
                      >
                        <Typography variant="h2" fontSize="2rem">
                          sigaa-next-client
                        </Typography>
                      </Box>
                    </Grow>
                  </CardContent>
                </Collapse>
                <Route path="/" exact>
                  <IndexContent />
                </Route>
                <Route path="/login" exact>
                  <LoginPage />
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
              </Card>
            </Grid>
          </Route>
        </Grid>
      </>
    </Switch>
  );
}

function IndexContent() {
  const [open, setOpen] = React.useState(false);
  setTimeout(() => {
    setOpen(true);
  }, 200);
  const [openStart, setOpenStart] = React.useState(false);
  const [openMiddle, setOpenMiddle] = React.useState(false);
  const [openEnd, setOpenEnd] = React.useState(false);
  setTimeout(() => {
    setOpenStart(true);
  }, 800);
  setTimeout(() => {
    setOpenMiddle(true);
  }, 1500);
  setTimeout(() => {
    setOpenEnd(true);
  }, 2300);

  return (
    <>
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
    </>
  );
}
