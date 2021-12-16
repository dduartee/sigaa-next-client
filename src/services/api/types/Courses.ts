import { Bond } from "./Bonds";
import { GradeGroup } from "./Grades";
import { LoginCredentials } from "./Login";

export type CoursesRequest = LoginCredentials;
export type CoursesResponse = {
    data?: {
      bond: Bond;
    };
    success: boolean;
    message: string;
  };

  export type Course = {
    id: string;
    title: string;
    code: string;
    schedule?: string;
    period: string;
    numberOfStudents: number;
    homeworks?: any[];
    gradeGroups?: GradeGroup[];
    news?: any[];
  };