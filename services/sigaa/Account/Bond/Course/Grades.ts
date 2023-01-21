import { ArithmeticAverageDTO } from "@DTOs/GradeGroup/ArithmeticAverage.DTO";
import { GradeGroupDTO } from "@DTOs/GradeGroup/GradeGroup.DTO";
import { SubGradeDTO } from "@DTOs/GradeGroup/SubGrade.DTO";
import { SumOfGradesDTO } from "@DTOs/GradeGroup/SumOfGrades.DTO";
import { WeightedAverageDTO } from "@DTOs/GradeGroup/WeightedAverage.DTO";
import { GradeGroup } from "sigaa-api";

export class GradesService {
    public getGradesGroupDTOs(gradeGroups: GradeGroup[]) {
        return gradeGroups.map((gradeGroup) => {
          let subGradesDTOs: SubGradeDTO[] = [];
          switch (gradeGroup.type) {
            case "only-average":
              subGradesDTOs = [];
              break;
            case "sum-of-grades":
              subGradesDTOs = gradeGroup.grades.map(
                (sumOfGrades) => new SumOfGradesDTO(sumOfGrades)
              );
              break;
            case "weighted-average":
              subGradesDTOs = gradeGroup.grades.map(
                (weightedAverage) => new WeightedAverageDTO(weightedAverage)
              );
              break;
            case "arithmetic-average":
              subGradesDTOs = gradeGroup.grades.map(
                (arithmeticAverage) => new ArithmeticAverageDTO(arithmeticAverage)
              );
              break;
            default:
              subGradesDTOs = [];
              break;
          }
          const gradeGroupDTO = new GradeGroupDTO(gradeGroup, subGradesDTOs);
          return gradeGroupDTO;
        });
      }
}