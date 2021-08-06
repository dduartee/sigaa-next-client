import {
  Box,
  CircularProgress,
  IconButton,
  Collapse,
  Paper,
} from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { Bond, Course, Homework } from "@types";
import Head from "next/head";
import React, { useContext } from "react";
import moment from "moment";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { SocketContext } from "@context/socket";
import { useEffect } from "react";

export default function Homeworks({
  data,
  partialLoading,
}: {
  data: Bond[];
  partialLoading: boolean;
}) {
  return (
    <>
      <Head>
        <title>Tarefas | sigaa-next-client</title>
      </Head>
      {data?.map((bond: Bond) =>
        bond.courses?.map((course: Course) =>
          course.homeworks?.map((homework: Homework, index) => {
            const { diferenca, status } = getNewest(homework);
            return status != "Finalizado" ? (
              <HomeworkCollapse
                key={index}
                homework={homework}
                diff={diferenca}
                status={status}
                code={course.code}
                partialLoading={partialLoading}
              />
            ) : null;
          })
        )
      )}
      {partialLoading ? (
        <CircularProgress style={{ alignSelf: "center", margin: "1rem" }} />
      ) : (
        <p>Tarefas não são atualizadas em tempo real.</p>
      )}
    </>
  );
}
function HomeworkCollapse({
  homework,
  code,
  diff,
  status,
  partialLoading,
}: {
  homework: Homework;
  code: string;
  diff: number;
  status: HomeworkStatus;
  partialLoading: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [wait, setWait] = React.useState(false);
  function getDescriptionAndOpen() {
    setOpen(true);
    setWait(true);
    /*socket.emit("homeworks::specific", {
      code,
      fullHW: true, // quando true retorna todas as informações sendo mais devagar, quando false retorna somente titulo e datas
      inactive: true, // retorna vinculos inativos ou não (EXPERIMENTAL)
      cache: true,
      token: localStorage.getItem("token"), // obrigatório
    });*/
    console.log("buscando " + code);
  }
  return (
    <Box
      sx={{
        backgroundColor:
          diff == 0
            ? "hsl(350, 100%, 32%)"
            : diff <= 3
            ? "hsl(32, 90%, 40%)"
            : "hsl(139, 60%, 23%)",
        borderRadius: "4px",
        margin: "1rem",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" width="100%" alignItems="center">
          <Typography
            variant="h6"
            gutterBottom
            component="h2"
            marginLeft="1rem"
          >
            {homework.title}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="h2"
            marginLeft="1rem"
          >
            ( {diff != 0 ? `${diff} dias` : `Hoje`} )
          </Typography>
        </Box>
        <IconButton
          aria-label="expand row"
          size="medium"
          onClick={() => getDescriptionAndOpen()}
        >
          {open ? <div></div> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: "1rem", whiteSpace: "pre-wrap" }}>
          {homework.description}
          {partialLoading ? (
            <CircularProgress style={{ alignSelf: "center", margin: "1rem" }} />
          ) : (
            <p></p>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}
function getNewest(homework: Homework) {
  const nowDate = moment.utc();
  const homeworkDate = moment.utc(homework.endDate);
  const diferenca = homeworkDate.diff(nowDate, "days");
  let status = "" as HomeworkStatus;

  // github copilot
  // se a diferenca for maior que 0 então
  // verifique se a diferenca for maior que 3 altere status para em andamento
  // verifique se a diferença for menor que 3 altere o status para atenção
  // verifique se a diferença for igual a 0 altere o status para alerta
  // se a diferença for menor que 0 então altere o status para finalizado

  if (diferenca > 0) {
    if (diferenca > 3) {
      status = "Em andamento";
    } else if (diferenca < 3) {
      status = "Atenção";
    } else {
      status = "Alerta";
    }
  } else if (diferenca < 0) {
    status = "Finalizado";
  }
  return { homework, diferenca, status };
}

export type HomeworkStatus =
  | "Finalizado"
  | "Alerta"
  | "Atenção"
  | "Em andamento";
