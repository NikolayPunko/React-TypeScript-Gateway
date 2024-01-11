import React, {useEffect, useState} from 'react'
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {orderFields} from "../data/orderData";

import {RowTableOrder} from "../components/order/RowTableOrder";
import axios, {AxiosError} from "axios";
import {IDocumentOrder} from "../models/order";
import {ModalError} from "../components/error/ModalError";
import {observer} from "mobx-react-lite";
import OrderService from "../services/OrderService";
import {RowTablePriceList} from "../components/priceList/RowTablePriceList";


function PriceListPage() {

    const navigate = useNavigate();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [order, setOrder] = useState<any>({});

    const propertyStyle = "flex flex-row items-center py-1 text-xs font-medium"


    const sample = <div className={propertyStyle}>
        <div className="w-1/2">Поле #:</div>
        <div className="w-1/2 px-1">Информация #</div>
    </div>

    async function fetchOrder() {
        try {
            const ID = params.id

            setError('');
            setIsLoading(true);
            const response = await OrderService.getOrderById(ID);
            setOrder(response.data);
            setIsLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setIsLoading(false);
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchOrder();
    }, []);



    return (
        <>
            {error!='' && <h2><ModalError title={error}/></h2>}

            <div className="flex flex-col">
                <div className="bg-gray-100 h-14 flex flex-row items-center justify-center border-b-2 ">
                    <span className="font-semibold text-xl">Прайс-лист</span>
                </div>

                {isLoading && <div className="py-5 text-center ">Загрузка...</div>}

                {!isLoading &&  <><div className="flex flex-col px-10 py-3">
                    <div className="flex flex-col w-1/2 py-1">
                        <span className="font-bold pb-1">Общая информация</span>


                        {sample}
                        {sample}
                        {sample}
                        {sample}
                        {sample}
                        {sample}
                        {sample}
                        {sample}
                        {sample}
                        {sample}


                    </div>



                </div>
                    <div className="bg-gray-100 w-full px-10">
                        <div className="flex flex-row py-2 justify-between">
                            <div className="font-bold">
                                Товарный раздел
                            </div>

                        </div>

                        <table>
                            <thead>
                            <tr className="border-b table w-full table-fixed align-top" style={{width: 'calc( 100% - 1.1em )'}}>
                                <th className="px-2 text-xs font-medium text-left" style={{width: '4%'}}>№</th>

                                <th className=" text-xs font-medium text-left " style={{width: '10%'}}>GTIN</th>
                                <th className="text-xs font-medium text-left " style={{width: '22%'}}>Наименование товара</th>
                                <th className="text-xs font-medium text-left " style={{width: '8%'}}>Ед.изм.
                                </th>
                                <th className="text-xs font-medium  text-left " style={{width: '8%'}}>Количество
                                </th>
                                <th className="text-xs font-medium text-left " style={{width: '8%'}}>Кол-во грузовых мест</th>
                                <th className="text-xs font-medium  text-left " style={{width: '8%'}}>Цена,Br</th>
                                <th className="text-xs font-medium  text-left " style={{width: '8%'}}>Стоимость,Br
                                </th>
                                <th className="text-xs font-medium  text-left " style={{width: '8%'}}>Ставка НДС,%
                                </th>
                                <th className="text-xs font-medium  text-left " style={{width: '8%'}}>Сумма НДС
                                </th>
                                <th className="text-xs font-medium  text-left truncate" style={{width: '8%'}}>Стоимость с НДС
                                </th>
                            </tr>

                            </thead>

                            <tbody className="block overflow-y-scroll bg-white" style={{maxHeight: 'calc( 100vh - 212px )'}}>

                            {order.msgOrdersItems?.map(product => <RowTablePriceList product={product} key={product.position}/>)}

                            </tbody>
                        </table>

                    </div>
                    <div className="h-16 border-t-2 flex flex-row items-center px-10">
                        <button className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 "
                                onClick={() => navigate("/pricat")}>Закрыть</button>
                    </div></> }



            </div>
        </>

    )
}

export default observer(PriceListPage)