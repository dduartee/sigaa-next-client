import { Lesson } from "sigaa-api";
import { AttachmentDTO, AttachmentProps } from "./Attachments/Attachment.DTO";

export interface ILessonDTOProps {
    title: string;
    id: string;
    content: string;
    startDate: Date;
    endDate: Date;
    attachments: (AttachmentProps & { type: string })[];
}

export interface ILessonDTO {
    toJSON(): ILessonDTOProps;
}

export class LessonDTO implements ILessonDTO {
	constructor(public lesson: Lesson, public attachmentsDTOs: AttachmentDTO[]) { }

	toJSON(): ILessonDTOProps {
		return {
			id: this.lesson.id,
			title: this.lesson.title,
			content: this.lesson.contentText,
			startDate: this.lesson.startDate,
			endDate: this.lesson.endDate,
			attachments: this.attachmentsDTOs.map(attachmentDTO => attachmentDTO.unify()),
		};
	}
}