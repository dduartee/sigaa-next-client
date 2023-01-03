import { SigaaCourseForum } from "sigaa-api";
import { FileDTO } from "./File.DTO";

export type FullForum = {
    id: string,
    title: string,
    author: string,
    description: string,
    creationDate: Date,
    numOfTopics: number,
    flagMonitorReading: boolean,
    file: FileDTO,
    forumType: string,
}

export interface IForumDTOProps {
    id: string;
    title: string;
    author: string;
    creationDate: string;
    numOfTopics: number;
    flagMonitorReading: boolean;
    file: FileDTO;
    forumType: string;
    description: string;
}

export interface IForumDTO {
    toJSON(): IForumDTOProps;
}

export class ForumDTO implements IForumDTO {
	constructor(
        public fullForum: SigaaCourseForum,
        public description: string,
        public author: string,
        public forumType: string,
        public creationDate: Date,
        public numOfTopics: number,
        public flagMonitorReading: boolean,
        public file: FileDTO
	) { }

	toJSON(): IForumDTOProps {
		return {
			id: this.fullForum.id,
			title: this.fullForum.title,
			description: this.description,
			author: this.author,
			forumType: this.forumType,
			creationDate: this.creationDate.toISOString(),
			numOfTopics: this.numOfTopics,
			flagMonitorReading: this.flagMonitorReading,
			file: this.file
		};
	}
}
