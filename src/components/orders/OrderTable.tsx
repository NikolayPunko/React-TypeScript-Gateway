import React from 'react'
import {RowTable} from "./RowTable";

interface OrderTableProps {
    orders: any
    isLoading: boolean
}
export function OrderTable(props: OrderTableProps) {

    return (
        <div className="w-full">
            <table>
                <thead>
                <tr className="border-b table w-full table-fixed" style={{width: 'calc(100% - 8px)'}}>
                    <th className="px-2 text-left" style={{width: '2%'}}>#</th>
                    <th className="px-1 text-left" style={{width: '2%'}}><input type="checkbox"/></th>
                    <th className="py-3 text-xs font-medium text-left truncate" style={{width: '8%'}}>Статус сообщения</th>
                    <th className="text-xs font-medium text-left truncate" style={{width: '6%'}}>Дата и время</th>
                    <th className="text-xs font-medium text-left truncate" style={{width: '10%'}}>Номер сообщения</th>
                    <th className="text-xs font-medium  text-left truncate" style={{width: '7%'}}>Дата сообщения</th>
                    <th className="text-xs font-medium text-left truncate" style={{width: '8%'}}>Покупатель</th>
                    <th className="text-xs font-medium  text-left truncate" style={{width: '8%'}}>Поставщик</th>
                    <th className="text-xs font-medium  text-left truncate" style={{width: '24%'}}>Место доставки</th>
                    <th className="text-xs font-medium  text-left truncate" style={{width: '10%'}}>Дата и время доставки</th>
                    <th className="text-xs font-medium  text-left truncate" style={{width: '7%'}}>Отправлен ответ</th>
                </tr>
                </thead>

                <tbody className="block overflow-y-scroll" style={{height: 'calc( 100vh - 212px )'}}>

                {/*{props.isLoading && <tr><td className="py-5 text-center w-screen">Загрузка...</td></tr>}*/}

                {props.orders.map(order => <RowTable order={order} key={order.ID}/>)}

                </tbody>
            </table>

        </div>

    )
}