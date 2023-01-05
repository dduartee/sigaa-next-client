export interface IStudentDTOProps {
  username: string;
  fullName: string;
  emails: string[];
  profilePictureURL: string;
}
export interface IStudentDTO {
  toJSON(): IStudentDTOProps;
}
export type StudentDTOInput = {
  username: string;
  fullName: string;
  emails: string[];
  profilePictureURL: URL | string;
};
export class StudentDTO implements IStudentDTO {
  constructor(public student: StudentDTOInput) {}

  toJSON(): IStudentDTOProps {
    return {
      username: this.student.username,
      fullName: this.student.fullName,
      emails: this.student.emails,
      profilePictureURL: new URL(this.student.profilePictureURL).toString(),
    };
  }
}
