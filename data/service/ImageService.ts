import axios from "axios";
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
        const now = new Date();
        if (
            now.getFullYear() === date.getFullYear() &&
            now.getMonth() === date.getMonth() &&
            now.getDate() === date.getDate()
        ) {
            return this.getNewestImage();
        }
        const response = await axios.get<ImageDTO>(url, {
            params: { api_key: apiKey, date: DateFormatter.formatDate(date) },
            transformResponse: (data) => JSON.parse(data),
        });
        return response.data;
    }

    async getNewestImage(): Promise<ImageDTO> {
        const response = await axios.get<ImageDTO>(url, {
            params: { api_key: apiKey },
            transformResponse: (data) => JSON.parse(data),
        });
        return response.data;
    }
}
