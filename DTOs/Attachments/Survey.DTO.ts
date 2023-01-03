import { SigaaSurvey } from "sigaa-api";

export interface ISurveyDTOProps {
    id: string;
    title: string;
}

export interface ISurveyDTO {
    toJSON(): ISurveyDTOProps;
}

export class SurveyDTO implements ISurveyDTO {
	constructor(public survey: SigaaSurvey) {}

	toJSON(): ISurveyDTOProps {
		return {
			id: this.survey.id,
			title: this.survey.title,
		};
	}
}