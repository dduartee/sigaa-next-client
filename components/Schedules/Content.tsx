import { RegistrationContext } from "@context/registration";
import { Collapse } from "@material-ui/core";
import { Day, Week, Schedule, isMobile } from "@syncfusion/ej2-react-schedule";
import { Bond, Course } from "@types";
import moment from "moment";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
export type SchedulerData = {
  Id: string;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
};
export default function Schedules({ bond }: { bond: Bond | null }) {
  const registration = useContext(RegistrationContext)
  const [courses, setCourses] = React.useState<Course[] | null>(null);
  React.useEffect(() => {
    if (bond?.courses) {
      setCourses(bond.courses);
    }
  }, [bond, registration]);

  React.useEffect(() => {
    const coursesCached = JSON.parse(localStorage.getItem(`courses-${registration}`) || "{}");
    if (coursesCached) {
      const timestamp = new Date(coursesCached.timestamp);
      const now = new Date();
      if (now.getTime() - timestamp.getTime() < 1000 * 60 * 60 * 24) {
        setCourses(coursesCached.courses);
      } else {
        localStorage.removeItem(`courses-${registration}`);
      }
    }
  }, [registration]);
  const [scheduleData, setScheduleData] = React.useState<SchedulerData[]>([]);
  useEffect(() => {
    courses?.map((course) => {
      const schedules = parseSchedule(course.schedule ?? null);
      schedules.map((schedule) => {
        setScheduleData(prev => [...prev, {
          StartTime: schedule.startDate,
          EndTime: schedule.endDate,
          Subject: course.title,
          Id: course.id,
        }]);
      });
    });
  }, [bond]);
  useEffect(() => {
    Schedule.Inject(Day, Week);
    const scheduleObj = new Schedule({
      currentView: isMobile() ? "Day" : "Week",
      selectedDate: new Date(),
      eventSettings: {
        dataSource: scheduleData,
        allowAdding: false,
        allowEditing: false,
        allowDeleting: false,
        enableIndicator: false,
      },
      views: [
        "Day",
        "Week"
      ],
      startHour: "7:00 AM",
      readonly: true,
      workDays: [0, 1, 2, 3, 4, 5, 6],
      workHours: {
        highlight: true,
        start: "0:00",
        end: "23:59",
      },
    })
    scheduleObj.appendTo('#schedule');
  }, [scheduleData]);
  return (
    <div>
      <Head>
        <title>Horários | sigaa-next-client</title>
      </Head>
      <Collapse in={scheduleData.length > 0}>
        {
          scheduleData.length > 0 ? (
            <div id="schedule" />
          ) : null}
      </Collapse>
    </div >
  );
}

function parseSchedule(schedule: string | null) {
  const schedules = schedule?.split(" ") ?? []
  return schedules.map(schedule => {
    if (!schedule) return { startDate: new Date("January 01, 1970 00:00:00"), endDate: new Date("January 01, 1970 00:00:00") };
    const periodo = schedule.substr(1, 1);
    const diaSemana = parseInt(schedule.substr(0, 1)) - 1;
    const horarios = schedule.substr(2).split('') as any[]

    const horariosM = [[], ["7:45:00", "8:40:00"], ["8:40:00", "9:35:00"], ["9:55:00", "10:50:00"], ["10:50:00", "11:45:00"]];
    const horariosT = [[], ["13:30:00", "14:25:00"], ["14:25:00", "15:20:00"], ["15:40:00", "16:35:00"], ["16:35:00", "17:30:00"]];
    const horariosN = [[], ["18:30:00", "19:25:00"], ["19:25:00", "20:20:00"], ["20:40:00", "21:35:00"], ["21:35:00", "22:30:00"]];

    const horarioList = horarios.map(horario => {
      switch (periodo) {
        case "M":
          return horariosM[horario];
        case "T":
          return horariosT[horario];
        default:
          return horariosN[horario];
      }
    })

    const dayMonthYear = moment().weekday(diaSemana).format('DD/MM/YYYY');
    const startDate = new Date(`${dayMonthYear.split("/").reverse().join("/")} ${horarioList[0][0]}`);
    horarioList.reverse()[0].reverse();
    const endDate = new Date(`${dayMonthYear.split("/").reverse().join("/")} ${horarioList[0][0]}`)
    return { startDate, endDate };
  });
}