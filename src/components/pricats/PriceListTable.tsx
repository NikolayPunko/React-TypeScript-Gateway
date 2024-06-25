import React, {memo, useEffect, useState} from 'react'
import PriceListTableRow from "./PriceListTableRow";
import {observer} from "mobx-react-lite";
import {PricatsResponse} from "../../models/response/PricatsResponse";


interface PriceListTableProps {
    pricats: any
    isLoading: boolean
    setFetching: (bool: boolean) => void
    sendPricat: (pricat: PricatsResponse) => void
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
        <div className="w-full overflow-x-auto" >
            <table>
                <thead>
                <tr className="border-b table w-full table-auto lg:table-fixed" style={{width: 'calc(100% - 8px)'}}>
                    <th className="px-2 text-left min-w-[20px]" style={{width: '2%'}}>#</th>
                    <th className="px-1 text-left min-w-[20px]" style={{width: '2%'}}><input type="checkbox"/></th>
                    <th className={style_th + " min-w-[80px]"} style={{width: '7%'}}>Id документа</th>
                    <th className={style_th + " min-w-[120px]"} style={{width: '10%'}}>Статус сообщения</th>
                    <th className={style_th + "py-3 min-w-[100px]"} style={{width: '7%'}}>Дата и время</th>
                    <th className={style_th + " min-w-[120px]"} style={{width: '10%'}}>Номер сообщения</th>
                    <th className={style_th + " min-w-[100px]"} style={{width: '8%'}}>Дата сообщения</th>
                    <th className={style_th + " min-w-[120px]"} style={{width: '11%'}}>Покупатель</th>
                    <th className={style_th + " min-w-[120px]"} style={{width: '11%'}}>Поставщик</th>
                    <th className={style_th + " min-w-[80px]"} style={{width: '6%'}}>Провайдер</th>
                    <th className={style_th + " min-w-[100px]"} style={{width: '7%'}}>Тип документа</th>
                    <th className={style_th + " min-w-[100px]"} style={{width: '8%'}}>Дата создания</th>
                    <th className={style_th + " min-w-[100px]"} style={{width: '8%'}}>Дата обновления</th>
                    <th className={style_th  + " max-w-[38px] min-w-[38px]"} style={{width: '3%'}}></th>
                </tr>
                </thead>


                <tbody className="block overflow-y-scroll overflow-x-hidden h-[80vh] lg:h-[calc(100vh_-_212px)]" onScroll={scrollHandler}>


                {/*{props.isLoading && <tr><td className="py-5 text-center w-screen">Загрузка...</td></tr>}*/}

                {props.pricats.map((pricat, index) => <PriceListTableRow pricat={pricat} key={index} sendPricat={props.sendPricat}/>)}

                </tbody>
            </table>

        </div>

    )
}

export default observer(PriceListTable)