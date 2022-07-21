export type UserCredentials = {
  username: string;
  password: string;
  token?: string;
};
export type UserData = {
  username: string;
  fullName: string;
  profilePictureURL: string;
  emails: string[];
};
export type UserStatus = "Logado" | "Deslogado" | "Logando" | "Deslogando";

export type Bond = {
  program: string;
  registration: string;
  period: string;
  type: "student";
  active: boolean;
  courses: Course[] | [];
  activities: Activity[] | [];
};
export type Activity = {
  type: "homework" | "exam" | "quiz";
  description: string;
  date: string;
  course: {
    title: string;
  };
  done: boolean;
}
export type Course = {
  id: string;
  title: string;
  code: string;
  schedule?: string;
  period: string;
  numberOfStudents: number;
  grades?: GradeGroup[];
  news?: any[]
  homeworks?: any[];
}
export type Homework = {
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  isGroup: boolean | null;
  haveGrade: boolean | null;
};

export interface Grade {
  name: string;
  value?: number;
}

export interface SubGrade extends Grade {
  code: string;
}

export interface SubGradeSumOfGrades extends SubGrade {
  maxValue?: number;
}

export interface SubGradeWeightedAverage extends SubGrade {
  weight?: number;
}

export interface GradeGroupOnlyAverage extends Grade {
  type: "only-average";
  subGrades: null;
}

export interface GradeGroupWeightedAverage extends Grade {
  subGrades: SubGradeWeightedAverage[];
  type: "weighted-average";
}

export interface GradeGroupSumOfGrades extends Grade {
  subGrades: SubGradeSumOfGrades[];
  type: "sum-of-grades";
}

export declare type GradeGroup =
  | GradeGroupSumOfGrades
  | GradeGroupOnlyAverage
  | GradeGroupWeightedAverage;


export type Error = "SIGAA: Invalid credentials.";
