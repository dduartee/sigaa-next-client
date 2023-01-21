import { ActivityDTO, IActivityDTOProps } from "./ActivityDTO";
import { ICampusDTOProps } from "./CampusDTO";
import { CourseDTO, ICourseDTOProps } from "./CourseDTO";
import { StudentBondWithAdditionalProps } from "@services/sigaa/Account/Bond/Bond";

export interface IBondDTOProps {
  program: string;
  registration: string;
  type: string;
  active: boolean;
  period: string;
  campus: ICampusDTOProps;
  activities?: IActivityDTOProps[];
  courses?: ICourseDTOProps[];
}
export interface IBondDTO {
  toJSON(additionals: {
    activitiesDTOs?: ActivityDTO[];
    coursesDTOs?: CourseDTO[];
  }): IBondDTOProps;
}

export class BondDTO implements IBondDTO {
  constructor(
    public bond: StudentBondWithAdditionalProps,
    public additionals?: {
      activitiesDTOs?: ActivityDTO[];
      coursesDTOs?: CourseDTO[];
    }
  ) {}

  toJSON(): IBondDTOProps {
    const coursesDTOs = this.additionals?.coursesDTOs || undefined;
    const activitiesDTOs = this.additionals?.activitiesDTOs || undefined;
    return {
      program: this.bond.program,
      registration: this.bond.registration,
      type: this.bond.type,
      active: this.bond.active,
      period: this.bond.period,
      campus: this.bond.campus,
      activities: activitiesDTOs?.map((a) => a.toJSON()),
      courses: coursesDTOs?.map((c) => c.toJSON()),
    };
  }
}
