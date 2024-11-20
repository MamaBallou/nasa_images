import ImageDTO from "@/data/models/ImageDTO";

export default class Image {
    copyright: string;
    date: Date;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;

    constructor(
        copyright: string,
        date: Date,
        explanation: string,
        hdurl: string,
        media_type: string,
        service_version: string,
        title: string,
        url: string
    ) {
        this.copyright = copyright;
        this.date = date;
        this.explanation = explanation;
        this.hdurl = hdurl;
        this.media_type = media_type;
        this.service_version = service_version;
        this.title = title;
        this.url = url;
    }

    static fromImageDTO(image: ImageDTO): Image {
        return new Image(
            image.copyright,
            new Date(image.date),
            image.explanation,
            image.hdurl,
            image.media_type,
            image.service_version,
            image.title,
            image.url
        );
    }
}
