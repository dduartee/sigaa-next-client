import { SigaaQuiz } from "sigaa-api";

export interface IQuizDTOProps {
    id: string;
    title: string;
    type: string;
    startDate: string;
    endDate: string;
}

export interface IQuizDTO {
    toJSON(): IQuizDTOProps;
}

export class QuizDTO implements IQuizDTO {
	constructor(public quiz: SigaaQuiz) { }

	toJSON(): IQuizDTOProps {
		return {
			id: this.quiz.id,
			title: this.quiz.title,
			type: this.quiz.type,
			startDate: this.quiz.startDate.toISOString(),
			endDate: this.quiz.endDate.toISOString()
		};
	}
}