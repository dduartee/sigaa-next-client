import { Sigaa } from "sigaa-api";

export class CampusService {
  constructor(private sigaaInstance: Sigaa) {}
  async getListCampus(): Promise<string[]> {
    const campuses = await this.sigaaInstance.search.subject().getCampusList();
    campuses.shift(); // remove o primeiro elemento, que é o "-- SELECIONE --"
    const campusesDTOs: string[] = [];
    for (const campus of campuses) {
      campusesDTOs.push(campus.name);
    }
    return campusesDTOs;
  }
}
