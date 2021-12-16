import { Bond } from './Bonds'
import { User } from './User'

export interface LoginResponse {
    data?: {
        user: User;
        bonds: Bond[];
        token: string;
    };
    success: boolean;
    message: string;
}

export interface LoginCredentials { username: string, password: string | undefined, token: string | undefined }
export interface LoginOptions {
    institution: string;
    url: string;
}
export type LoginRequest = LoginCredentials & LoginOptions;
