import React from "react";
import {IProductOrder} from "../../models/order";


interface RowTableOrderProps {
    product: IProductOrder
}
export function RowTableOrder(props: RowTableOrderProps) {

    return (
        <>
            <tr className="table w-full h-auto table-fixed hover:bg-gray-200">
                <td className="px-2 text-xs" style={{width: '4%'}}>{props.product.position}</td>
                <td className="py-3 text-xs" style={{width: '10%'}}>{props.product.gtin}</td>
                <td className="text-xs" style={{width: '22%'}}>{props.product.fullName}</td>
                <td className="text-xs" style={{width: '8%'}}>{props.product.uom.name}</td>
                <td className="text-xs" style={{width: '8%'}}>{props.product.quantityOrdered}</td>
                <td className="text-xs" style={{width: '8%'}}>0 (статично)</td>
                <td className="text-xs" style={{width: '8%'}}>{props.product.priceNet}</td>
                <td className="text-xs" style={{width: '8%'}}>{props.product.amountWithoutVat}</td>
                <td className="text-xs" style={{width: '8%'}}>{props.product.vatRate}</td>
                <td className="text-xs" style={{width: '8%'}}>{props.product.amountVat}</td>
                <td className="text-xs" style={{width: '8%'}}>{props.product.amountWithVat}</td>
            </tr>
            <tr className="table w-full h-auto table-fixed border-b-2">
                <td className="bg-gray-200 text-xs py-1 px-1">
                    Код товара, присвоенный покупателем: <span className="">{props.product.codeByBuyer}</span>
                </td>
            </tr>
        </>
    )
}