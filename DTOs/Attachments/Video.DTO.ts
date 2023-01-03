import { VideoAttachment } from "sigaa-api";

export interface IVideoDTOProps {
    title: string;
    src: string;
    description: string;
}

export interface IVideoDTO {
    toJSON(): IVideoDTOProps;
}

export class VideoDTO implements IVideoDTO {
	constructor(public video: VideoAttachment) {}

	toJSON(): IVideoDTOProps {
		return {
			title: this.video.title,
			src: this.video.src,
			description: this.video.description,
		};
	}
}