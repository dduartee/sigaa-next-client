import { SigaaWebContent } from "sigaa-api";


export interface IWebContentDTOProps {
    id: string;
    title: string;
    content: string;
    date: string;
}

export interface IWebContentDTO {
    toJSON(): IWebContentDTOProps;
}


export class WebContentDTO implements IWebContentDTO {
	constructor(public webContent: SigaaWebContent, private content: string, private date: Date) { }

	toJSON(): IWebContentDTOProps {
		return {
			id: this.webContent.id,
			title: this.webContent.title,
			content: this.content,
			date: this.date.toISOString()
		};
	}
}