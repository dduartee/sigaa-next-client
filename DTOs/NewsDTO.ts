
export type FullNews = {
    id: string,
    title: string,
    content?: string;
    date: Date;
}
export interface INewsDTOProps {
    id: string,
    title: string,
    date: string,
    content?: string
}
export interface INewsDTO {
    toJSON(): INewsDTOProps;
}
export class NewsDTO implements INewsDTO {
	constructor(public news: FullNews) {}

	toJSON(): INewsDTOProps {
		return {
			id: this.news.id,
			title: this.news.title,
			date: this.news.date.toISOString(),
			content: this.news.content
		};
	}
}