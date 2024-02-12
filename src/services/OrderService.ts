import axios, {AxiosResponse} from "axios";
import ParseDate from "../utils/ParseDate";

export default class OrderService {

    static async getOrders(orderNumMessage:any, orderAgent:any, orderStatus:any, orderProvider:any, orderDate:any, page: any):Promise<AxiosResponse> {
        return axios.post('http://restdisp.savushkin.by:5040/filteredList',
            {
                "TP": "ORDERS", //TP - тип документа, для заявок значение "ORDERS",
                "EDI": "001",  //EDI - код EDI-оператора, возможно будем указывать имя
                "cmd": "filteredList",
                "DTBEG": ParseDate.ParseDateToFormatYYYY_MM_dd(orderDate.startDate),  //DTBEG-DTEND, даты начала и конца периода выборки,
                "DTEND": ParseDate.ParseDateToFormatYYYY_MM_dd(orderDate.endDate),
                "row_count": page * 50,  //row_count - сколько записей выводить за раз,
                "ID": 0,  //ID -начиная с какого ID выводить записи,
                "sender": orderAgent,  //sender - необязательный параметр, для фильтрации по поставщику
                "PSTN": orderStatus  //PSTN - необязательный параметр, для фильтрации по состоянию документа.
            });
    }

    static async getOrderById(id:string|undefined):Promise<AxiosResponse> {
        return axios.get<any>(`http://restdisp.savushkin.by:5040/document/ORDERS/${id}/`);
    }
}