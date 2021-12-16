import { Course } from "./Courses";
import { LoginCredentials } from "./Login";

export type BondsRequest = LoginCredentials

export interface BondsResponse {
    data?: {
        bonds: Bond[];
    };
    success: boolean;
    message: string;
}
export type Bond = {
    registration: string;
    program: string;
    type: string;
    active: boolean;
    courses?: Course[];
    activities?: any[];
};