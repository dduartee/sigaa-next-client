export interface IStudentDTOProps {
  username: string;
  fullName: string;
  emails: string[];
  profilePictureURL: string;
}
export interface IStudentDTO {
  toJSON(): IStudentDTOProps;
}
type Student = {
  username: string;
  fullName: string;
  emails: string[];
  profilePictureURL: URL;
};
export class StudentDTO implements IStudentDTO {
  constructor(public student: Student) {}

  toJSON(): IStudentDTOProps {
    return {
      username: this.student.username,
      fullName: this.student.fullName,
      emails: this.student.emails,
      profilePictureURL: this.student.profilePictureURL.toString(),
    };
  }
}
