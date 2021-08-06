import { Bond, SchedulerData } from "@types";
import React from "react";
import parseSchedule from "@util/formatSchedule";
import moment from "moment";
import "moment/locale/pt-br";
import { capitalizeFirstLetter } from "@util/capitalizeFirstLetter";
import {
  ScheduleComponent,
  Inject,
  Week,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import Head from "next/head";
export default function Schedules({ data }: { data: Bond[] }) {
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
