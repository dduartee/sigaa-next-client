import { StudentDTO } from "@DTOs/StudentDTO";
import { AccountService } from "./Account";

/**
 * Filosofia da classe:
 *  - Neste caso pode manipular o accountService
 * 
 */
export class StudentService {
  constructor(private accountService: AccountService) {}

  async getStudentDTO(): Promise<StudentDTO> {
    const username = this.accountService.getUsername();
    const fullName = await this.accountService.getFullname();
    const profilePictureURL = await this.accountService.getProfilePictureURL();
    const emails = await this.accountService.getEmails();
    const studentDTO = new StudentDTO({
      emails,
      profilePictureURL,
      fullName,
      username,
    });
    return studentDTO;
  }
}
