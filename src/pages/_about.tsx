import Build from "@mui/icons-material/Build";
import ExitToApp from "@mui/icons-material/ExitToApp";
import PersonSearch from "@mui/icons-material/PersonSearch";
import {
  CardContent,
  Box,
  Typography,
  CardActions,
  Button,
  Collapse,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
export default function About() {
  const [open, setOpen] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);
  setTimeout(() => {
    setOpen(true);
  }, 100);
  setTimeout(() => {
    setOpenSecond(true);
  }, 2000);
  return (
    <Collapse in={open}>
      <CardContent>
        <Typography variant="h4">Sobre</Typography>
        <Box display="flex" justifyContent="center" flexWrap={"wrap"}>
          <Typography width="100%" fontSize="1rem">
            O propósito de vida do sigaa-next-client, é facilitar as tarefas
            repetitivas (e demoradas) do SIGAA como por exemplo:
            <ul>
              <li>Ver as notas de todas as matérias</li>
              <li>Ver as atividades</li>
              <li>Ver os horários de forma mais intuitiva</li>
              <li>Ver as faltas</li>
              <li>Ver as notícias publicadas</li>
            </ul>
            <Collapse in={openSecond}>
              Claro que tudo isso de forma mais simples (e preguiçosa)
            </Collapse>
          </Typography>
        </Box>
      </CardContent>
      <AboutButtons />
    </Collapse>
  );
}

function AboutButtons() {
  const [open, setOpen] = React.useState(false);
  setTimeout(() => {
    setOpen(true);
  }, 350);
  return (
    <Collapse in={open}>
      <CardActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Link to="/" style={{ textDecoration: "none" }}>
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
          <div>
            <Link to="/about-personal" style={{ textDecoration: "none", marginLeft: "10px" }}>
              <Button
                variant="text"
                startIcon={
                  <Box display="flex">
                    <PersonSearch />
                  </Box>
                }
              >
                <Typography fontSize="1rem">Sobre mim</Typography>
              </Button>
            </Link>
            <Link to="/about-technical" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                startIcon={
                  <Box display="flex">
                    <Build />
                  </Box>
                }
              >
                <Typography fontSize="1rem">Detalhes Técnicos</Typography>
              </Button>
            </Link>
          </div>
        </Box>
      </CardActions>
    </Collapse>
  );
}
