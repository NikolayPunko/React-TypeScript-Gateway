import React from "react";


interface RowTableRecadvNewProps {
    product: any
}
export function RowTableRecadvNew(props: RowTableRecadvNewProps) {


    return (
        <>
            <tr className="table w-full h-auto table-fixed hover:bg-gray-200 border-b-2">
                <td className="px-2 text-xs" style={{width: '4%'}}>{props.product.LineItemNumber}</td>
                <td className="py-3 text-xs" style={{width: '10%'}}>{props.product.LineItemID}</td>
                <td className="text-xs pr-1" style={{width: '25%'}}>{props.product.LineItemName}</td>


                <td className="text-xs" style={{width: '5%'}}>{props.product.LineItemQuantityUOM}</td>
                <td className="text-xs" style={{width: '5%'}}>-</td>
                <td className="text-xs" style={{width: '5%'}}>-</td>
                <td className="text-xs" style={{width: '5%'}}>-</td>
                <td className="text-xs" style={{width: '5%'}}>{props.product.LineItemPriceWithoutCharges}</td>

                <td className="text-xs" style={{width: '5%'}}>{props.product.QuantityDespatched}</td>
                <td className="text-xs" style={{width: '5%'}}>{props.product.QuantityReceivedFact}</td>
                <td className="text-xs" style={{width: '5%'}}>-</td>
                <td className="text-xs" style={{width: '5%'}}>-</td>
                <td className="text-xs" style={{width: '5%'}}>-</td>
                <td className="text-xs" style={{width: '5%'}}>-</td>
                <td className="text-xs" style={{width: '6%'}}>-</td>
            </tr>

        </>
    )
}