import { HyperlinkAttachment } from "sigaa-api/dist/courses/resources/attachments/sigaa-hyperlink-student";

export interface IHyperLinkDTOProps {
    title: string;
    href: string;
}

export interface IHyperLinkDTO {
    toJSON(): IHyperLinkDTOProps;
}

export class HyperLinkDTO implements IHyperLinkDTO {
	constructor(public hyperlinkAttachment: HyperlinkAttachment) {}

	toJSON(): IHyperLinkDTOProps {
		return {
			title: this.hyperlinkAttachment.title,
			href: this.hyperlinkAttachment.href,
		};
	}
}