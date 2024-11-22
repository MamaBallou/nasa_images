import Image from "@/domain/model/Image";
import ImageService from "@/data/service/ImageService";

export default class GetImagesOnDateRange {
    service: ImageService;

    constructor(service: ImageService | null) {
        if (service === null) {
            this.service = ImageService.instance;
        } else {
            this.service = service;
        }
    }
    async execute(startDate: Date, endDate: Date): Promise<Image[]> {
        const response = (
            await this.service.getImagesOnDateRange(startDate, endDate)
        ).map(Image.fromImageDTO).sort((a, b) => b.date.getTime() - a.date.getTime());
        return response;
    }
}
