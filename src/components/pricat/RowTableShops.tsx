import React from "react";

interface RowTableShopsProps{
    item: any
    index: number

}

export function RowTableShops(props: RowTableShopsProps){

    return (
        <>
            <tr className="table w-full h-auto table-fixed hover:bg-gray-200 border-b-2">
                <td className="px-2 py-2 text-xs" style={{width: '10%'}}>{props.index+1}</td>
                <td className="text-xs" style={{width: '40%'}}>{props.item.NAD?.C082?.E3039}</td>
                <td className="text-xs" style={{width: '50%'}}>{"Магазин №"+(props.index+1)}</td>

            </tr>

        </>
    )

}