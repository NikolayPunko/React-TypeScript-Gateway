import React from "react";


interface RowTablePriceListProps {
    product: any
}
export function RowTablePricat(props: RowTablePriceListProps) {

    function findName(){
        let result = '';
        for (let i = 0; i < props.product.IMD?.length; i++) {
            if(props.product.IMD[i].E7077 == 'F'){
                result = props.product.IMD[i].C273.E7008
            }
        }
        return result;
    }

    function findPackageSize(str: string){
        let result = '';
        for (let i = 0; i < props.product.SG47?.MEA?.length; i++) {
            if(props.product.SG47.MEA[i].C502.E6313 == str){
                result = props.product.SG47.MEA[i].C174.E6314
            }
        }
        return result;
    }

    return (
        <>
            <tr className="table w-full h-auto table-fixed hover:bg-gray-200 border-b-2">
                <td className="px-2 text-xs" style={{width: '4%'}}>{props.product.LIN?.E1082}</td>
                <td className="py-3 text-xs" style={{width: '10%'}}>{props.product.LIN?.C212?.E7140}</td>
                <td className="text-xs" style={{width: '28%'}}>{findName()}</td>

                <td className="text-xs" style={{width: '8%'}}>{props.product.MEA?.C174?.E6314}</td>

                <td className="text-xs" style={{width: '8%'}}>{props.product.SG40?.PRI?.C509?.E5118}</td>
                {/*<td className="text-xs" style={{width: '8%'}}>{props.product.SG38?.TAX?.C243?.E5278}</td>*/}
                <td className="text-xs" style={{width: '8%'}}>{props.product.DTM?.C507?.E2380}</td>

                <td className="text-xs" style={{width: '8%'}}>{props.product.QTY?.C186?.E6060}</td>
                <td className="text-xs" style={{width: '6%'}}>{findPackageSize("LN")}</td>
                <td className="text-xs" style={{width: '6%'}}>{findPackageSize("WD")}</td>
                <td className="text-xs" style={{width: '6%'}}>{findPackageSize("HT")}</td>
                <td className="text-xs" style={{width: '8%'}}>{props.product.PIA?.C212?.E7140}</td>
            </tr>
            {/*<tr className="table w-full h-auto table-fixed border-b-2">*/}
            {/*    <td className="bg-gray-100 text-xs py-1 px-1">*/}
            {/*        Код товара, присвоенный покупателем: <span className="">{props.product.PIA?.C212?.E7140}</span>*/}
            {/*    </td>*/}
            {/*</tr>*/}
        </>
    )
}