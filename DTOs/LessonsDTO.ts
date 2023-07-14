import { Lesson } from "sigaa-api";
import { AttachmentDTO, UnifiedAttachmentsTypes } from "./Attachments/Attachment.DTO";

export interface ILessonDTOProps {
    title: string;
    id: string;
    content: string;
    startDate: string;
    endDate: string;
    attachments: UnifiedAttachmentsTypes[];
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
			startDate: this.lesson.startDate.toISOString(),
			endDate: this.lesson.endDate.toISOString(),
			attachments: this.attachmentsDTOs.map(attachmentDTO => attachmentDTO.unify()),
		};
	}
}