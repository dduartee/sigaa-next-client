import moment from 'moment';

export default function parseSchedule(schedule: string) {
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
