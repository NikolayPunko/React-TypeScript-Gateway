import React, {memo, useEffect, useState} from 'react'
import RowTable from "./RowTable";


interface OrderTableProps {
    orders: any
    isLoading: boolean
    setFetching: (bool: boolean) => void
}
 function OrderTable(props: OrderTableProps) {


    const scrollHandler = (e) => {
        const target = e.target as HTMLTextAreaElement;
        if(target.scrollHeight - (target.scrollTop + window.innerHeight - 212 ) < 100) {
            props.setFetching(true)
        }
    }

     const style_th = " text-xs font-medium text-left truncate ";

    return (
        <div className="w-full">
            <table>
                <thead>
                <tr className="border-b table w-full table-fixed" style={{width: 'calc(100% - 8px)'}}>
                    <th className="px-2 text-left" style={{width: '2%'}}>#</th>
                    <th className="px-1 text-left" style={{width: '2%'}}><input type="checkbox"/></th>
                    <th className={style_th + "py-3"} style={{width: '8%'}}>Статус сообщения</th>
                    <th className={style_th} style={{width: '6%'}}>Дата и время</th>
                    <th className={style_th} style={{width: '10%'}}>Номер сообщения</th>
                    <th className={style_th} style={{width: '7%'}}>Дата сообщения</th>
                    <th className={style_th} style={{width: '8%'}}>Покупатель</th>
                    <th className={style_th} style={{width: '8%'}}>Поставщик</th>
                    <th className={style_th} style={{width: '24%'}}>Место доставки</th>
                    <th className={style_th} style={{width: '10%'}}>Дата и время доставки</th>
                    <th className={style_th} style={{width: '7%'}}>Отправлен ответ</th>
                </tr>
                </thead>

                <tbody className="block overflow-y-scroll" style={{height: 'calc( 100vh - 212px )'}} onScroll={scrollHandler}>

                {/*{props.isLoading && <tr><td className="py-5 text-center w-screen">Загрузка...</td></tr>}*/}

                {props.orders.map((order, index) => <RowTable order={order} key={index}/>)}

                </tbody>
            </table>

        </div>

    )
}

export default memo(OrderTable)