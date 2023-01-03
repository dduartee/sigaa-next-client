import { ActivityDTO } from "@DTOs/ActivityDTO";
import { BondDTO } from "@DTOs/BondDTO";
import { CourseDTO } from "@DTOs/CourseDTO";
import Cache from "@services/Cache";
import { CourseStudent, StudentBond } from "sigaa-api";


export interface StudentBondWithAdditionalProps extends StudentBond {
  active: boolean;
  period: string;
  campus: string;
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
    const courses = await this.bond.getCourses();
    return courses;
  }
}
