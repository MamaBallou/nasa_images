import axios from "axios";
import ImageDTO from "@/data/models/ImageDTO";
import { apiKey, url } from "@/constants/api";
import DateFormatter from "@/utils/DateFormatter";

export default class ImageService {
    static async getImageOnDate(date: Date): Promise<ImageDTO> {
        const response = await axios.get<ImageDTO>(url, {
            params: { api_key: apiKey, date: DateFormatter.formatDate(date) },
        });
        return response.data;
    }
}
