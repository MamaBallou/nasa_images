import ImageService from "@/data/service/ImageService";
import Image from "@/domain/model/Image";

export default class GetImageUseCase {
    service: ImageService;

    constructor(service: ImageService|null) {
        if (service === null) {
            this.service = ImageService.getInstance();
        } else {
            this.service = service;
        }
    }

    async execute(date: Date): Promise<Image> {
        const image = await this.service.getImageOnDate(date);
        return Image.fromImageDTO(image);
    }
}