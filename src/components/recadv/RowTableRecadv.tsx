import React from "react";


interface RowTableRecadvProps {
    product: any
}
export function RowTableRecadv(props: RowTableRecadvProps) {

    function findName(){
        let result = '';
        if (props.product.IMD?.length){
            for (let i = 0; i < props.product.IMD?.length; i++) {
                if(props.product.IMD[i].E7077 == 'F'){
                    result = props.product.IMD[i].C273.E7008
                }
            }
        } else {
            if(props.product.IMD.E7077 == 'F'){
                result = props.product.IMD.C273.E7008
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


                <td className="text-xs" style={{width: '8%'}}></td>
                <td className="text-xs" style={{width: '8%'}}></td>
                <td className="text-xs" style={{width: '8%'}}></td>
                <td className="text-xs" style={{width: '8%'}}></td>
                <td className="text-xs" style={{width: '8%'}}></td>

                <td className="text-xs" style={{width: '5%'}}>7</td>
                <td className="text-xs" style={{width: '5%'}}>9</td>
                <td className="text-xs" style={{width: '5%'}}>3</td>
                <td className="text-xs" style={{width: '5%'}}>25</td>
                <td className="text-xs" style={{width: '5%'}}>3</td>
                <td className="text-xs" style={{width: '5%'}}>25</td>
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