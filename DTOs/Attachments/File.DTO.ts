import { SigaaFile } from "sigaa-api";

export interface IFileDTOProps {
    id: string;
    title: string;
    description: string;
    key: string;
}
export interface IFileDTO {
    toJSON(): IFileDTOProps;
}

export class FileDTO implements IFileDTO {
	constructor(public file: SigaaFile) {}

	toJSON(): IFileDTOProps {
		return {
			id: this.file.id,
			title: this.file.title || "",
			description: this.file.description|| "",
			key: this.file.key|| "",
		};
	}
}