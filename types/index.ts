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

export type GradeGroup = {
  type: 'sum-of-grades'|'only-average'|'weighted-average',
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
