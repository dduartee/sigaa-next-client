import { Course } from './Courses'
import { withToken } from './Login'

export type BondsRequest = withToken

export type Bond = {
    registration: string;
    program: string;
    type: string;
    active: boolean;
    courses?: Course[];
    activities?: any[];
};
export interface BondsResponse {
    data?: {
        bonds: Bond[];
    };
    success: boolean;
    message: string;
}
