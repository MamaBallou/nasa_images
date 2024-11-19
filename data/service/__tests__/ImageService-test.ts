import axios from "axios";
import ImageService from "../ImageService";

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
    const result = await ImageService.getImageOnDate(new Date("2024-11-19"));
    expect(result).toEqual(response.data);
});