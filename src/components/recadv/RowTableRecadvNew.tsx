import React from "react";


interface RowTableRecadvNewProps {
    product: any
}
export function RowTableRecadvNew(props: RowTableRecadvNewProps) {


    return (
        <>
            <tr className="table w-full h-auto table-auto lg:table-fixed hover:bg-gray-200 border-b-2">
                <td className="px-2 text-xs min-w-[40px]" style={{width: '4%'}}>{props.product.LineItemNumber}</td>
                <td className="py-3 text-xs min-w-[100px]" style={{width: '10%'}}>{props.product.LineItemID}</td>
                <td className="text-xs pr-2 lg:pr-0 min-w-[200px]" style={{width: '25%'}}>{props.product.LineItemName}</td>


                <td className="text-xs min-w-[100px]" style={{width: '5%'}}>{props.product.LineItemQuantityUOM}</td>
                <td className="text-xs min-w-[100px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[100px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[100px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[100px]" style={{width: '5%'}}>{props.product.LineItemPriceWithoutCharges}</td>

                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>{props.product.QuantityDespatched}</td>
                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>{props.product.QuantityReceivedFact}</td>
                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[100px]" style={{width: '6%'}}>-</td>
            </tr>

        </>
    )
}