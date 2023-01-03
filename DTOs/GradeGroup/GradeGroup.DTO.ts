import { GradeGroup } from "sigaa-api";
import { ISubGradeDTOProps, SubGradeDTO } from "./SubGrade.DTO";

export interface IGradeGroupDTOProps {
    type: "sum-of-grades"|"only-average"|"weighted-average"|"arithmetic-average"
    value?: number,
    name: string,
    subGrades: ISubGradeDTOProps[]
}

export interface IGradeGroupDTO {
    toJSON(subGrades: SubGradeDTO[]): IGradeGroupDTOProps;
}

export class GradeGroupDTO implements IGradeGroupDTO {
	constructor(private gradeGroup: GradeGroup, private subGrades: SubGradeDTO[]) {}
	toJSON(): IGradeGroupDTOProps {
		return {
			type: this.gradeGroup.type,
			value: this.gradeGroup.value,
			name: this.gradeGroup.name,
			subGrades: this.subGrades.map(subGrade => subGrade.toJSON())
		};
	}
}