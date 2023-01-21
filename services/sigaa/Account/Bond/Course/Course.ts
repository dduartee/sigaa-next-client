import { CourseStudentData, HTTP, Parser, SigaaCourseStudent } from "sigaa-api";
import RehydrateCourseFactory from "./RehydrateCourseFactory";
import { SharedCourse } from "@prisma/client";
import { GradesService } from "./Grades";
import { GradeGroupDTO } from "@DTOs/GradeGroup/GradeGroup.DTO";
import { CourseDTO } from "@DTOs/CourseDTO";

export class CourseService {
  course: SigaaCourseStudent | undefined;
  gradeGroupsDTOs: GradeGroupDTO[] | undefined;
  /**
   * Parseia os dados da matéria do banco de dados para o tipo CourseStudentData
   * @param SharedCourse dados da matéria recuperados do banco de dados
   * @returns CourseStudentData
   */
  private parseCourseData(SharedCourse: SharedCourse): CourseStudentData {
    const form = {
      action: new URL(
        "https://sigaa.ifsc.edu.br/sigaa/portais/discente/turmas.jsf" // a url de ação do formulário de matérias é fixa (eu acho)
      ),
      postValues: JSON.parse(SharedCourse.postValues), // os dados do formulário são salvos como string no banco de dados
    };
    const courseData: CourseStudentData = {
      id: SharedCourse.courseId,
      code: SharedCourse.code,
      numberOfStudents: SharedCourse.numberOfStudents,
      period: SharedCourse.period,
      schedule: SharedCourse.schedule,
      title: SharedCourse.title,
      form,
    };
    return courseData;
  }
  /**
   * Método para gerar a classe SigaaStudentCourse a partir dos dados salvos no banco de dados.
   * @param sharedCourse dados da matéria recuperados do banco de dados
   * @param sigaa objeto com as instâncias de HTTP e Parser
   * @returns
   */
  public rehydrateCourse(
    sharedCourse: SharedCourse,
    sigaa: { parser: Parser; http: HTTP }
  ) {
    const courseData = this.parseCourseData(sharedCourse);
    const course = RehydrateCourseFactory.create(
      courseData,
      sigaa.http,
      sigaa.parser
    );
    this.course = course;
    return course;
  }
  /**
   * Acessa as notas da matéria no SIGAA e retorna um array de GradeGroupDTOs
   * @returns GradeGroupDTO[]
   */
  public async getGrades() {
    if (!this.course) throw new Error("Course not rehydrated");
    const gradeGroups = await this.course.getGrades();
    const gradesService = new GradesService();
    const gradeGroupsDTOs = gradesService.getGradesGroupDTOs(gradeGroups);
    this.gradeGroupsDTOs = gradeGroupsDTOs;
    return gradeGroupsDTOs;
  }
  /**
   * Conforme o retorno dos métodos, como getGrades, getNews, getHomeworks, getLessons, getAbsences,
   * o método getDTO retorna um CourseDTO com os dados do curso e os dados adicionais.
   * @returns CourseDTO
   */
  public getDTO() {
    const { course, gradeGroupsDTOs } = this;
    if (!course) throw new Error("Course not rehydrated");
    return new CourseDTO(course, { gradeGroupsDTOs });
  }
}
