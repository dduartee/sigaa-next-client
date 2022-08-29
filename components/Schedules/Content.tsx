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
    if (scheduleData.length == 0) {
      courses?.map((course) => {
        const schedulesData = generateScheduleData(course.schedule ?? "");
        schedulesData.map((weekDaySchedules) => {
          weekDaySchedules.map((weekDaySchedule) => {
            setScheduleData(prev => [...prev, {
              StartTime: weekDaySchedule.startDate,
              EndTime: weekDaySchedule.endDate,
              Subject: course.title,
              Id: course.id,
            }]);
          })
        });
      });
    }
  }, [bond, courses, scheduleData.length]);
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
function generateScheduleData(scheduleCode: string) {
  const schedules = scheduleCode.split(' ');
  return schedules.map((schedule) => {
    const timesHour = new Map<string, string[][]>()
      .set("M", [[], ["7:45:00", "8:40:00"], ["8:40:00", "9:35:00"], ["9:55:00", "10:50:00"], ["10:50:00", "11:45:00"]])
      .set("T", [[], ["13:30:00", "14:25:00"], ["14:25:00", "15:20:00"], ["15:40:00", "16:35:00"], ["16:35:00", "17:30:00"]])
      .set("N", [[], ["18:30:00", "19:25:00"], ["19:25:00", "20:20:00"], ["20:40:00", "21:35:00"], ["21:35:00", "22:30:00"]]);
    // schedule can be "2T3", "3M12 4M34" or "43M12"
    const [period] = schedule.match(/[A-Z]/) ?? [];
    const [weekDays] = schedule.match(/^[0-9]+/) ?? []
    const [, times] = schedule.match(/[0-9]+/g) ?? [];
    if (!period || !weekDays || !times) {
      return []
    }
    // scheduleData
    /**
     * [
     * {
     * "period": "M",
     * "weekDay": "4",
     * "times": ["1", "2"]
     * },
     * {
     * "period": "M",
     * "weekDay": "6",
     * "times": ["1", "2"]
     * }
     * ]
     */
    const scheduleData = weekDays.split("").map(weekDay => {
      const weekDayDate = moment().weekday(parseInt(weekDay) - 1).format('DD/MM/YYYY');
      return times.split("").map(time => {
        const [startTime, endTime] = timesHour.get(period)?.[parseInt(time)] ?? [];
        if (!startTime || !endTime) return { startDate: new Date("January 01, 1970 00:00:00"), endDate: new Date("January 01, 1970 00:00:00") }
        const startDate = moment(`${weekDayDate} ${startTime}`, 'DD/MM/YYYY HH:mm:ss').toDate();
        const endDate = moment(`${weekDayDate} ${endTime}`, 'DD/MM/YYYY HH:mm:ss').toDate();
        return {
          startDate,
          endDate,
        }
      })
    })
    return scheduleData
  }).flat()
}