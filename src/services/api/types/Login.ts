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
export type withToken = {
    username: string;
    token: string;
    password?: undefined;
}
export type withPassword = {
    username: string;
    password: string;
    token?: undefined;
}
export type LoginCredentials = withToken | withPassword;
export interface LoginOptions {
    institution: string;
    url: string;
}
export type LoginRequest = LoginCredentials & LoginOptions;
