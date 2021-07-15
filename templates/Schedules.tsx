import { Bond, SchedulerData } from "@types";
import React from "react";
import parseSchedule from "@util/formatSchedule";
import moment from "moment";
import 'moment/locale/pt-br';
import { capitalizeFirstLetter } from "@util/capitalizeFirstLetter";
// TO-DO: Adicionar calendario de eventos
export default function Schedules({ data }: { data: Bond[] }) {
    const schedulerData = [] as SchedulerData[];
    data.map(({ courses }) => {
        courses.map(course => {
            const { startDate, endDate } = parseSchedule(course.schedule);
            console.log({startDate, endDate})
            schedulerData.push({
                startDate: startDate,
                endDate: endDate,
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