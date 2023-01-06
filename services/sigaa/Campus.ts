import { CampusDTO, ICampusDTOProps } from "@DTOs/CampusDTO";
import { Sigaa } from "sigaa-api";

export class CampusService {
  constructor(private sigaaInstance: Sigaa) {}
  async getListCampus(): Promise<ICampusDTOProps[]> {
    const campuses = await this.sigaaInstance.search.teacher().getCampusList();
    const campusesDTOs: CampusDTO[] = [];
    for (const campus of campuses) {
      const [name, acronymWithDate] = campus.name.split(" - "); // Campus seila - SLA (12.23.12)
      if (!acronymWithDate) continue; // If the campus doesn't have - SLA (12.23.12)
      const [acronym] = acronymWithDate.split(" "); // SLA
      const institution = this.sigaaInstance.session.institution;
      const campusDTO = new CampusDTO(name, acronym, institution);
      campusesDTOs.push(campusDTO);
    }
    return campusesDTOs.map((campusDTO) => campusDTO.toJSON());
  }
}
