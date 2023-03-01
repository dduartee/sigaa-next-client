import { SubGradeSumOfGrades } from "sigaa-api";

export interface ISumOfGradesDTOProps {
    name: string,
    code: string,
    value?: number,
    maxValue: number,
}
export interface ISumOfGradesDTO {
    toJSON(): ISumOfGradesDTOProps;
}
export class SumOfGradesDTO implements ISumOfGradesDTO {
	constructor(private sumOfGrades: SubGradeSumOfGrades) { }

	toJSON(): ISumOfGradesDTOProps {
		return {
			name: this.sumOfGrades.name,
			code: this.sumOfGrades.code,
			value: this.sumOfGrades.value,
			maxValue: this.sumOfGrades.maxValue
		};
	}
}