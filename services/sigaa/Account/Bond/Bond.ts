import { ActivityDTO } from "@DTOs/ActivityDTO";
import { BondDTO } from "@DTOs/BondDTO";
import { ICampusDTOProps } from "@DTOs/CampusDTO";
import { CourseDTO } from "@DTOs/CourseDTO";
import logger from "@services/logger";
import { Activity, CourseStudent, StudentBond } from "sigaa-api";

export interface StudentBondWithAdditionalProps extends StudentBond {
  active: boolean;
  period: string;
  campus: ICampusDTOProps;
}

/**
 * Filosofia da classe:
 *  - Pode manipular o accountService
 *  - Pode manipular o StudentBond
 */
export class BondService {
  constructor(private bond: StudentBondWithAdditionalProps) {}
  async getBondDTO(additionals?: {
    activitiesDTOs?: ActivityDTO[];
    coursesDTOs?: CourseDTO[];
  }): Promise<BondDTO> {
    const bondDTO = new BondDTO(this.bond, additionals);
    return bondDTO;
  }
  async getCourses(): Promise<CourseStudent[]> {
    logger.log("BondService", "Getting courses", {});
    const courses = await this.bond.getCourses();
    logger.log("BondService", "Courses received", { courses: courses.length });
    return courses;
  }
  async getActivities(): Promise<Activity[]> {
    logger.log("BondService", "Getting activities", {});
    const activities = await this.bond.getActivities();
    logger.log("BondService", "Activities received", { activities: activities.length });
    return activities;
  }
}
