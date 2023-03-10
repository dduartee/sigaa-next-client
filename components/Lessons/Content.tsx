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
  const [courseTitle, setCourseTitle] = React.useState<string>();
  useEffect(() => {
    if (props.course && props.course.lessons) {
      const currentMonth = moment().format("MMMM");
      setCurrentMonth(currentMonth);
      const lessonsByMonth = groupBy(props.course.lessons, (lesson) => {
        // retorna o mês da aula por extenso
        const mes = moment(lesson.startDate).format("MMMM");
        return mes;
      })
      setLessonsByMonth(lessonsByMonth);
      const lessonsByMonthKeys = Array.from(lessonsByMonth.keys());
      setMonths(lessonsByMonthKeys);
      setCourseTitle(props.course.title);
      setIsUpdating(false);
    }
  }, [props.course, props.course?.lessons]);
  const [alreadyUpdated, setAlreadyUpdated] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const update = () => {
    props.getLessons(false);
    setAlreadyUpdated(true);
    setIsUpdating(true);
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
        <Typography
          textAlign="center"
          fontWeight="400"
          fontSize={"1.2rem"}
          whiteSpace="break-spaces"
          mb={1}
        >
          {courseTitle}
        </Typography>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} mb={2}>
          {courseTitle ? (
            <Button variant="outlined" sx={{ mb: ".5rem", width: "150px" }} onClick={update} disabled={alreadyUpdated}>
              {isUpdating ? (
                "Atualizando"
              ) : alreadyUpdated ? "Atualizado" : "Atualizar"}
            </Button>
          ) : null}

          {
            props.loading || !props.course?.lessons ? (
              <Loading value={props.loading} />
            ) : props.course && months.length > 0 ? (
              <>
                <Typography
                  variant="caption"
                  display="block"
                  mb={".5rem"}
                  color={"gray"}>
                  (Última atualização: {getFriendlyDateString(props.course.timestamp)})
                </Typography>
                <Paper elevation={2} sx={{ padding: ".2rem", maxWidth: "1500px" }}>
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
                  }) : null}
                </Paper>
              </>
            ) : <Typography
            textAlign="center"
            fontWeight="400"
            fontSize={"1.2rem"}
            m={1}>
            Sem tópicos de aula cadastrados
          </Typography>
          }
        </Box>
      </Box>
    </Box>
  );
}
/**
 * hoje, ontem ou dd/mm
 * @param timestamp Timestamp da última atualização
 */
function getFriendlyDateString(timestamp?: string): string {
  if (!timestamp) {
    return "";
  }
  const timestampMoment = moment(timestamp);
  const date = timestampMoment.format("DD/MM");
  const today = moment().format("DD/MM");
  const yesterday = moment().subtract(1, "days").format("DD/MM");
  const dateString = date === today ? "Hoje" : date === yesterday ? "Ontem" : date;
  const time = timestampMoment.format("HH:mm");
  return `${dateString} às ${time}`;
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
  const startWeekDay = getWeekDay(props.lesson.startDate);
  const endWeekDay = getWeekDay(props.lesson.endDate);
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
          {props.lesson.title}
          <Typography fontSize={"1.2rem"} m={1} fontWeight="500">
            <span style={{ whiteSpace: "nowrap" }}>{startWeekDay}: {startDateString}</span>
            {startDateString !== endDateString ? (
              <span> até {endWeekDay}: {endDateString}</span>
            ) : null}
          </Typography>
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
export function formatDate(isoString: string) {
  return moment(isoString).utc().format("DD/MM/YYYY");
}
export function formatTime(isoString?: string) {
  return moment(isoString).utc().format("HH:mm");
}
export function getWeekDay(isoString: string) {
  return moment(isoString).utc().format("dddd");
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
