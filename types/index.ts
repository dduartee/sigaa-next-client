import { Syllabus } from "@components/Syllabus/Content";

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
  id: string;
  title: string;
  date: string;
  done: boolean;
  course: { title: string };
};

export type News = {
  id: string;
  title: string;
  date: string;
  content?: string;
};
export type Course = {
  id: string;
  title: string;
  code: string;
  schedule?: string;
  period: string;
  numberOfStudents: number;
  grades?: GradeGroup[];
  news?: News[];
  homeworks?: Homework[];
  lessons?: Lesson[];
  absences?: Absences;
  members?: Members;
  syllabus?: Syllabus;
  timestamp?: string; // sharedResponse ISOSTRING
};
export type File = {
  id: string;
  title: string;
  description: string;
  key: string;
  downloadPath: string;
  type: "file";
};
export type Forum = {
  id: string;
  title: string;
  author: string;
  creationDate: string;
  numOfTopics: number;
  flagMonitorReading: boolean;
  file: File;
  forumType: string;
  description: string;
  type: "forum";
};
export type Link = {
  title: string;
  href: string;
  description: string;
  type: "link";
};
export type Hyperlink = {
  title: string;
  href: string;
  type: "hyperlink";
};
export type Quiz = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: "quiz";
};
export type Survey = {
  id: string;
  title: string;
  type: "survey";
};
export type Video = {
  title: string;
  src: string;
  description: string;
  type: "video";
};
export type WebContent = {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "webcontent";
};
export type Attachments =
  | File
  | Forum
  | Link
  | Quiz
  | Survey
  | Video
  | WebContent
  | Homework
  | Hyperlink;
export type Lesson = {
  id: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  attachments: Attachments[];
};
export type Absences = {
  list: {
    date: string;
    numOfAbsences: number;
  }[];
  total: number;
  max: number;
};
export interface Teacher extends UserData {
  formation?: string;
  department?: string;
}
export interface Student extends UserData {
  registrationDate: string;
}
export type Members = {
  teachers: Teacher[];
  students: Student[];
};
export type Homework = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  haveGrade?: boolean;
  isGroup?: boolean;
  content?: string;
  attachment?: File;
  type: "homework";
};

export type GradeGroup = {
  type:
  | "sum-of-grades"
  | "only-average"
  | "weighted-average"
  | "arithmetic-average";
  value: number;
  name: string;
  subGrades: SumOfGrades[] | WeightedAverage[] | ArithmeticAverage[];
};
export type SumOfGrades = {
  name: string;
  code: string;
  value: number;
  maxValue: number;
};
export type WeightedAverage = {
  name: string;
  code: string;
  value: number;
  weight: number;
};
export type ArithmeticAverage = {
  name: string;
  code: string;
  value: number;
};
export type Error = "SIGAA: Invalid credentials.";

export type Tab = {
  label: string;
  icon: JSX.Element;
  bottom?: boolean;
};
