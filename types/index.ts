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
    courses: any[]
}