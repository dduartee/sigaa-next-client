import React, { useContext, useEffect, useState } from "react";
import Home from "@templates/Home";
import { useRouter } from "next/router";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box } from "@material-ui/core";
import { UserContext } from "@context/user";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { DataContext } from "@context/data";
import { GetServerSidePropsContext } from "next";
import useAPIHandler from "@hooks/useAPIHandler";
import { LoadingContext } from "@context/loading";
import useCourseEvents, {
  emitCourseList,
} from "@hooks/courses/useCourseEvents";
import Head from "next/head";
import { Bond, SchedulerData } from "@types";
import parseSchedule from "@util/formatSchedule";
import "moment/locale/pt-br";
import {
  ScheduleComponent,
  Inject,
  Week,
} from "@syncfusion/ej2-react-schedule";
import useTabHandler from "@hooks/useTabHandler";

function SchedulesPage({
  registration,
  actionPrimary,
}: {
  registration: string;
  actionPrimary: string;
}) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const [valid, setValid] = useState(true);
  useTokenHandler(setValid);
  const { user, setUser } = useUserHandler({ valid });
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(1);
  const { data } = useCourseEvents();
  useTabHandler({tab, setLoading, registration, valid})
  useAPIHandler();
  console.log("Registration: " + registration);
  console.log("Action primary: " + actionPrimary);
  useEffect(() => {
    if (valid) {
      emitCourseList(
        { token: localStorage.getItem("token"), registration },
        socket
      );
      emitUserInfo({ token: localStorage.getItem("token") }, socket);
    } else window.location.href = "/";
  }, [valid]);

  return (
    <>
      <Head>
        <title>Horários | sigaa-next-client</title>
      </Head>
      <UserContext.Provider value={user}>
        <DataContext.Provider value={data}>
          <LoadingContext.Provider value={loading}>
            <Home setTab={setTab} tab={tab}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Schedules data={data} />
              </Box>
            </Home>
          </LoadingContext.Provider>
        </DataContext.Provider>
      </UserContext.Provider>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  };
}
export default SchedulesPage;

function Schedules({ data }: { data: Bond[] }) {
  const schedulerData = [] as SchedulerData[];
  data.map(({ courses }) => {
    courses.map((course) => {
      const { startDate, endDate } = parseSchedule(course.schedule);
      console.log({ startDate, endDate });
      schedulerData.push({
        StartTime: startDate,
        EndTime: endDate,
        Subject: course.title,
        Id: course.id,
      });
    });
  });
  return (
    <div>
      <Head>
        <title>Horários | sigaa-next-client</title>
      </Head>
      <ScheduleComponent
        currentView="Week"
        selectedDate={new Date()}
        startHour="7:00 AM"
        views={["Week"]}
        eventSettings={{ dataSource: schedulerData }}
        readOnly
        workDays={[0, 1, 2, 3, 4, 5, 6]}
        workHours={{ highlight: true, start: "0:00", end: "23:59" }}
      >
        <Inject services={[Week]} />
      </ScheduleComponent>
    </div>
  );
}
