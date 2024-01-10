import React from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {PricatsResponse} from "../../models/response/PricatsResponse";
import {ParseDateToFormatYYYY_MM_dd_HH_mm_ss} from "../../utils/ParseDate";


interface RowTableProps {
    pricat: PricatsResponse
}
function PriceListTableRow(props: RowTableProps) {

    const navigate = useNavigate();

    return (
        <>
            <tr  className=" border-b table w-full h-auto table-fixed hover:bg-gray-100" >
                <td className="px-2" style={{width: '2%'}}>#</td>
                <td className="px-1 py-2 " style={{width: '2%'}}><input type="checkbox"/></td>
                <td className="text-xs" style={{width: '10%'}}>{props.pricat.documentStatus}</td>
                <td className="text-xs" style={{width: '10%'}}>{ParseDateToFormatYYYY_MM_dd_HH_mm_ss(new Date(props.pricat.dateTime))}</td>
                <td className="text-xs" style={{width: '10%'}}>{props.pricat.documentNumber}</td>
                <td className="text-xs" style={{width: '10%'}}>{ParseDateToFormatYYYY_MM_dd_HH_mm_ss(new Date(props.pricat.documentDate))}</td>
                <td className="text-xs" style={{width: '10%'}}>{props.pricat.receiverId}</td>
                <td className="text-xs" style={{width: '10%'}}>{props.pricat.senderId}</td>
                <td className="text-xs" style={{width: '6%'}}>{props.pricat.edi}</td>
                <td className="text-xs" style={{width: '10%'}}>{props.pricat.documentType}</td>
                <td className="text-xs" style={{width: '10%'}}>{ParseDateToFormatYYYY_MM_dd_HH_mm_ss(new Date(props.pricat.dateTimeInsert))}</td>
                <td className="text-xs" style={{width: '10%'}}>{ParseDateToFormatYYYY_MM_dd_HH_mm_ss(new Date(props.pricat.dateTimeUpdate))}</td>
            </tr>
        </>
    )
}

export default observer(PriceListTableRow)