export type Bond = {
  program: string;
  registration: string;
  active: boolean;
  courses?: Course[];
  activities?: Activity[];
};

export type Course = {
  courseID: string;
  title: string;
  code: string;
  schedule?: string; // nem todas as materias tem horário
  period: string;
  homeworks?: Homework[];
  grades?: Grade[];
  news?: News[];
};

export type Activity = {
  course_Title: string;
  type: string;
  description: string;
  date: Date;
  done: boolean;
};

export type Homework = {};
export type Grade = {};
export type News = {};
