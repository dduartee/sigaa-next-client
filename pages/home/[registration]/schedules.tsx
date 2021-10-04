import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SocketContext } from "@context/socket";
import useTokenHandler from "@hooks/useTokenHandler";
import { Box } from "@material-ui/core";
import useUserHandler, { emitUserInfo } from "@hooks/useUserHandler";
import { GetServerSidePropsContext } from "next";
import useAPIHandler from "@hooks/useAPIEvents";
import useCourseEvents, {
  emitCourseList,
} from "@hooks/courses/useCourseEvents";
import Head from "next/head";
import { Bond, SchedulerData } from "@types";
import "moment/locale/pt-br";
import {
  ScheduleComponent,
  Inject,
  Week,
} from "@syncfusion/ej2-react-schedule";
import useTabHandler from "@hooks/useTabHandler";
import HomeProviders from "@components/homeProvider";
import moment from "moment";
function InitializeHooks({ registration }: { registration: string }) {
  const [valid, setValid] = useState(true);
  useTokenHandler(setValid);
  const { user, setUser } = useUserHandler({ valid });
  const [loading, setLoading] = useState(false);
  const { data } = useCourseEvents();
  const { tab, setTab } = useTabHandler({
    order: 1,
    setLoading,
    registration,
    valid,
  });
  useAPIHandler();
  return {
    valid,
    user,
    loading,
    data,
    tab,
    setTab,
  };
}
export default function SchedulesPage({ registration }: { registration: string }) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const { valid, user, loading, data, tab, setTab } = InitializeHooks({
    registration,
  });
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
      <HomeProviders
        data={data}
        loading={loading}
        user={user}
        setTab={setTab}
        tab={tab}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Schedules data={data} />
        </Box>
      </HomeProviders>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  };
}

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

function parseSchedule(schedule: string | null) {
  if (!schedule) return { startDate: new Date("January 01, 1970 00:00:00"), endDate: new Date("January 01, 1970 00:00:00") };
  const periodo = schedule.substr(1, 1);
  const diaSemana = parseInt(schedule.substr(0, 1)) - 1;
  const horarios = schedule.substr(2).split('') as any;

  const horariosM = [[], ["7:45:00", "8:40:00"], ["8:40:00", "9:35:00"], ["9:55:00", "10:50:00"], ["10:50:00", "11:45:00"]];
  const horariosT = [[], ["13:30:00", "14:25:00"], ["14:25:00", "15:20:00"], ["15:40:00", "16:35:00"], ["16:35:00", "17:30:00"]];

  const horarioList = [];
  for (const horario of horarios) horarioList.push(periodo === "T" ? horariosT[horario] : horariosM[horario])

  const dayMonthYear = moment().weekday(diaSemana).format('DD/MM/YYYY');
  const startDate = new Date(`${dayMonthYear.split("/").reverse().join("/")} ${horarioList[0][0]}`);
  horarioList.reverse()[0].reverse();
  const endDate = new Date(`${dayMonthYear.split("/").reverse().join("/")} ${horarioList[0][0]}`)
  return { startDate, endDate };
}