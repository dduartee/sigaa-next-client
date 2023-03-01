import { StudentDTO, StudentDTOInput } from "@DTOs/StudentDTO";
import { AccountService } from "./Account";
import cacheService from "@lib/cache";

/**
 * Filosofia da classe:
 *  - Neste caso pode manipular o accountService
 * 
 */
export class StudentService {
  constructor(private accountService: AccountService) {}

  async getStudentDTO(): Promise<StudentDTO> {
    const username = this.accountService.getUsername();
    const userCache = cacheService.get<StudentDTOInput>(username);
    if (userCache) {
      const studentDTO = new StudentDTO(userCache);
      return studentDTO;
    } else {
      const fullName = await this.accountService.getFullname();
      const profilePictureURL = await this.accountService.getProfilePictureURL();
      const emails = await this.accountService.getEmails();
      const studentDTOInput = {
        emails,
        profilePictureURL: profilePictureURL.toString(), // convertendo p/ string para padronizar o cache
        fullName,
        username,
      }
      cacheService.set(username, studentDTOInput);
      const studentDTO = new StudentDTO(studentDTOInput);
      return studentDTO;
    }
  }
}
