import React, { useContext, useEffect, useState } from "react";
import { Activity, Bond, File, Homework } from "@types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Typography,
} from "@material-ui/core";
import { RegistrationContext } from "@context/registration";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { SocketContext } from "@context/socket";
import DescriptionIcon from '@material-ui/icons/Description';
export default function Activities({
  bond,
  loading,
}: {
  bond: Bond | null;
  loading: boolean;
}) {
  const [openFinished, setOpenFinished] = useState(false);
  const registration = useContext(RegistrationContext)
  const [activities, setActivities] = useState<Activity[] | null>(null);
  useEffect(() => {
    if (bond?.activities) {
      setActivities(orderByDone(orderByDate(bond.activities)));
    }
  }, [bond, registration]);

  useEffect(() => {
    const activitiesCached = JSON.parse(localStorage.getItem(`activities-${registration}`) ?? "{}");
    if (activitiesCached) {
      const timestamp = new Date(activitiesCached.timestamp);
      const now = new Date();
      if (now.getTime() - timestamp.getTime() < 1000 * 60 * 60 * 24) {
        setActivities(activitiesCached.activities);
      } else {
        localStorage.removeItem(`activities-${registration}`);
      }
    }
  }, [registration]);

  return (
    <Box padding={2} mb={1} sx={{
      "@media (max-width:768px)": {
        maxWidth: "100%",
      }
    }} maxWidth={"80%"} minWidth={"50%"}>
      <Typography textAlign="center" fontWeight="500" fontSize={"1.5rem"} mb={2}
      >
        Principais atividades
      </Typography>

      <Box display={"flex"} justifyContent={"center"} borderRadius={"10px"} padding={1}>
        {loading || !activities ? (
          <Box width="100%" textAlign={"center"}>
            <CircularProgress style={{ margin: "1rem" }} />
          </Box>
        ) : (
          <Box width={"100%"}>
            {activities.length === 0 ? (
              <Typography
                textAlign="center"
                fontWeight="500"
                fontSize={"1.3rem"}
                margin=".5rem"
              >
                Nenhuma atividade para os próximos 15 dias
              </Typography>
            ) : activities?.map((activity: Activity, index) => {
              const activityDate = new Date(activity.date);
              const days = Math.floor((activityDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              return (
                <ActivityCollapse
                  key={index}
                  activity={activity}
                  days={days}
                  date={activityDate}
                  openFinished={openFinished}
                />
              );
            })}
          </Box>
        )}
      </Box>
      {loading || !activities || activities?.length === 0 ? (
        null
      ) : <Box textAlign={"right"}>
        <Button onClick={() => setOpenFinished(!openFinished)} style={{ color: "#fff" }}>
          <Typography variant="caption" display="block" color={"gray"}>
            {
              openFinished ? "Ocultar atividades finalizadas" : "Mostrar atividades finalizadas"
            }
          </Typography>
        </Button>
      </Box>}
    </Box>
  );
}
function ActivityCollapse({
  activity,
  days,
  date,
  openFinished,
}: {
  activity: Activity;
  days: number;
  date: Date;
  openFinished: boolean;
}) {
  const [content, setContent] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const socket = useContext(SocketContext);
  const registration = useContext(RegistrationContext);
  const loadContent = (activity: Activity) => {
    if (activity.type === "homework") {
      if (!content) {
        socket.emit("homework::content", {
          inactive: false,
          registration,
          activityTitle: activity.title,
          token: localStorage.getItem("token"),
        })
      }
    }
  }
  useEffect(() => {
    socket.on("homework::content", (homework: Homework) => {
      if (homework.title === activity.title) {
        setContent(homework.content ?? "");
        if (homework.attachment) {
          setAttachment(homework.attachment);
        }
      }
    })
  }, [activity.title, socket]);
  const done = activity.done;
  let type;
  switch (activity.type) {
    case "exam":
      type = "Avaliação";
      break;
    case "homework":
      type = "Tarefa";
      break;
    case "quiz":
      type = "Questionário";
      break;
  }
  const [expanded, setExpanded] = useState(false);
  const finish = days < 0;
  const today = days === 0;
  const tomorrow = days === 1;

  const dateString = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}/${date.getFullYear()}`;
  const timeString = `${date.getUTCHours() < 10 ? "0" : ""}${date.getUTCHours()}:${date.getUTCMinutes() < 10 ? "0" : ""}${date.getUTCMinutes()}`;

  return (
    <Box mb={2} maxWidth={"100%"}>
      <Collapse in={!finish || openFinished} unmountOnExit>
        <Accordion sx={{
          marginBottom: ".4rem",
          border: 0,
          ":first-of-type": {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          },
          borderRadius: "10px",
          "::before": {
            height: "0px"
          }
        }} elevation={3}
          expanded={expanded && (activity.type === "homework")}
          onChange={() => { loadContent(activity); setExpanded(!expanded) }}
        >
          <AccordionSummary
            sx={{ flexDirection: "row-reverse" }}
            expandIcon={activity.type === "homework" ? <ExpandMore /> : null}
          >
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              justifyContent="center"
              flexDirection={"column"}
              m={1}
              sx={{
                color: finish ? "gray" : done ? "#32A041" : "white",
              }}
            >
              <Typography textAlign={"center"} fontWeight={"500"} fontSize="1.1rem">
                {activity.course.title}
              </Typography>
              <Box display={"flex"} flexDirection="row" justifyContent={"space-between"}>
                <Box display="flex" margin="0.5rem">
                  <Typography variant="h6" gutterBottom component="h2">
                    <span>{`${type}: ${activity.title}`}</span>
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  sx={{
                    "@media (max-width:768px)": {
                      flexDirection: "column",
                    }
                  }}
                  margin="0.5rem"
                  textAlign={"right"}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="h2"
                    margin="0.2rem"
                  >
                    {!finish ? (
                      <span>{`(${today ? "Hoje" : Math.abs(days)}${today ? "" : (tomorrow ? " dia" : " dias")})`}</span>
                    ) : (
                      <span>{`(${Math.abs(days)}${Math.abs(days) === 1 ? " dia" : " dias"} atrás)`}</span>
                    )}
                  </Typography>
                  <Typography variant="h6" gutterBottom component="h2" margin="0.2rem">
                    {dateString}
                  </Typography>
                  <Typography variant="h6" gutterBottom component="h2" margin="0.2rem">
                    {timeString}
                  </Typography>
                </Box>
              </Box>

            </Box>
          </AccordionSummary>

          {activity.type === "homework" ?
            <AccordionDetails sx={{
              whiteSpace: "pre-line",
            }}>
              {content ?
                content.split("\n").map((text, key) => {
                  if (text.split(" ").length > 1) {
                    return <Typography key={key} gutterBottom component="p" whiteSpace={"pre-line"} marginBottom={"1.5rem"}>
                      {text}
                    </Typography>
                  } else {
                    return <Typography key={key} gutterBottom component="p" sx={{ lineBreak: "anywhere" }} marginBottom={"1.5rem"}>
                      {text}
                    </Typography>
                  }
                }) : (
                  <Box display={"flex"} justifyContent={"center"} borderRadius={"10px"} padding={1}>
                    <CircularProgress sx={{ margin: "1rem" }} />
                  </Box>
                )}
              <br />
              {attachment ?
                <Button
                  variant="outlined"
                  href={`https://sigaa.ifsc.edu.br/sigaa/verFoto?idArquivo=${attachment.id}&key=${attachment.key}`}
                  target="_blank"
                  style={{ color: "#32A041", display: "flex", alignItems: "center" }}
                >
                  <DescriptionIcon />
                  <Typography gutterBottom={false} marginLeft={".3rem"}>Arquivo anexado</Typography>
                </Button>
                : null}
            </AccordionDetails>
            : null}
        </Accordion>
      </Collapse>
    </Box>

  );
}
function orderByDate(activities: Activity[]) {
  return activities.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
  });
}

function orderByDone(activities: Activity[]) {
  return activities.sort((a, b) => {
    return a.done < b.done ? -1 : a.done > b.done ? 1 : 0;
  });
}
