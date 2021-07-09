import { Bond, SchedulerData } from "@types";
import React from "react";
import parseSchedule from "@util/formatSchedule";
import moment from "moment";
import 'moment/locale/pt-br';
import { capitalizeFirstLetter } from "@util/capitalizeFirstLetter";
export default function Schedules({ data }: { data: Bond[] }) {
    const schedulerData = [] as SchedulerData[];
    data.map(({ courses }) => {
        courses.map(course => {
            const { startDate, endDate } = parseSchedule(course.schedule);
            schedulerData.push({
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                title: course.title,
                id: course.id,
            })
        });
    });
    return (
        <div>
            {schedulerData.map((schedule, key) => {
                const startDate = moment(schedule.startDate).locale('pt-br').format("dddd, [dia] DD [às] h:mm");
                const endDate = moment(schedule.endDate).format("h:mm");
                return (
                    <div key={key}>
                        <p>{schedule.title}</p>
                        <p>{capitalizeFirstLetter(startDate)} - {endDate}</p>
                    </div>
                )
            })
            }
        </div>
    );
}