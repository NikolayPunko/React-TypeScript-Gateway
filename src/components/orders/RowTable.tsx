import React from "react";
import {useNavigate} from "react-router-dom";
import {IOrder} from "../../models/order";


interface RowTableProps {
    order: IOrder
}
export function RowTable(props: RowTableProps) {

    const navigate = useNavigate();

    return (
        <>
            <tr onClick={() => navigate(`/${props.order.ID}`)} className=" border-b table w-full h-auto table-fixed hover:bg-gray-100" >
                <td className="px-2" style={{width: '2%'}}>#</td>
                <td className="px-1 py-2 " style={{width: '2%'}}><input type="checkbox"/></td>
                <td className="text-xs" style={{width: '8%'}}>{props.order.PSTN}</td>
                <td className="text-xs" style={{width: '6%'}}>{props.order.DT}</td>
                <td className="text-xs" style={{width: '10%'}}>{props.order.NDE}</td>
                <td className="text-xs" style={{width: '7%'}}>{props.order.DTDOC}</td>
                <td className="text-xs" style={{width: '8%'}}>{props.order.receiver}</td>
                <td className="text-xs" style={{width: '8%'}}>{props.order.sender}</td>
                <td className="text-xs" style={{width: '24%'}}>{props.order.ADDR}</td>
                <td className="text-xs" style={{width: '10%'}}>{props.order.DTDLR}</td>
                <td className="text-xs" style={{width: '7%'}}>Нет</td>
            </tr>
        </>
    )
}