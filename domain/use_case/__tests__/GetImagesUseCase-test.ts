import GetImageUseCase from "@/domain/use_case/GetImageUseCase";
import ImageService from "@/data/service/ImageService";
import ImageDTO from "@/data/models/ImageDTO";

describe("GetImageUseCase", () => {
    test("Get image from date", async () => {
        const imageService: ImageService = ImageService.instance;
        const date = new Date("2024-11-19");
        const mockGetImageOnDate = jest
            .spyOn(ImageService.prototype, "getImageOnDate")
            .mockImplementation(async (date) => {
                return new ImageDTO(
                    "test",
                    "2024-11-19",
                    "test",
                    "test",
                    "test",
                    "test",
                    "test",
                    "test"
                );
            });
        const image = await new GetImageUseCase(imageService).execute(date);
        expect(image.date).toEqual(date);
    });
});
