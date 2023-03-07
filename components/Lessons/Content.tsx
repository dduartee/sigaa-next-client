import { Attachment } from "@components/Activities/Content";
import { groupBy } from "@components/Grades/Content";
import {
  Box,
  Typography,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Course, Lesson } from "@types";
import moment from "moment";
import "moment/locale/pt";
import React, { useEffect, useState } from "react";
import Loading from "@components/Loading";

export default function Lessons(props: { course?: Course; loading: boolean; getLessons: (cache: boolean) => void }) {
  moment.locale("pt-br");
  const [showOthersMonths, setShowOthersMonths] = React.useState(false);
  const [lessonsByMonth, setLessonsByMonth] =
    React.useState<Map<string, Lesson[]>>();
  const [months, setMonths] = React.useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = React.useState<string>();

  useEffect(() => {
    if (props.course) {
      setCurrentMonth(moment().format("MMMM"));
      setLessonsByMonth(
        groupBy(props.course.lessons || [], (lesson) => {
          // retorna o mês da aula por extenso
          const mes = moment(lesson.startDate).format("MMMM");
          return mes;
        })
      );
    }
  }, [props.course, props.course?.lessons]);
  useEffect(() => {
    if (lessonsByMonth) {
      const lessonsByMonthKeys = Array.from(lessonsByMonth.keys());
      // se já estiver se passado metade do ano, inverte a ordem dos meses
      if (moment().month() > 5) {
        lessonsByMonthKeys.reverse();
      }
      setMonths(lessonsByMonthKeys);
    }
  }, [lessonsByMonth]);
  const [alreadyUpdated, setAlreadyUpdated] = useState(false);
  const update = () => {
    props.getLessons(false);
    setAlreadyUpdated(true);
  }
  return (
    <Box padding={1} minWidth={"50%"}>
      <Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography
            textAlign="center"
            fontWeight="500"
            fontSize={"1.5rem"}
            whiteSpace="break-spaces"
            mb={1}
          >
            Tópicos de aula
          </Typography>
        </Box>
        {props.loading || !props.course?.lessons ? (
          <Loading value={props.loading} />
        ) : (
          <>
            <Typography
              textAlign="center"
              fontWeight="400"
              fontSize={"1.2rem"}
              whiteSpace="break-spaces"
              mb={1}
            >
              {props.course?.title}
            </Typography>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} mb={2}>
              <Button variant="outlined" sx={{ mb: ".5rem", width: "150px" }} onClick={update} disabled={alreadyUpdated}>{alreadyUpdated ? "Atualizado" : "Atualizar"}</Button>
              <Typography
                variant="caption"
                display="block"
                color={"gray"}>
                (Última atualização: {moment(props.course.timestamp).calendar({
                  sameDay: "[Hoje]",
                  lastDay: "[Ontem]",
                })} às {moment(props.course.timestamp).format("HH:mm:ss")})
              </Typography>
            </Box>
            <Paper elevation={2} sx={{ padding: ".2rem", maxWidth: "1500px" }}>
              {months.length > 0 ? (
                <Box textAlign={"right"}>
                  <Button
                    onClick={() => setShowOthersMonths(!showOthersMonths)}
                    style={{ color: "#fff" }}
                    color={"inherit"}>
                    <Typography variant="caption" display="block" color={"gray"} >
                      {showOthersMonths ? "Fechar " : "Abrir "}
                      outros meses
                    </Typography>
                  </Button>
                </Box>
              ) : null}
              {months.length > 0 ? months.map((month, key) => {
                const show = month === currentMonth;
                return (
                  <MonthAccordion
                    key={key}
                    month={month}
                    lessons={lessonsByMonth?.get(month) || []}
                    show={show}
                    openAll={showOthersMonths}
                  />
                );
              }) : (
                <Typography
                  textAlign="center"
                  fontWeight="400"
                  fontSize={"1.2rem"}
                  m={1}>
                  Sem tópicos de aula cadastrados
                </Typography>
              )}
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
}
function MonthAccordion(props: {
  lessons: Lesson[];
  month: string;
  show: boolean;
  openAll: boolean;
}) {
  const { lessons, month, show, openAll } = props;
  const [open, setOpen] = useState(show);
  return (
    <Box m={0.3} mb={1}>
      <Accordion expanded={open || openAll} onChange={() => setOpen(!open)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontSize="1.1rem">
            {month.charAt(0).toUpperCase() + month.slice(1)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {lessons?.map((lesson, key) => (
            <LessonContent key={key} lesson={lesson} />
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
function LessonContent(props: { lesson: Lesson }) {
  const weekDay = moment(props.lesson.startDate).utc().format("dddd");
  const startDateString = formatDate(props.lesson.startDate);
  const endDateString = formatDate(props.lesson.endDate);
  return (
    <Box
      sx={{
        marginBottom: ".8rem",
        border: 0,
        ":first-of-type": {
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        },
        ":last-of-type": {
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        },
      }}
    >
      <Paper elevation={2} sx={{ padding: ".5rem" }}>
        <Typography fontSize={"1.2em"} fontWeight="500">
          {props.lesson.title} -
        </Typography>
        <Typography fontSize={"1rem"} m={1} fontWeight="500">
          {weekDay}{": "}
          {
            startDateString === endDateString ? (startDateString) : (`${startDateString} a ${endDateString}`)}
        </Typography>
        <Typography fontSize={"1rem"} m={1}>
          {props.lesson.content ? formatContent(props.lesson.content) : " "}
        </Typography>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          m={0.5}
          width="100%"
          justifyContent={"start"}
        >
          {props.lesson.attachments.map((attachment, key) => {
            return (
              <Box m={0.5} key={key} width="100%" maxWidth={"400px"}>
                <Attachment attachment={attachment} />
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
/**
 * retorna data no formado DD/MM/YYY
 */
export function formatDate(dateString: string) {
  return moment(dateString).utc().format("DD/MM/YYYY");
}
export function formatTime(timeString: string) {
  return moment(timeString).utc().format("HH:mm");
}
export function formatContent(content: string) {
  return content.split("\n").map((text, key) => {
    return (
      <Typography
        key={key}
        gutterBottom
        whiteSpace={"pre-line"}
        sx={{
          whiteSpace: text.split(" ").length > 1 ? "pre-line" : "unset",
          lineBreak: text.split(" ").length > 1 ? "unset" : "anywhere",
        }}
        marginBottom={"1.5rem"}
      >
        {urlify(text)}
      </Typography>
    );
  });
}

function urlify(text: string) {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gi;
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text.replace(urlRegex, function (url) {
          return `<a href="${url}" target="_blank" style="color: #32A041">${url}</a>`;
        }),
      }}
    />
  );
}
