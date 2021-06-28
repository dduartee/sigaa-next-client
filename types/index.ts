export type UserCredentials = {
    username: string,
    password: string,
    token?: string
}
export type UserInfo = {
    fullName?: string,
    profilePictureURL?: string
}
export type UserStatus = 'Logado' | 'Deslogado' | 'Logando' | 'Deslogando'

export type Bond = {
    program: string,
    registration: string
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