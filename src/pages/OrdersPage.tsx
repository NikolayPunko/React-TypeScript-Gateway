import React, {useEffect, useState} from 'react'
import {LeftNavigation} from "../components/leftNavigation/LeftNavigation";
import {FilterPanel} from "../components/FilterPanel";
import {OrderTable} from "../components/orders/OrderTable";
import {Navigation} from "../components/Navigation";
import axios, {AxiosError} from "axios";
import {ParseDateToFormatYYYY_MM_dd} from "../utils/ParseDate";
import {ModalError} from "../components/error/ModalError";
import {observer} from "mobx-react-lite";



function OrdersPage() {

    const [orders, setOrders] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    async function fetchOrders(orderNumMessage:any, orderAgent:any, orderStatus:any, orderProvider:any, orderDate:any) {
        try {
            // console.log("fetchOrders!");
            // console.log(orderNumMessage);
            // console.log(orderAgent);
            // console.log(orderStatus);
            // console.log(orderProvider);
            // console.log(ParseDateToFormatYYYY_MM_dd(orderDate.startDate)); //осталось отправить в теле объекта
            // console.log(ParseDateToFormatYYYY_MM_dd(orderDate.endDate)); //осталось отправить в теле объекта

            setError('');
            setIsLoading(true);
            const response = await axios.post('http://restdisp.savushkin.by:5040/filteredList',
                {
                    "TP": "ORDERS", //TP - тип документа, для заявок значение "ORDERS",
                    "EDI": "001",  //EDI - код EDI-оператора, возможно будем указывать имя
                    "cmd": "filteredList",
                    "DTBEG": ParseDateToFormatYYYY_MM_dd(orderDate.startDate),  //DTBEG-DTEND, даты начала и конца периода выборки,
                    "DTEND": ParseDateToFormatYYYY_MM_dd(orderDate.endDate),
                    "row_count": 50,  //row_count - сколько записей выводить за раз,
                    "ID": 0,  //ID -начиная с какого ID выводить записи,
                    "sender": orderAgent,  //sender - необязательный параметр, для фильтрации по поставщику
                    "PSTN": orderStatus  //PSTN - необязательный параметр, для фильтрации по состоянию документа.
                });

            setOrders(response.data.rows);
            setIsLoading(false);

            // console.log(response.data.rows)
            // console.log(orders)

        } catch (e: unknown) {
            console.log("Ошибка!")
            const error = e as AxiosError;
            setIsLoading(false);
            setError(error.message)
        }
    }



    return (
        <>
            {error!='' && <h2><ModalError title={error}/></h2>}

            <Navigation/>
            <div className="flex flex-row window-height">
                <div className="w-44 py-2 border-r-2 bg-gray-50 justify-stretch">
                    <LeftNavigation/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row items-center w-full py-3 border-b-2 bg-gray-50">
                        <div className="inline-flex w-1/2">
                            <span className="font-bold px-5 text-xl">Заказы</span>
                            <div className="flex h-7 flex-row border rounded shadow-sm">
                                <button className="px-2 rounded-l bg-blue-700 text-white text-sm font-medium">Все</button>
                                <button className="px-2 text-sm font-medium hover:bg-gray-100">Ждет обработки</button>
                                <button className="px-2 text-sm font-medium hover:bg-gray-100">У контрагента</button>
                                <button className="px-2 rounded-r text-sm font-medium hover:bg-gray-100">Завершенные
                                </button>
                            </div>
                        </div>

                        <div className="inline-flex w-1/2 justify-end">
                            <button
                                className="px-2 mx-5 h-7 rounded shadow-sm bg-green-500 text-sm text-white font-medium hover:bg-green-600 ">+
                                Создать
                            </button>
                        </div>
                    </div>

                    <FilterPanel onFilter={fetchOrders}/>



                    {!isLoading && error=='' && <OrderTable orders={orders} isLoading={isLoading} />}




                </div>

            </div>
        </>



    )
}

export default observer(OrdersPage)