import { Course } from "./Courses";
import { LoginCredentials } from "./Login";

export type GradesRequest = LoginCredentials

export type GradesResponse = {
  success: boolean;
  message: string;
  data?: {
    courses: Course[];
  };
};
export interface Grade { name: string; value?: number; }
export interface SubGrade extends Grade { code: string; }
export interface SubGradeSumOfGrades extends SubGrade { maxValue: number; }
export interface SubGradeWeightedAverage extends SubGrade { weight: number; }
export interface GradeGroupOnlyAverage extends Grade { type: 'only-average'; }
export interface GradeGroupWeightedAverage extends Grade { grades: SubGradeWeightedAverage[]; type: 'weighted-average'; }
export interface GradeGroupSumOfGrades extends Grade { grades: SubGradeSumOfGrades[]; type: 'sum-of-grades'; }
export declare type GradeGroup = GradeGroupSumOfGrades | GradeGroupOnlyAverage | GradeGroupWeightedAverage;