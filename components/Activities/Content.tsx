import React, { useContext, useEffect, useState } from "react";
import { Activity, Bond, Course, File, Homework } from "@types";
import { RegistrationContext } from "@context/registration";
import { formatDate, formatTime } from "@components/Lessons/Content";
import { useRouter } from "next/router";
import Loading from "@components/Loading";
import moment from "moment-timezone";
import FormattedContent from "@components/Lessons/FormattedContent";
import { SocketContext } from "@context/socket";
import { ExpandMore,
  More as MoreIcon,
 } from "@mui/icons-material";
import { Box, Typography, Button, Collapse, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from "@mui/material";
import { Attachment } from "./Attachment";

export default function Activities({
  bond,
  loading,
}: {
  bond: Bond | undefined;
  loading: boolean;
}) {
  const router = useRouter();
  const [openFinished, setOpenFinished] = useState(false);
  const registration = useContext(RegistrationContext);
  const [activities, setActivities] = useState<Activity[] | undefined>(undefined);
  const accessCourse = (registration: string, courseId: string) => {
    router.push(`/bond/${registration}/course/${courseId}`);
  };
  useEffect(() => {
    if (bond?.activities) {
      setActivities(orderByDone(orderByDate(bond.activities)));
    }
  }, [bond, registration]);

  return (
    <Box
      padding={2}
      mb={1}
      sx={{
        "@media (max-width:768px)": {
          maxWidth: "100%",
        },
      }}
      maxWidth={"80%"}
      minWidth={"50%"}
    >
      <Typography
        textAlign="center"
        fontWeight="500"
        fontSize={"1.5rem"}
        mb={2}
      >
        Principais atividades
      </Typography>

      <Box
        display={"flex"}
        justifyContent={"center"}
        borderRadius={"10px"}
        padding={1}
      >
        {loading || !activities ? (
          <Loading value={loading} />
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
            ) : (
              activities?.map((activity: Activity, index) => {
                return (
                  <ActivityCollapse
                    key={index}
                    activity={activity}
                    date={activity.date}
                    openFinished={openFinished}
                    accessCourse={accessCourse}
                  />
                );
              })
            )}
          </Box>
        )}
      </Box>
      {loading || !activities || activities?.length === 0 ? null : (
        <Box textAlign={"right"}>
          <Button
            onClick={() => setOpenFinished(!openFinished)}
            style={{ color: "#fff" }}
          >
            <Typography variant="caption" display="block" color={"gray"}>
              {openFinished
                ? "Ocultar atividades finalizadas"
                : "Mostrar atividades finalizadas"}
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
}
function ActivityCollapse({
  activity,
  date,
  openFinished,
  accessCourse,
}: {
  activity: Activity;
  date: string;
  openFinished: boolean;
  accessCourse: (registration: string, courseId: string) => void;
}) {
  const [courseId, setCourseId] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const socket = useContext(SocketContext);
  const registration = useContext(RegistrationContext);
  const loadContent = (activity: Activity) => {
    if (activity.type === "homework") {
      if (!content) {
        socket.emit("homework::content", {
          inactive: false,
          registration,
          cache: true,
          courseTitle: activity.course.title,
          homeworkTitle: activity.title,
          homeworkId: activity.id,
          token: sessionStorage.getItem("token"),
        });
      }
    }
  };
  useEffect(() => {
    socket.on("homework::content", (course: Course) => {
      const homework = course.homeworks?.find(
        (h: Homework) => h.title === activity.title
      );
      if (homework) {
        setContent(homework.content ?? "");
        setCourseId(course.id);
        if (homework.attachment) setAttachment(homework.attachment);
      }
    });
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
  // const finish = days < 0;
  // const today = days === 0;
  // const tomorrow = days === 1;
  const days = moment(date).diff(moment(), "days");
  const finish = days < 0;
  const today = days === 0;
  const tomorrow = days === 1;
  const dateString = formatDate(date);
  const timeString = formatTime(date);

  return (
    <Box mb={2} maxWidth={"100%"}>
      <Collapse in={!finish || openFinished} unmountOnExit>
        <Accordion
          sx={{
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
              height: "0px",
            },
          }}
          elevation={3}
          expanded={expanded && activity.type === "homework"}
          onChange={() => {
            loadContent(activity);
            setExpanded(!expanded);
          }}
        >
          <AccordionSummary
            sx={{ flexDirection: "row-reverse" }}
            expandIcon={activity.type === "homework" ? <ExpandMore /> : null}
          >
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              justifyContent="space-evenly"
              flexDirection={"column"}
              m={1}
              sx={{
                color: finish ? "gray" : done ? "#32A041" : "white",
              }}
            >
              <Typography
                textAlign={"center"}
                fontWeight={"500"}
                fontSize="1.1rem"
              >
                {activity.course.title}
              </Typography>
              <Box
                display={"flex"}
                flexDirection="row"
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Box display="flex" margin="0.5rem">
                  <Typography variant="h6" gutterBottom component="h2">
                    {`${type}: ${activity.title}`}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  sx={{
                    "@media (max-width:1000px)": {
                      flexDirection: "column",
                    }
                  }}
                  margin="0.5rem"
                  textAlign={"right"}
                  whiteSpace={"nowrap"}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="h2"
                    margin="0.2rem"
                  >
                    {!finish ? (
                      <span>{`(${today ? "Hoje" : Math.abs(days)}${today ? "" : tomorrow ? " dia" : " dias"
                        })`}</span>
                    ) : (
                      <span>{`(${Math.abs(days)}${Math.abs(days) === 1 ? " dia" : " dias"
                        } atrás)`}</span>
                    )}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="h2"
                    margin="0.2rem"
                  >
                    {dateString}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="h2"
                    margin="0.2rem"
                  >
                    {timeString}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </AccordionSummary>

          {registration && activity.type === "homework" ? (
            <AccordionDetails sx={{ whiteSpace: "pre-line" }}>
              {content ? (
                <Box display={"flex"} flexDirection={"column"}>
                  <FormattedContent>{content}</FormattedContent>
                  <Box display={"flex"} flexDirection={"row"} width="100%" justifyContent={"space-around"}>
                    {attachment ? <Attachment attachment={attachment} /> : null}
                    <Button
                      onClick={() => accessCourse(registration, courseId)}
                      variant="outlined"
                      color="primary"
                      endIcon={<MoreIcon sx={{ transform: "scaleX(-1)" }} />}
                      sx={{
                        display: "flex",
                        alignSelf: "flex-end",
                      }}
                    >
                      Acessar turma
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  borderRadius={"10px"}
                  padding={1}
                >
                  <CircularProgress sx={{ margin: "1rem" }} />
                </Box>
              )}
            </AccordionDetails>
          ) : null}
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
