import { Box, CardContent, Collapse, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AboutTechButtons } from "./_about-technical";

export default function AboutPersonal() {
  const [open, setOpen] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);
  const [openThird, setOpenThird] = React.useState(false);
  const [openFourth, setOpenFourth] = React.useState(false);
  const [openFifth, setOpenFifth] = React.useState(false);
  const [openEasteregg, setOpenEasterEgg] = React.useState(false);

  setTimeout(() => {
    setOpen(true);
  }, 10);
  setTimeout(() => {
    setOpenSecond(true);
  }, 300);
  setTimeout(() => {
    setOpenThird(true);
  }, 700);
  setTimeout(() => {
    setOpenFourth(true);
  }, 1200);
  setTimeout(() => {
    setOpenFifth(true);
  }, 1500);
  setTimeout(() => {
    setOpenEasterEgg(true);
  }, 3000);
  return (
    <Collapse in={open}>
      <CardContent>
        <Box display="flex" justifyContent="center" flexWrap={"wrap"}>
          <Typography fontSize={"1.2rem"} width={"100%"}>
            Um pouco sobre mim e história do sigaa-next-client
          </Typography>
          <br />
          <br />
          <Collapse in={openSecond} timeout={300} style={{ width: "100%" }}>
            <Typography fontSize={"1.5rem"} width={"100%"}>
              Eu
            </Typography>
            <ul>
              <li>
                <Typography width="100%" fontSize="1rem">
                  Sou Gabriel Kleemann Duarte, tenho 17 anos, e sou estudante do
                  Técnico em Mecânica do IFSC de Xanxerê da turma de 2020.
                </Typography>
              </li>
            </ul>
          </Collapse>
          <br />
          <Collapse in={openThird} timeout={500} style={{ width: "100%" }}>
            <Typography width="100%" fontSize="1.5rem">
              Começo
            </Typography>
            <ul>
              <li>
                <Typography width="100%" fontSize="1rem">
                  No começo de 2020, por causa da pandemia, comecei a me
                  aprofundar na programação web, algo que sempre quis, porém não
                  tinha tempo para isso (e agora me falta tempo), comecei a
                  desenvolver sites em php (backend) por curiosidade, e desde
                  então passei para o Javascript, Typescript, e por fim, React
                  (obviamente no frontend) com o NextJS.
                </Typography>
              </li>
            </ul>
          </Collapse>
          <br />
          <Collapse in={openFourth} timeout={700} style={{ width: "100%" }}>
            <Typography width="100%" fontSize="1.5rem">
              Projeto
            </Typography>
            <ul>
              <li>
                <Typography width="100%" fontSize="1rem">
                  Essa interface, está sendo desenvolvida por mim (provavelmente
                  para sempre), depois de várias tentativas e erros, está saindo
                  do papel (do vscode na verdade), isso é bom, pois no momento
                  (2021), tenho apenas mais um ano para fazer o projeto por
                  causa do acesso ao SIGAA e possivelmente em 2022 não
                  conseguirei desenvolver nada por causa das atividades práticas
                  pendentes da pandemia.
                </Typography>
              </li>

              <br />
              <li>
                <Typography width="100%" fontSize="1rem">
                  Para saber do backend, veja nas{" "}
                  <Link
                    to="/about-technical"
                    style={{ color: "#268E36", textDecoration: "none" }}
                  >
                    informações técnicas do projeto
                  </Link>
                  .
                </Typography>
              </li>
            </ul>
          </Collapse>

          <br />
          <Collapse in={openFifth} timeout={900} style={{ width: "100%" }}>
            <Typography width="100%" fontSize="1.5rem">
              Motivação?
            </Typography>
            <ul>
              <li>
                <Typography width="100%" fontSize="1rem">
                  Como todo estudante, querer acessar as coisas rápidas, e nisso
                  o SIGAA pode ser ruim, os tais dos "comportamentos
                  inesperados", me levava sustos por ser inesperado (é uma
                  piada...)
                </Typography>
              </li>
              <br />
              <li>
                <Typography width="100%" fontSize="1rem">
                  Os atrasos na hora de fazer o acesso, as matérias
                  desaparecendo, o clarão nos olhos ao acessar de noite, tudo
                  isso foi um motivou a criar esse projeto, tanto para criar uma
                  tabela de notas, quanto para ver as noticias postadas no SIGAA
                  de forma mais simples.
                </Typography>
              </li>
              <br />
              <Collapse
                in={openEasteregg}
                timeout={1200}
                style={{ width: "100%" }}
              >
                <li>
                  <Typography width="100%" fontSize="1rem">
                    Como fiz isso? sem perder a sanidade mental? não sei
                  </Typography>
                </li>
              </Collapse>
            </ul>
          </Collapse>
        </Box>
      </CardContent>
      <AboutTechButtons />
    </Collapse>
  );
}
