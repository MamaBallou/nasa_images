import axios from "axios";
import ImageService from "@/data/service/ImageService";
import ImageDTO from "@/data/models/ImageDTO";

jest.mock("axios");
test("getImageOnDate", async () => {
    const response = {
        data: {
            copyright: "test",
            date: "2024-11-19",
            explanation: "test",
            hdurl: "test",
            media_type: "test",
            service_version: "test",
            title: "test",
            url: "test"
        }
    };
    axios.get = jest.fn().mockResolvedValue(response);
    const result: ImageDTO = await ImageService.getInstance().getImageOnDate(new Date("2024-11-19"));
    const imageDTO = new ImageDTO("test", "2024-11-19", "test", "test", "test", "test", "test", "test");
    expect(result).toEqual(imageDTO);
});