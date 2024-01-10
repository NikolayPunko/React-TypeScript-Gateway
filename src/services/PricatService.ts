import {AxiosResponse} from "axios";
import {ParseDateToFormatYYYYMMddTHHmmsstttZ, setEndOfDay, setStartOfDay} from "../utils/ParseDate";
import $api, {API_URL} from "../http";
import {PricatsResponse} from "../models/response/PricatsResponse";


export default class PricatService {

    static async getPricats(pricatNDE:any, pricatStatus:any, pricatDate:any, page: any):Promise<AxiosResponse<PricatsResponse[]>> {
        return $api.post<PricatsResponse[]>(`${API_URL}/api/PRICAT/${pricatStatus.value}/list?page=${page}&size=20`,
            {
                "documentDateEnd": ParseDateToFormatYYYYMMddTHHmmsstttZ(setEndOfDay(pricatDate.endDate)),
                "documentDateStart": ParseDateToFormatYYYYMMddTHHmmsstttZ(setStartOfDay(pricatDate.startDate)),
                "documentNumber": pricatNDE
            });
    }

}