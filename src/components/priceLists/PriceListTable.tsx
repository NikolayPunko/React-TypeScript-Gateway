import React, {memo, useEffect, useState} from 'react'
import PriceListTableRow from "./PriceListTableRow";
import {observer} from "mobx-react-lite";


interface PriceListTableProps {
    orders: any
    isLoading: boolean
    setFetching: (bool: boolean) => void
}
 function PriceListTable(props: PriceListTableProps) {


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
                    {/*<th className="px-1 text-left" style={{width: '2%'}}><input type="checkbox"/></th>*/}
                    <th className={style_th + "py-3"} style={{width: '10%'}}>Поле №1</th>
                    <th className={style_th} style={{width: '6%'}}>Поле №2</th>
                    <th className={style_th} style={{width: '10%'}}>Поле №3</th>
                    <th className={style_th} style={{width: '7%'}}>Поле №4</th>
                    <th className={style_th} style={{width: '8%'}}>Поле №5</th>
                    <th className={style_th} style={{width: '8%'}}>Поле №6</th>
                    <th className={style_th} style={{width: '24%'}}>Поле №7</th>
                    <th className={style_th} style={{width: '10%'}}>Поле №8</th>
                    <th className={style_th} style={{width: '7%'}}>Поле №9</th>
                </tr>
                </thead>

                <tbody className="block overflow-y-scroll" style={{height: 'calc( 100vh - 212px )'}} onScroll={scrollHandler}>

                {/*{props.isLoading && <tr><td className="py-5 text-center w-screen">Загрузка...</td></tr>}*/}

                {props.orders.map((order, index) => <PriceListTableRow order={order} key={index}/>)}

                </tbody>
            </table>

        </div>

    )
}

export default observer(PriceListTable)