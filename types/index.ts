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
    grades: any[],
}

export type SlugParams = {
    registration: string | null;
    actionPrimary: "news" | "homeworks" | "grades" | "course" | null;
    code: string | null;
    actionSecondary: "grades" | "homeworks" | "news" | "details" | null;
}