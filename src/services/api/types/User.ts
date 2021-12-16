
export type User = {
    username: string;
    profilePictureURL: string;
    fullName: string;
    emails: string[];
    institution: string;
}
export type UserRequest = {
    username: string;
    token: string;
    password: undefined
}

export interface UserResponse {
    data?: {
        user: User
    }
    success: boolean;
    message: string;
}
