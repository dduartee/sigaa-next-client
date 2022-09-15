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
  courses: Course[];
  activities: Activity[];
};
export type Activity = {
  type: "homework" | "exam" | "quiz";
  title: string;
  date: string;
  course: {
    title: string;
  };
  done: boolean;
}
export type File = {
  id: string,
  title: string,
  description: string,
  key: string,
}
export type News = {
  id: string,
  title: string,
  date: string,
  content?: string
}
export type Course = {
  id: string;
  title: string;
  code: string;
  schedule?: string;
  period: string;
  numberOfStudents: number;
  grades?: GradeGroup[];
  news?: News[]
  homeworks?: Homework[];
  absences?: Absences;
}
export type Absences = {
  list: {
    date: string;
    numOfAbsences: number;
  }[]
  total: number;
  max: number;
}
export type Homework = {
  id: string,
  title: string,
  startDate: string,
  endDate: string,
  haveGrade?: boolean,
  isGroup?: boolean,
  content?: string
  attachment?: {
    id: string;
    title: string;
    description: string;
    key: string;
  }
}

export type GradeGroup = {
  type: 'sum-of-grades' | 'only-average' | 'weighted-average',
  value: number,
  name: string,
  subGrades: SumOfGrades[] | WeightedAverage[]
}
export type SumOfGrades = {
  name: string,
  code: string,
  value: number,
  maxValue: number,
}
export type WeightedAverage = {
  name: string,
  code: string,
  value: number,
  weight: number,
}
export type Error = "SIGAA: Invalid credentials.";
