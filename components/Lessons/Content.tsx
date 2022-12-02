import { Attachment } from "@components/Activities/Content";
import { groupBy } from "@components/Grades/Content";
import {
  Box,
  Typography,
  CircularProgress,
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
import "react-moment";
import React, { useEffect, useState } from "react";

export default function Lessons(props: { course?: Course; loading: boolean }) {
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
      setMonths(lessonsByMonthKeys);
    }
  }, [lessonsByMonth]);
  return (
    <Box padding={1} minWidth={"50%"}>
      {props.loading || !props.course?.lessons ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          borderRadius={"10px"}
          padding={1}
        >
          <CircularProgress style={{ margin: "1rem" }} />
        </Box>
      ) : (
        <Box>
          <Typography
            textAlign="center"
            fontWeight="500"
            fontSize={"1.5rem"}
            whiteSpace="break-spaces"
            mb={2}
          >
            Tópicos de aula
          </Typography>
          <Typography
            textAlign="center"
            fontWeight="400"
            fontSize={"1rem"}
            whiteSpace="break-spaces"
            mb={2}
          >
            {props.course?.title}
          </Typography>
          <Box textAlign={"right"}>
            <Button
              onClick={() => setShowOthersMonths(!showOthersMonths)}
              style={{ color: "#fff" }}
            >
              <Typography variant="caption" display="block" color={"gray"}>
                {showOthersMonths
                  ? "Fechar todos anteriores"
                  : "Abrir todos anteriores"}
              </Typography>
            </Button>
          </Box>
          <Paper elevation={2} sx={{ padding: ".2rem" }}>
            {months.map((month, key) => {
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
            })}
          </Paper>
        </Box>
      )}
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
          {props.lesson.title} - {formatDate(props.lesson.startDate)} -{" "}
          {formatDate(props.lesson.endDate)}
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
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year}`;
}
export function formatTime(timeString: string) {
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
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
