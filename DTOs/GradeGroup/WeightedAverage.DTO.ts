import { SubGradeWeightedAverage } from "sigaa-api";

export interface IWeightedAverageDTOProps {
    name: string,
    code: string,
    value?: number,
    weight: number,
}
export interface IWeightedAverageDTO {
    toJSON(): IWeightedAverageDTOProps;
}
export class WeightedAverageDTO implements IWeightedAverageDTO {
	constructor(private weightedAverage: SubGradeWeightedAverage) { 
	}
	toJSON(): IWeightedAverageDTOProps {
		return {
			name: this.weightedAverage.name,
			code: this.weightedAverage.code,
			value: this.weightedAverage.value,
			weight: this.weightedAverage.weight,
		};
	}
}