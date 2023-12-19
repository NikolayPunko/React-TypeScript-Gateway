import React, {useEffect, useState} from 'react'
import {LeftNavigation} from "../components/leftNavigation/LeftNavigation";
import {FilterPanel} from "../components/FilterPanel";
import {Navigation} from "../components/Navigation";
import {AxiosError} from "axios";
import {ModalError} from "../components/error/ModalError";
import {observer} from "mobx-react-lite";
import OrderService from "../services/OrderService";
import {useNavigate} from "react-router-dom";
import PriceListTable from "../components/priceLists/PriceListTable";


function PriceListsPage() {

    const navigate = useNavigate();

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
                            <span className="font-bold px-5 text-xl">Прайс-листы</span>

                        </div>


                    </div>

                    <FilterPanel fetchOrdersByFilter={fetchOrdersByFilter} fetchOrdersPaginated={fetchOrdersPaginated}
                                 fetching={fetching} currentPage={currentPage} setFetching={isFetching}/>


                    {error == '' && <PriceListTable orders={orders} isLoading={isLoading} setFetching={isFetching}/>}


                </div>

            </div>
        </>


    )
}

export default observer(PriceListsPage)