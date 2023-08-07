import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from "react-router-dom";
import {orderFields} from "../data/orderData";

import {RowTable} from "../components/orders/RowTable";
import {RowTableOrder} from "../components/order/RowTableOrder";
import axios, {AxiosError} from "axios";
import {IDocumentOrder} from "../models/order";


export function Order() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [order, setOrder] = useState<any>({});

    const propertyStyle = "flex flex-row items-center py-1 text-xs font-medium"


    async function fetchOrder() {
        try {

            const TP = "ORDERS"
            // const ID = "7"
            const ID = searchParams.get("id")

            setError('');
            setIsLoading(true);
            const response = await axios.get<any>(`http://restdisp.savushkin.by:5040/document/${TP}/${ID}/`);

            // console.log(response.data)
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

    const x =
        <div className="flex flex-col">
            <div className="bg-gray-100 h-14 flex flex-row items-center justify-center border-b-2 ">
                <span className="font-semibold text-xl">Заказ</span>
            </div>

            {isLoading && <div className="py-5 text-center ">Загрузка...</div>}

            {!isLoading &&  <><div className="flex flex-col px-10 py-3">
                <div className="flex flex-col w-1/2 py-1">
                    <span className="font-bold pb-1">Общая информация</span>
                    <div className={propertyStyle}>
                        <div className="w-1/2">Статус обработки:</div>
                        <div className="w-1/2 px-1">Передано</div>
                    </div>
                    <div className={propertyStyle}>
                        <div className="w-1/2">Статус доставки:</div>
                        <div className="w-1/2 px-1">Доставлено</div>
                    </div>
                    <div className={propertyStyle}>
                        <div className="w-1/2">Номер заказа:</div>
                        <div className="w-1/2 px-1">{order.id}</div>
                    </div>
                    <div className={propertyStyle}>
                        <div className="w-1/2">Номер заказа, присвоенный отправителем:</div>
                        <div className="w-1/2 px-1">{order.supplierId}</div>
                    </div>
                    <div className={propertyStyle}>
                        <div className="w-1/2">Дата заказа:</div>
                        <div className="w-1/2 px-1">{new Date(order.dateCreate).toLocaleString()}</div>
                    </div>
                    <div className={propertyStyle}>
                        <div className="w-1/2">Вид заказа:</div>
                        <div className="w-1/2 px-1">Заказ на поставку</div>
                    </div>
                    <div className={propertyStyle}>
                        <div className="w-1/2">Дата и время доставки:</div>
                        <div className="w-1/2 px-1">{new Date(order.deliveryDateFrom).toLocaleString()}</div>
                    </div>
                </div>

                <div className="flex flex-col w-1/2 py-1">
                    <span className="font-bold pb-1">Покупатель</span>
                    <div className={propertyStyle}>
                        <div className="w-1/2">Наименование:</div>
                        <div className="w-1/2 px-1">{order.buyerName}</div>
                    </div>
                    <div className={propertyStyle}>
                        <div className="w-1/2">GLN:</div>
                        <div className="w-1/2 px-1">{order.buyerGln}</div>
                    </div>
                </div>

                <div className="flex flex-col w-1/2 py-1">
                    <span className="font-bold pb-1">Поставщик</span>
                    <div className={propertyStyle}>
                        <div className="w-1/2">Наименование:</div>
                        <div className="w-1/2 px-1">{order.supplierName}</div>
                    </div>
                    <div className={propertyStyle}>
                        <div className="w-1/2">GLN:</div>
                        <div className="w-1/2 px-1">{order.supplierGln}</div>
                    </div>
                </div>

                <div className="flex flex-col w-1/2 py-1">
                    <span className="font-bold pb-1">Место доставки</span>
                    <div className={propertyStyle}>
                        <div className="w-1/2">GLN:</div>
                        <div className="w-1/2 px-1">{order.deliveryPointGln}</div>
                    </div>
                    <div className={propertyStyle}>
                        <div className="w-1/2">Адрес:</div>
                        <div className="w-1/2 px-1">{order.deliveryPointAddress}</div>
                    </div>
                </div>


            </div>
                <div className="bg-gray-100 w-full px-10">
                    <div className="font-bold py-2">
                        Товарный раздел
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

                        <tbody className="block  overflow-y-scroll bg-white" style={{height: 'calc( 100vh - 212px )'}}>

                        {order.msgOrdersItems?.map(product => <RowTableOrder product={product} key={product.position}/>)}

                        </tbody>
                    </table>

                </div>
                <div className="h-16 border-t-2 flex flex-row items-center px-10">
                    <button className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border  hover:bg-green-600 text-white bg-green-500">Обработать</button>
                    <button className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 ">Создать эНакладную</button>
                    <button className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 ">Создать уведомление об отгрузке</button>
                    <button className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 ">Экспорт XML</button>
                    <button className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 ">Печать</button>
                    <button className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 "
                            onClick={() => navigate("/")}>Закрыть</button>
                </div></> }



        </div>

    return (
       // <></>
        x
    )
}

