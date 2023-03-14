import { HyperlinkAttachment } from "sigaa-api";

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