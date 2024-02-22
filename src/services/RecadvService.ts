import {AxiosResponse} from "axios";
import {PricatsResponse} from "../models/response/PricatsResponse";
import $api, {API_URL} from "../http";
import ParseDate from "../utils/ParseDate";


export default class RecadvService {

    static async getRecadvs(NDE:any, Status:any, Date:any, page: any):Promise<AxiosResponse<PricatsResponse[]>> {
        return $api.post<PricatsResponse[]>(`${API_URL}/api/RECADV/${Status.value}/list?page=${page}&size=100`,
            {
                "documentDateEnd": ParseDate.ParseDateToFormatYYYYMMddTHHmmsstttZ(ParseDate.setEndOfDay(Date.endDate)),
                "documentDateStart": ParseDate.ParseDateToFormatYYYYMMddTHHmmsstttZ(ParseDate.setStartOfDay(Date.startDate)),
                "documentNumber": NDE
            });
    }

    static async importRecadv(file: any):Promise<AxiosResponse> {
        return $api.post(`${API_URL}/api/import/RECADV/Xml`,
            {
                "xml": file
            },
            {
                headers: {'Content-Type': 'multipart/form-data' }
            });
    }

    static async sendRecadv(id: number):Promise<AxiosResponse> {
        return $api.get(`${API_URL}/api/RECADV/send/${id}`);
    }

    static async getRecadvById(id: number):Promise<AxiosResponse> {
        return $api.get(`${API_URL}/api/RECADV/${id}`);
    }

}