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
export default function Activities({ data }: { data: Bond[] }) {
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        component="h1"
        margin="1rem"
        textAlign="center"
        fontWeight="500"
      >
        Atividades
      </Typography>
      {data?.map((bond: Bond) => {
        const activities = orderByDate(bond.activities);
        return activities?.map((activity: Activity, index) => {
          const diff = getDiffDate(activity.date);
          const date = moment(activity.date).format("DD/MM/YYYY");
          if (diff < 0) {
            return (
              <ActivityCollapse
                key={index}
                activity={activity}
                diff={diff}
                date={date}
              />
            );
          }
        });
      })}
    </>
  );
}
function ActivityCollapse({
  activity,
  diff,
  date,
}: {
  activity: Activity;
  diff: number;
  date: string;
}) {
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
            {`${activity.course.title} - ${type}: ${activity.description}`}
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
            {`(${Math.abs(diff)} dias)`}
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
