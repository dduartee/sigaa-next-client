import { ArithmeticAverageDTO, IArithmeticAverageDTOProps } from "./ArithmeticAverage.DTO";
import { ISumOfGradesDTOProps, SumOfGradesDTO } from "./SumOfGrades.DTO";
import { IWeightedAverageDTOProps, WeightedAverageDTO } from "./WeightedAverage.DTO";

export type ISubGradeDTOProps = ISumOfGradesDTOProps | IWeightedAverageDTOProps | IArithmeticAverageDTOProps
export type SubGradeDTO = SumOfGradesDTO | WeightedAverageDTO | ArithmeticAverageDTO