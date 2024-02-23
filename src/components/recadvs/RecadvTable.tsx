import React from 'react'
import {observer} from "mobx-react-lite";
import RecadvTableRow from "./RecadvTableRow";
import {RecadvsResponse} from "../../models/response/RecadvsResponse";


interface RecadvTableProps {
    recadvs: any
    isLoading: boolean
    setFetching: (bool: boolean) => void
    sendRecadv: (recadv: RecadvsResponse) => void
}

function RecadvTable(props: RecadvTableProps) {


    const scrollHandler = (e) => {
        const target = e.target as HTMLTextAreaElement;
        if (target.scrollHeight - (target.scrollTop + window.innerHeight - 212) < 100) {
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
                    <th className={style_th} style={{width: '7%'}}>Id документа</th>
                    <th className={style_th} style={{width: '10%'}}>Статус сообщения</th>
                    <th className={style_th + "py-3"} style={{width: '7%'}}>Дата и время</th>
                    <th className={style_th} style={{width: '10%'}}>Номер сообщения</th>
                    <th className={style_th} style={{width: '8%'}}>Дата сообщения</th>
                    <th className={style_th} style={{width: '11%'}}>Покупатель</th>
                    <th className={style_th} style={{width: '11%'}}>Поставщик</th>
                    <th className={style_th} style={{width: '6%'}}>Провайдер</th>
                    <th className={style_th} style={{width: '7%'}}>Тип документа</th>
                    <th className={style_th} style={{width: '8%'}}>Дата создания</th>
                    <th className={style_th} style={{width: '8%'}}>Дата обновления</th>
                    <th className={style_th} style={{width: '3%'}}></th>
                </tr>
                </thead>

                <tbody className="block overflow-y-scroll" style={{height: 'calc( 100vh - 212px )'}}
                       onScroll={scrollHandler}>

                {props.recadvs.map((recadv, index) => <RecadvTableRow recadv={recadv} key={index}
                                                                      sendRecadv={props.sendRecadv}/>)}

                </tbody>
            </table>

        </div>

    )
}

export default observer(RecadvTable)