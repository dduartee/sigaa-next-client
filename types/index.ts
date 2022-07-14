export type UserCredentials = {
  username: string;
  password: string;
  token?: string;
};
export type UserInfo = {
  fullName?: string;
  profilePictureURL?: string;
  emails?: string[];
};
export type UserStatus = "Logado" | "Deslogado" | "Logando" | "Deslogando";

export type Bond = {
  program: string;
  registration: string;
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
  period: string;
  schedule: string;
  news: any[];
  homeworks: Homework[];
  grades: GradeGroup[];
};
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
  grades: null;
}

export interface GradeGroupWeightedAverage extends Grade {
  grades: SubGradeWeightedAverage[];
  type: "weighted-average";
}

export interface GradeGroupSumOfGrades extends Grade {
  grades: SubGradeSumOfGrades[];
  type: "sum-of-grades";
}

export declare type GradeGroup =
  | GradeGroupSumOfGrades
  | GradeGroupOnlyAverage
  | GradeGroupWeightedAverage;

export type SlugParams = {
  registration: string | null;
  actionPrimary:
    | "news"
    | "homeworks"
    | "grades"
    | "course"
    | "schedules"
    | null;
  code: string | null;
  actionSecondary: "grades" | "homeworks" | "news" | "details" | null;
};

export type SchedulerData = {
  Id: string;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
};

export type Error = "SIGAA: Invalid credentials.";
