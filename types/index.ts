import { IActivityDTOProps } from "@DTOs/ActivityDTO";
import { IFileDTOProps } from "@DTOs/Attachments/File.DTO";
import { IForumDTOProps } from "@DTOs/Attachments/Forum.DTO";
import { IHyperLinkDTOProps } from "@DTOs/Attachments/Hyperlink.DTO";
import { ILinkDTOProps } from "@DTOs/Attachments/Link.DTO";
import { IQuizDTOProps } from "@DTOs/Attachments/Quiz.DTO";
import { ISurveyDTOProps } from "@DTOs/Attachments/Survey.DTO";
import { IVideoDTOProps } from "@DTOs/Attachments/Video.DTO";
import { IWebContentDTOProps } from "@DTOs/Attachments/WebContent.DTO";
import { IBondDTOProps } from "@DTOs/BondDTO";
import { ICourseDTOProps } from "@DTOs/CourseDTO";
import { IHomeworkDTOProps } from "@DTOs/HomeworkDTO";
import { ILessonDTOProps } from "@DTOs/LessonsDTO";
import { IStudentDTOProps } from "@DTOs/StudentDTO";
import { Syllabus } from "@components/Syllabus/Content";

export type UserCredentials = {
  username: string;
  session: string;
  token?: string;
  institution: string
};
export type UserData = IStudentDTOProps
export type UserStatus = "Logado" | "Deslogado" | "Logando" | "Deslogando";

export type Bond = IBondDTOProps & {
  courses: Course[];
  activities: Activity[];
}
export type Activity = IActivityDTOProps & { type: string };

export type News = {
  id: string;
  title: string;
  date: string;
  content?: string;
};
export type Course = ICourseDTOProps & {
  news: News[];
  syllabus: Syllabus;
  lessons: Lesson[];
  absences: Absences;
  members: Members;
  homeworks: Homework[];
  grades: GradeGroup[];
  
};
export type FileAttachment = IFileDTOProps & { type: "file" };
export type ForumAttachment = IForumDTOProps & {
  type: "forum";
};
export type LinkAttachment = ILinkDTOProps & {
  type: "link";
};
export type HyperlinkAttachment = IHyperLinkDTOProps & {
  type: "hyperlink";
};
export type QuizAttachment = IQuizDTOProps & {
  type: "quiz";
};
export type SurveyAttachment = ISurveyDTOProps & {
  type: "survey";
};
export type VideoAttachment = IVideoDTOProps & {
  type: "video";
};
export type WebContentAttachment = IWebContentDTOProps & {
  type: "webcontent";
};
export type AttachmentsTypes =
  | FileAttachment
  | ForumAttachment
  | LinkAttachment
  | QuizAttachment
  | SurveyAttachment
  | VideoAttachment
  | WebContentAttachment
  | HomeworkAttachment
  | HyperlinkAttachment;
export type LessonAttachments = AttachmentsTypes[]
export type Lesson = ILessonDTOProps & {
  attachments: LessonAttachments;
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
export type Homework = IHomeworkDTOProps;
export type HomeworkAttachment = IHomeworkDTOProps & { type: "homework" };
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
