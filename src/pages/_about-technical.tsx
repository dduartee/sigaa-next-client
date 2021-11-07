import ExitToApp from "@mui/icons-material/ExitToApp";
import {
  CardContent,
  Box,
  Typography,
  CardActions,
  Button,
  Collapse,
  Card,
  Grid,
} from "@mui/material";
import { LogoText } from "@pages";
import React from "react";
import { Link } from "react-router-dom";
export default function AboutTechnical() {
  const [open, setOpen] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);
  const [openThird, setOpenThird] = React.useState(false);
  const [openEasteregg, setOpenEasteregg] = React.useState(false);
  setTimeout(() => {
    setOpen(true);
  }, 10);
  setTimeout(() => {
    setOpenSecond(true);
  }, 300);
  setTimeout(() => {
    setOpenThird(true);
  }, 600);
  setTimeout(() => {
    setOpenEasteregg(true);
  }, 2000);
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
          maxWidth: "100%",
        }}
      >
        <LogoText />
        <Collapse in={open}>
          <CardContent>
            <Box display="flex" justifyContent="center" flexWrap={"wrap"}>
              <Typography width="100%" fontSize="1.2rem">
                Entrando na parte mais técnica (e longa) do sigaa-next-client...
                <Collapse
                  in={openEasteregg}
                  timeout={1000}
                  style={{ width: "100%" }}
                >
                  <div style={{ fontSize: "0.9rem" }}>
                    (para os curiosos e desconfiados)
                  </div>
                </Collapse>
              </Typography>

              <br />
              <Collapse in={openSecond} timeout={300} style={{ width: "100%" }}>
                <Typography width="100%" fontSize="1.5rem" variant="h6">
                  Backend
                </Typography>
                <ul>
                  <li>
                    <Typography width="100%" fontSize="1rem">
                      O backend desenvolvido é o{" "}
                      <a
                        href="https://github.com/dduartee/sigaa-next-backend"
                        style={{ color: "#268E36" }}
                      >
                        sigaa-next-backend
                      </a>{" "}
                      que é um servidor webSocket que realiza a comunicação com
                      a API não oficial do SIGAA.
                    </Typography>
                  </li>
                </ul>
              </Collapse>
              <br />
              <Collapse in={openSecond} timeout={500} style={{ width: "100%" }}>
                <Typography width="100%" fontSize="1.5rem" variant="h6">
                  API não oficial do SIGAA
                </Typography>
                <ul>
                  <li>
                    <Typography width="100%" fontSize="1rem">
                      O módulo{" "}
                      <a
                        href="https://github.com/GeovaneSchmitz/sigaa-api/"
                        style={{ color: "#268E36" }}
                      >
                        SIGAA-API
                      </a>{" "}
                      é uma API não oficial do SIGAA, feito pelo mago{" "}
                      <a
                        href="https://github.com/GeovaneSchmitz"
                        style={{ color: "#268E36" }}
                      >
                        Geovane Schmitz
                      </a>
                      , que realiza webScraping para obter as informações do
                      SIGAA.
                    </Typography>
                  </li>
                </ul>
              </Collapse>
              <br />
              <Collapse in={openThird} timeout={700} style={{ width: "100%" }}>
                <Typography width="100%" fontSize="1.5rem" variant="h6">
                  Armazenamento de dados
                </Typography>
                <ul>
                  <li>
                    <Typography width="100%" fontSize="1rem">
                      Espero que não seja necessário fazer um termo de uso (por
                      favor).
                    </Typography>
                  </li>
                  <br />
                  <li>
                    <Typography width="100%" fontSize="1rem">
                      Para realizar o Login ao SIGAA, utilizamos o seu nome de
                      usuário e senha (obviamente), para realizar o
                      &quot;primeiro&quot; login ao SIGAA. Com esse primeiro
                      login, recebemos o cookie da sua sessão e armazenamos no
                      banco de dados, relacionado com seu usuário, seus
                      vinculos, matérias...
                    </Typography>
                  </li>
                  <br />
                  <li>
                    <Typography width="100%" fontSize="1rem">
                      Após o primeiro login, será retornado um token único para
                      o usuário, que será relacionado à sessão do SIGAA, ou
                      seja, o usuário (você) não terá acesso à sua real sessão
                      do SIGAA (não sei porque o interesse), evitando problemas
                      de segurança.
                    </Typography>
                  </li>
                  <br />
                  <li>
                    <Typography width="100%" fontSize="1rem">
                      Dai por diante o usuário sempre irá enviar o token unico
                      para acessar o SIGAA. Caso a sessão do SIGAA expire
                      (depois de 1h 30min), será necessario realizar login
                      novamente, com suas credenciais.
                    </Typography>
                  </li>
                  <br />
                  <li>
                    <Typography width="100%" fontSize="1rem">
                      Caso o usuário tenha mais de um vinculo, as sessões do
                      usuario serão da quantidade de vinculos que o usuario tem,
                      para acessar cada vinculo com sua sessão respectiva.
                    </Typography>
                  </li>
                </ul>
              </Collapse>
              <br />
              <Collapse in={openThird} timeout={900} style={{ width: "100%" }}>
                <Typography width="100%" fontSize="1.5rem" variant="h6">
                  Compatibilidade
                </Typography>
                <ul>
                  <li>
                    <Typography width="100%" fontSize="1rem">
                      O backend foi desenvolvido exclusivamente para o IFSC, mas
                      o SIGAA-API tem a compatiblidade de funcionar com o IFSC,
                      UFPB e IFFar. Caso queira utilizar outras instituições
                      aqui, solicito que entre em contato comigo pelo email:{" "}
                      <a
                        href="mailto:gabrielkduarte234@gmail.com"
                        style={{ color: "#268E36" }}
                      >
                        gabrielkduarte234@gmail.com
                      </a>
                      .
                    </Typography>
                  </li>
                </ul>
              </Collapse>
            </Box>
          </CardContent>
          <AboutTechButtons />
        </Collapse>
      </Card>
    </Grid>
  );
}
export function AboutTechButtons() {
  const [open, setOpen] = React.useState(false);
  setTimeout(() => {
    setOpen(true);
  }, 350);
  return (
    <Collapse in={open}>
      <CardActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Link to="/about" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              startIcon={
                <Box dir="rtl" display="flex">
                  <ExitToApp />
                </Box>
              }
            >
              <Typography fontSize="1rem">Voltar</Typography>
            </Button>
          </Link>
        </Box>
      </CardActions>
    </Collapse>
  );
}
