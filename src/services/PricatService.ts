import {AxiosResponse} from "axios";
import ParseDate from "../utils/ParseDate";
import $api, {API_URL} from "../http";
import {PricatsResponse} from "../models/response/PricatsResponse";


export default class PricatService {

    static async getPricats(pricatNDE:any, pricatStatus:any, pricatDate:any, page: any):Promise<AxiosResponse<PricatsResponse[]>> {
        return $api.post<PricatsResponse[]>(`${API_URL}/api/PRICAT/${pricatStatus.value}/list?page=${page}&size=100`,
            {
                "documentDateEnd": ParseDate.ParseDateToFormatYYYYMMddTHHmmsstttZ(ParseDate.setEndOfDay(pricatDate.endDate)),
                "documentDateStart": ParseDate.ParseDateToFormatYYYYMMddTHHmmsstttZ(ParseDate.setStartOfDay(pricatDate.startDate)),
                "documentNumber": pricatNDE
            });
    }

    static async importPricat(file: any):Promise<AxiosResponse> {
        return $api.post(`${API_URL}/api/import/PRICAT/Xml`,
            {
                "xml": file
            },
            {
                headers: {'Content-Type': 'multipart/form-data' }
            });
    }

    static async sendPricat(id: number):Promise<AxiosResponse> {
        return $api.get(`${API_URL}/api/PRICAT/send/${id}`);
    }

    static async getPricatById(id: number):Promise<AxiosResponse> {
        return $api.get(`${API_URL}/api/PRICAT/${id}`);
    }

}