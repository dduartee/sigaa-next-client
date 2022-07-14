import React from "react";
import { Activity, Bond, Course, Homework } from "@types";
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import moment from "moment";
export default function Activities({
  data,
  loading,
}: {
  data: Bond[];
  loading: boolean;
}) {
  return (
    <>
      <Typography textAlign="center" fontWeight="500" fontSize={"1.5rem"}>
        Principais atividades
      </Typography>
      <Typography
        gutterBottom
        margin=".5rem"
        textAlign="center"
        fontWeight="500"
        fontSize={"1.5rem"}
      >
        (15 dias)
      </Typography>
      <Box display={"flex"} justifyContent={"center"}>
        {loading ? (
          <CircularProgress style={{ margin: "1rem" }} />
        ) : (
          <Box>
            {data?.map((bond: Bond) => {
              const activities = orderByDone(orderByDate(bond.activities));
              if (activities.length === 0) return (<Typography
                textAlign="center"
                fontWeight="500"
                fontSize={"1.5rem"}
                margin=".5rem"
              >
                Nenhuma atividade para os próximos 15 dias
              </Typography>)
              else return activities?.map((activity: Activity, index) => {
                const diff = getDiffDate(activity.date);
                const date = moment(activity.date)
                  .utcOffset(0)
                  .format("DD/MM/YYYY HH:mm");
                return (
                  <ActivityCollapse
                    key={index}
                    activity={activity}
                    diffday={diff}
                    date={date}
                  />
                );
              });
            })}
          </Box>
        )}
      </Box>
    </>
  );
}
function ActivityCollapse({
  activity,
  diffday,
  date,
}: {
  activity: Activity;
  diffday: number;
  date: string;
}) {
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
  const today = diffday === 0;
  const oneDay = diffday === 1;
  const finish = diffday > 0;
  return (
    <Box>
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        m={1}
        elevation={2}
        component={Paper}
      >
        <Box display="flex" margin="0.5rem">
          <Typography variant="h6" gutterBottom component="h2">
            {done ? (
              <s>{`${activity.course.title} - ${type}: ${activity.description}`}</s>
            ) : (
              <span>{`${activity.course.title} - ${type}: ${activity.description}`}</span>
            )}
          </Typography>
        </Box>
        <Box
          display="flex"
          sx={{ "@media (max-width:768px)": { flexDirection: "column" } }}
          margin="0.5rem"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="h2"
            margin="0.2rem"
            sx={{ whiteSpace: "nowrap" }}
          >
            {!finish ? (
              <span>{`(${today ? "" : diffday}${today ? "Hoje" : oneDay ? " dia" : " dias"})`}</span>
            ) : (
              <span>{`${diffday} dias atrás`}</span>
            )}
          </Typography>
          <Typography variant="h6" gutterBottom component="h2" margin="0.2rem">
            {`${date}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
function getDiffDate(date: string) {
  const dateActivity = new Date(date);
  const diff = moment(moment()).diff(dateActivity, "days");
  return diff;
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
