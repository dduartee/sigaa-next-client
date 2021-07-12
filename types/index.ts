export type UserCredentials = {
    username: string,
    password: string,
    token?: string
}
export type UserInfo = {
    fullName?: string,
    profilePictureURL?: string | undefined
}
export type UserStatus = 'Logado' | 'Deslogado' | 'Logando' | 'Deslogando'

export type Bond = {
    program: string,
    registration: string,
    courses: Course[]
}
export type Course = {
    id: string,
    title: string,
    code: string,
    period: string,
    schedule: string,
    news: any[],
    homeworks: any[],
    grades: GradeGroup[],
}


export type GradeGroup = {
    name: string;
    value: number;
    grades: Grade[];
    type: 'only-average' | 'sum-of-grades' | 'weighted-average';
}
export type Grade = {
    name: string;
    code: string;
    weight: number;
    value: number;
}
export type SlugParams = {
    registration: string | null;
    actionPrimary: "news" | "homeworks" | "grades" | "course" | "schedules" | null;
    code: string | null;
    actionSecondary: "grades" | "homeworks" | "news" | "details" | null;
}

export type SchedulerData = {
    id: string
    title: string
    startDate: any
    endDate: any
}