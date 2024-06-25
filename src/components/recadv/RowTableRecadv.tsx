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

    // function findPackageSize(str: string){
    //     let result = '';
    //     for (let i = 0; i < props.product.SG47?.MEA?.length; i++) {
    //         if(props.product.SG47.MEA[i].C502.E6313 == str){
    //             result = props.product.SG47.MEA[i].C174.E6314
    //         }
    //     }
    //     return result;
    // }

    function findQuantity(str: string){
        let result = '';
        if (props.product.QTY?.length){
            for (let i = 0; i < props.product.QTY?.length; i++) {
                if(props.product.QTY[i].C186.E6063 == str){
                    result = props.product.QTY[i].C186.E6060
                }
            }
        } else {
            if(props.product.QTY?.C186.E6063 == str){
                result = props.product.QTY.C186.E6060
            }
        }
        return result;
    }

    return (
        <>
            <tr className="table w-full h-auto table-auto lg:table-fixed hover:bg-gray-200 border-b-2">
                <td className="px-2 text-xs min-w-[40px]" style={{width: '4%'}}>{props.product.LIN?.E1082}</td>
                <td className="py-3 text-xs min-w-[100px]" style={{width: '10%'}}>{props.product.LIN?.C212?.E7140}</td>
                <td className="text-xs pr-2 lg:pr-0 min-w-[200px]" style={{width: '25%'}}>{findName()}</td>


                <td className="text-xs min-w-[100px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[100px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[100px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[100px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[100px]" style={{width: '5%'}}>-</td>

                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>{findQuantity('21')}</td>
                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>{findQuantity('48')}</td>
                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[50px]" style={{width: '5%'}}>-</td>
                <td className="text-xs min-w-[100px]" style={{width: '6%'}}>{props.product.PIA?.C212?.E7140}</td>
            </tr>

        </>
    )
}