import React, {useEffect, useState} from 'react'
import {LeftNavigation} from "../components/leftNavigation/LeftNavigation";
import {FilterPanel} from "../components/FilterPanel";
import {Navigation} from "../components/Navigation";
import {AxiosError} from "axios";
import {ModalError} from "../components/error/ModalError";
import {observer} from "mobx-react-lite";
import OrderTable from "../components/orders/OrderTable";
import OrderService from "../services/OrderService";


function OrdersPage() {

    const [orders, setOrders] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);


    function isFetching(bool: boolean) {
        setFetching(bool);
    }

    async function fetchOrdersByFilter(orderNumMessage: any, orderAgent: any, orderStatus: any, orderProvider: any, orderDate: any, page: any) {
        try {
            setError('');
            setIsLoading(true);
            const response = await OrderService.getOrders(orderNumMessage, orderAgent, orderStatus, orderProvider, orderDate, page)
            setOrders(response.data.rows);
            setIsLoading(false);
        } catch (e: unknown) {
            // console.log("Ошибка!")
            const error = e as AxiosError;
            setIsLoading(false);
            setError(error.message)
        }
    }

    async function fetchOrdersPaginated(orderNumMessage: any, orderAgent: any, orderStatus: any, orderProvider: any, orderDate: any, page: any) {
        await fetchOrdersByFilter(orderNumMessage, orderAgent, orderStatus, orderProvider, orderDate, page+1)
        setCurrentPage(prevState => prevState + 1)
        setFetching(false)
    }


    return (
        <>
            {error != '' && <h2><ModalError title={error}/></h2>}

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
                                <button className="px-2 rounded-l bg-blue-700 text-white text-sm font-medium">Все
                                </button>
                                <button className="px-2 text-sm font-medium hover:bg-gray-100">Ждет обработки</button>
                                <button className="px-2 text-sm font-medium hover:bg-gray-100">У контрагента</button>
                                <button className="px-2 rounded-r text-sm font-medium hover:bg-gray-100"
                                        onClick={() => setFetching(true)}>Завершенные
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

                    <FilterPanel fetchOrdersByFilter={fetchOrdersByFilter} fetchOrdersPaginated={fetchOrdersPaginated}
                                 fetching={fetching} currentPage={currentPage} setFetching={isFetching}/>


                    {error == '' && <OrderTable orders={orders} isLoading={isLoading} setFetching={isFetching}/>}


                </div>

            </div>
        </>


    )
}

export default observer(OrdersPage)