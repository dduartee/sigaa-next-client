import { CourseStudent } from "sigaa-api";
import { AbsencesDTO, IAbsencesDTOProps } from "./AbsencesDTO";
import { GradeGroupDTO, IGradeGroupDTOProps } from "./GradeGroup/GradeGroup.DTO";
import { HomeworkDTO, IHomeworkDTOProps } from "./HomeworkDTO";
import { ILessonDTOProps, LessonDTO } from "./LessonsDTO";
import { INewsDTOProps, NewsDTO } from "./NewsDTO";

export interface ICourseDTOProps {
    id: string;
    title: string;
    code: string;
    schedule?: string;
    period: string;
    numberOfStudents: number;
    grades?: IGradeGroupDTOProps[];
    news?: INewsDTOProps[]
    homeworks?: IHomeworkDTOProps[];
    absences?: IAbsencesDTOProps
    lessons?: ILessonDTOProps[]
}
export interface ICourseDTO {
    toJSON(): ICourseDTOProps;
}
export class CourseDTO implements ICourseDTO {
	constructor(
        public course: CourseStudent,
        public additionals?: {
            gradeGroupsDTOs?: GradeGroupDTO[],
            newsDTOs?: NewsDTO[],
            homeworksDTOs?: HomeworkDTO[],
            absencesDTO?: AbsencesDTO,
            lessonsDTOs?: LessonDTO[]
        }
	) { }

	toJSON(): ICourseDTOProps {
		const gradeGroupsDTOs = this.additionals?.gradeGroupsDTOs || undefined;
		const newsDTOs = this.additionals?.newsDTOs || undefined;
		const homeworksDTOs = this.additionals?.homeworksDTOs || undefined;
		const lessonsDTOs = this.additionals?.lessonsDTOs || undefined;
		return {
			id: this.course.id,
			title: this.course.title,
			code: this.course.code,
			schedule: this.course.schedule,
			period: this.course.period,
			numberOfStudents: this.course.numberOfStudents,
			grades: gradeGroupsDTOs?.map(dto => dto.toJSON()),
			news: newsDTOs?.map(dto => dto.toJSON()),
			homeworks: homeworksDTOs?.map(dto => dto.toJSON()),
			lessons: lessonsDTOs?.map(dto => dto.toJSON()),
			absences: this.additionals?.absencesDTO?.toJSON()
		};
	}
}
