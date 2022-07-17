import React, { useContext, useEffect, useState } from "react";
import { Activity, Bond } from "@types";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { RegistrationContext } from "@context/registration";
export default function Activities({
  bond,
  loading,
}: {
  bond: Bond | null;
  loading: boolean;
}) {
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
    <Box padding={2} mb={2}>
      <Typography textAlign="center" fontWeight="500" fontSize={"1.5rem"} whiteSpace="break-spaces" mb={2}>
        Principais atividades
      </Typography>

      <Box display={"flex"} justifyContent={"center"} borderRadius={"10px"} elevation={2}
        component={Paper} padding={1}>
        {loading || !activities ? (
          <CircularProgress style={{ margin: "1rem" }} />
        ) : (
          <Box>
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
              const diffday = getDiffDate(activity.date);
              const date = moment(activity.date)
                .utcOffset(0)
                .format("DD/MM/YYYY HH:mm");
              return (
                <ActivityCollapse
                  key={index}
                  activity={activity}
                  diffday={diffday}
                  date={date}
                />
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
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
      >
        <Box display="flex" margin="0.5rem" component={Paper} elevation={2}>
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
