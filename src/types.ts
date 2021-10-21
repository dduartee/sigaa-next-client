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

export interface optionsArgs {
  institution: string;
  url: string;
}
export type UsernameType = string;
export type PasswordType = string;
export type UniqueType = string;
export type credentialsWithoutUnique = {
  username: UsernameType;
  password: PasswordType;
  unique: undefined;
};
export type credentialsWithUnique = {
  username: UsernameType;
  password: undefined;
  unique: UniqueType;
};
export type credentialsArgs = credentialsWithoutUnique | credentialsWithUnique;

export type loginArgs = {
  options: optionsArgs;
  credentials: credentialsArgs;
};

export type loginResponse = loginResponseError | loginResponseSuccess;
export type loginResponseError = {
  error: ErrorKnownleadge;
  isLoggedIn: false;
};

export type loginResponseSuccess = {
  User: IUserSchema;
  isLoggedIn: true;
  error: undefined;
  Profile: IProfileSchema;
  Unique: string;
};

export type statusResponse =
  | "Logado"
  | "Deslogado"
  | "Logando"
  | "Deslogando"
  | "Tentando novamente"
  | "Erro"
  | "Delete session";
export type logoutArgs = {
  options: optionsArgs;
  credentials: credentialsWithUnique;
};

export type logoutResponse = logoutResponseError | logoutResponseSuccess;
export type logoutResponseError = {
  isLoggedOut: false;
  error: string;
};
export type logoutResponseSuccess = {
  User?: IUserSchema;
  Unique?: string;
  isLoggedOut: boolean;
  error: string | undefined;
};
export type ErrorKnownleadge =
  | "SIGAA: Invalid credentials."
  | "SIGAA: Unknown homepage format."
  | "SIGAA: Invalid homepage, the system behaved unexpectedly."
  | "SessionError: Session not found, verify unique"
  | "SessionError: Session expired";

export type bondArgs = {
  credentials: credentialsWithUnique;
  options: optionsArgs;
  query: bondQuery;
};

export type bondQuery = {
  type: "student"; // bond do tipo teacher não foi implementado
  registration?: string;
};

export type bondResponse = {
  bonds: Bond[] | undefined;
  error: any | undefined;
};
export type courseArgs = {
  credentials: credentialsWithUnique;
  query: courseQuery;
};

export type courseQuery = {
  type: "student";
  bond: {
    registration: string;
    inactive: boolean;
  };
  course?: {
    id: string;
  };
  full?: boolean;
};

export type courseResponse = {
  bond?: Bond;
  error?: any;
};
export type IUserSchema = {
  username: string;
};
export type IProfileSchema = {
  profilePictureURL: string;
  fullName: string;
  emails: string[];
};
