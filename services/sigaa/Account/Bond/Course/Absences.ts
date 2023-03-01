import { AbsenceList } from "sigaa-api";
import { AbsencesDTO } from "@DTOs/AbsencesDTO";
export class AbsencesService {
  public getAbsencesDTOs(absences: AbsenceList) {
    return new AbsencesDTO(absences);
  }
}
