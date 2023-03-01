import { SubGradeArithmeticAverage } from "sigaa-api";

export interface IArithmeticAverageDTOProps {
    name: string,
    code: string,
    value?: number,
}
export interface IArithmeticAverageDTO {
    toJSON(): IArithmeticAverageDTOProps;
}
export class ArithmeticAverageDTO implements IArithmeticAverageDTO {
	constructor(private ArithmeticAverage: SubGradeArithmeticAverage) { 
	}
	toJSON(): IArithmeticAverageDTOProps {
		return {
			name: this.ArithmeticAverage.name,
			code: this.ArithmeticAverage.code,
			value: this.ArithmeticAverage.value,
		};
	}
}