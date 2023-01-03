import { Sigaa } from "sigaa-api";

export type CampusData = {
  name: string;
  acronym: string;
};

export class CampusService {
    constructor(private sigaaInstance: Sigaa) {}
    async getListCampus(): Promise<CampusData[]> {
      const campuses = await this.sigaaInstance.search.teacher().getCampusList();
      return campuses.map(campus => {
        const [name, acronym] = campus.name.split(" - ");
        return {
          name,
          acronym
        }
      })
    }
  }
  