import { Attachment } from "sigaa-api";
import { HomeworkDTO, IHomeworkDTOProps } from "../HomeworkDTO";
import { FileDTO, IFileDTOProps } from "./File.DTO";
import { ForumDTO, IForumDTOProps } from "./Forum.DTO";
import { HyperLinkDTO, IHyperLinkDTOProps } from "./Hyperlink.DTO";
import { ILinkDTOProps, LinkDTO } from "./Link.DTO";
import { IQuizDTOProps, QuizDTO } from "./Quiz.DTO";
import { ISurveyDTOProps, SurveyDTO } from "./Survey.DTO";
import { IVideoDTOProps, VideoDTO } from "./Video.DTO";
import { IWebContentDTOProps, WebContentDTO } from "./WebContent.DTO";

export type Attachments = FileDTO | ForumDTO | LinkDTO | QuizDTO | SurveyDTO | VideoDTO | WebContentDTO | HomeworkDTO | HyperLinkDTO;
export type AttachmentProps = IFileDTOProps | IForumDTOProps | ILinkDTOProps | IQuizDTOProps | ISurveyDTOProps | IVideoDTOProps | IWebContentDTOProps | IHomeworkDTOProps | IHyperLinkDTOProps;
export type UnifiedAttachmentsTypes = AttachmentProps & {
	type: string;
};

export interface IAttachmentDTO {
    unify(): UnifiedAttachmentsTypes
}

export class AttachmentDTO implements IAttachmentDTO {
	constructor(public attachment: Attachments, public type: Attachment["type"]) { }
	unify(): UnifiedAttachmentsTypes {
		return { ...this.attachment.toJSON(), type: this.type };
	}
}

