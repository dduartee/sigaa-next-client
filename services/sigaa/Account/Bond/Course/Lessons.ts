import { AttachmentDTO } from "@DTOs/Attachments/Attachment.DTO";
import { FileDTO } from "@DTOs/Attachments/File.DTO";
import { ForumDTO } from "@DTOs/Attachments/Forum.DTO";
import { HyperLinkDTO } from "@DTOs/Attachments/Hyperlink.DTO";
import { LinkDTO } from "@DTOs/Attachments/Link.DTO";
import { QuizDTO } from "@DTOs/Attachments/Quiz.DTO";
import { SurveyDTO } from "@DTOs/Attachments/Survey.DTO";
import { VideoDTO } from "@DTOs/Attachments/Video.DTO";
import { WebContentDTO } from "@DTOs/Attachments/WebContent.DTO";
import { HomeworkDTO } from "@DTOs/HomeworkDTO";
import { LessonDTO } from "@DTOs/LessonsDTO";
import { HyperlinkAttachment, Lesson, LinkAttachment, SigaaCourseForum, SigaaFile, SigaaHomework, SigaaQuiz, SigaaSurvey, SigaaWebContent, VideoAttachment } from "sigaa-api";


export class LessonsService {
    async getLessonDTO(lesson: Lesson) {
		const attachmentsDTOs = await this.getAttachmentsDTOs(lesson);
		const lessonDTO = new LessonDTO(lesson, attachmentsDTOs);
		return lessonDTO;
	}
	private async getAttachmentsDTOs(lesson: Lesson) {
		const attachmentsDTOs: AttachmentDTO[] = [];
		for (const attachment of lesson.attachments) {
			switch (attachment.type) {
			case "file": {
				const file = attachment as SigaaFile;
				const fileDTO = new FileDTO(file);
				const attachmentDTO = new AttachmentDTO(fileDTO, "file");
				attachmentsDTOs.push(attachmentDTO);
				break;
			}
			case "link": {
				const linkAttachment = attachment as LinkAttachment;
				const linkDTO = new LinkDTO(linkAttachment);
				const attachmentDTO = new AttachmentDTO(linkDTO, "link");
				attachmentsDTOs.push(attachmentDTO);
				break;
			}
			case "hyperlink": {
				const hyperlinkAttachment = attachment as HyperlinkAttachment;
				const hyperlinkDTO = new HyperLinkDTO(hyperlinkAttachment);
				const attachmentDTO = new AttachmentDTO(hyperlinkDTO, "hyperlink");
				attachmentsDTOs.push(attachmentDTO);
				break;
			}
			case "video": {
				const videoAttachment = attachment as VideoAttachment;
				const videoDTO = new VideoDTO(videoAttachment);
				const attachmentDTO = new AttachmentDTO(videoDTO, "video");
				attachmentsDTOs.push(attachmentDTO);
				break;
			}
			case "forum": {
				const forumAttachment = attachment as SigaaCourseForum;
				// const author = await forumAttachment.getAuthor().catch(() => "");
				// const creationDate = await forumAttachment.getCreationDate().catch(() => new Date(0));
				// const numOfTopics = await forumAttachment.getNumOfTopics().catch(() => 0);
				// const flagMonitorReading = await forumAttachment.getFlagMonitorReading().catch(() => false);
				// const file = await forumAttachment.getFile().catch(() => null);
				// const fileDTO = file ? new FileDTO(file as SigaaFile) : null;
				// const forumType = await forumAttachment.getForumType().catch(() => "");
				// const description = await forumAttachment.getDescription().catch(() => "");
				const forumDTO = new ForumDTO(forumAttachment, "", "", "", new Date(0), 0, false, null);
				const attachmentDTO = new AttachmentDTO(forumDTO, "forum");
				attachmentsDTOs.push(attachmentDTO);
				break;
			}
			case "quiz": {
				const quizAttachment = attachment as SigaaQuiz;
				const quizDTO = new QuizDTO(quizAttachment);
				const attachmentDTO = new AttachmentDTO(quizDTO, "quiz");
				attachmentsDTOs.push(attachmentDTO);
				break;
			}
			case "homework": {
				const homework = attachment as SigaaHomework;
				const fileDTO = await (homework.getAttachmentFile().then(file => new FileDTO(file as SigaaFile)).catch(() => null));
				// const fileDTO = attachmentFileDTO ? new FileDTO(attachmentFileDTO) : null;
				// const content = await homework.getDescription();
				// const haveGrade = await homework.getFlagHaveGrade();
				// const isGroup = await homework.getFlagIsGroupHomework();
				const homeworkDTO = new HomeworkDTO(homework, fileDTO, "", false, false);
				const attachmentDTO = new AttachmentDTO(homeworkDTO, "homework");
				attachmentsDTOs.push(attachmentDTO);
				break;
			}
			case "webcontent": {
				const webContent = attachment as SigaaWebContent;
				// const content = await webContent.getContent();
				// const date = await webContent.getDate();
				const webContentDTO = new WebContentDTO(webContent, "", new Date(0));
				const attachmentDTO = new AttachmentDTO(webContentDTO, "webcontent");
				attachmentsDTOs.push(attachmentDTO);
				break;
			}
			case "survey": {
				const surveyAttachment = attachment as SigaaSurvey;
				const surveyDTO = new SurveyDTO(surveyAttachment);
				const attachmentDTO = new AttachmentDTO(surveyDTO, "survey");
				attachmentsDTOs.push(attachmentDTO);
				break;
			}
			default:
				break;
			}
		}
		return attachmentsDTOs;
	}
}