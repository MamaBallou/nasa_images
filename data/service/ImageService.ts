import axios, { Axios, AxiosResponse } from "axios";
import ImageDTO from "@/data/models/ImageDTO";
import { apiKey, url } from "@/constants/api";
import DateFormatter from "@/utils/DateFormatter";

export default class ImageService {
    static #instance: ImageService;

    private constructor() {}

    public static get instance(): ImageService {
        if (!ImageService.#instance) {
            ImageService.#instance = new ImageService();
        }
        return ImageService.#instance;
    }

    async getImageOnDate(date: Date): Promise<ImageDTO> {
        var response: AxiosResponse<ImageDTO>;
        const now = new Date();
        if (
            now.getFullYear() === date.getFullYear() &&
            now.getMonth() === date.getMonth() &&
            now.getDate() === date.getDate()
        ) {
            response = await axios.get<ImageDTO>(url, {
                params: { api_key: apiKey },
                transformResponse: (data) => JSON.parse(data),
            });
        } else {
            response = await axios.get<ImageDTO>(url, {
                params: {
                    api_key: apiKey,
                    date: DateFormatter.formatDate(date),
                },
                transformResponse: (data) => JSON.parse(data),
            });
        }
        return response.data;
    }

    async getImagesOnDateRange(
        startDate: Date,
        endDate: Date
    ): Promise<ImageDTO[]> {
        try {
            var response: AxiosResponse<ImageDTO[]>;
            response = await axios.get<ImageDTO[]>(url, {
                params: {
                    api_key: apiKey,
                    start_date: DateFormatter.formatDate(startDate),
                    end_date: DateFormatter.formatDate(endDate),
                },
                transformResponse: (data) => JSON.parse(data),
            });

            return response.data;
        } catch (err) {
            endDate.setDate(endDate.getDate() - 1);
            return this.getImagesOnDateRange(startDate, endDate);
        }
    }
}
