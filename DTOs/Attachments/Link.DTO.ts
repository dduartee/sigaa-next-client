import { LinkAttachment } from "sigaa-api";

export interface ILinkDTOProps {
    title: string;
    href: string;
    description: string;
}

export interface ILinkDTO {
    toJSON(): ILinkDTOProps;
}

export class LinkDTO implements ILinkDTO {
	constructor(public linkAttachment: LinkAttachment) {}

	toJSON(): ILinkDTOProps {
		return {
			title: this.linkAttachment.title,
			href: this.linkAttachment.href,
			description: this.linkAttachment.description,
		};
	}
}