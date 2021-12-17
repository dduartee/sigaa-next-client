import { withToken } from './Login'

export type User = {
    username: string;
    profilePictureURL: string;
    fullName: string;
    emails: string[];
    institution: string;
}
export type UserRequest = withToken

export interface UserResponse {
    data?: {
        user: User
    }
    success: boolean;
    message: string;
}
