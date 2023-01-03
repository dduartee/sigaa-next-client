import { SigaaHomework } from "sigaa-api";
import { FileDTO, IFileDTOProps } from "./Attachments/File.DTO";

export type FullHomework = {
    id: string,
    title: string,
    content?: string,
    startDate: Date,
    endDate: Date,
    haveGrade?: boolean,
    isGroup?: boolean,
    fileDTO?: FileDTO
}
export interface IHomeworkDTOProps {
    id: string,
    title: string,
    startDate: string,
    endDate: string,
    haveGrade?: boolean,
    isGroup?: boolean,
    content?: string
    attachment?: IFileDTOProps
}

export interface IHomeworkDTO {
    toJSON(): IHomeworkDTOProps;
}
export class HomeworkDTO implements IHomeworkDTO {
	constructor(
        private homework: SigaaHomework,
        private fileDTO: FileDTO,
        private content: string,
        private haveGrade: boolean,
        private isGroup: boolean
	) { }

	toJSON(): IHomeworkDTOProps {
		return {
			id: this.homework.id || "",
			title: this.homework.title,
			content: this.content,
			startDate: this.homework.startDate.toISOString(),
			endDate: this.homework.endDate.toISOString(),
			haveGrade: this.haveGrade,
			isGroup: this.isGroup,
			attachment: this.fileDTO?.toJSON()
		};
	}
}