import React from 'react'
import {styleInput, styleLabelInput} from "../../data/styles";
interface SingleFormProps {
    item: any
    items: any
    setItems: (e:any) => void
}
export function SingleForm(props: SingleFormProps)  {

    function assignGtin(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, gtin: e.target.value};
            }
            return obj;
        }))
    }

    function assignName(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, name: e.target.value};
            }
            return obj;
        }))
    }

    function assignUnits(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, units: e.target.value};
            }
            return obj;
        }))
    }

    function assignNumberAndDate(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, numberAndDate: e.target.value};
            }
            return obj;
        }))
    }

    function assignQuantityDefects(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, quantityDefects: e.target.value};
            }
            return obj;
        }))
    }

    function assignTypeDefects(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, typeDefects: e.target.value};
            }
            return obj;
        }))
    }

    function assignPrice(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, price: e.target.value};
            }
            return obj;
        }))
    }

    function assignQuantityTTN(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, quantityTTN: e.target.value};
            }
            return obj;
        }))
    }

    function assignQuantityActual(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, quantityActual: e.target.value};
            }
            return obj;
        }))
    }

    function assignQuantityShortage(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, quantityShortage: e.target.value};
            }
            return obj;
        }))
    }

    function assignSumShortage(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, sumShortage: e.target.value};
            }
            return obj;
        }))
    }

    function assignQuantitySurplus(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, quantitySurplus: e.target.value};
            }
            return obj;
        }))
    }

    function assignSumSurplus(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, sumSurplus: e.target.value};
            }
            return obj;
        }))
    }

    function assignProductCode(e:any){
        props.setItems(props.items.map(obj => {
            if (obj.id === props.item.id) {
                return {...obj, productCode: e.target.value};
            }
            return obj;
        }))
    }

    return(
        <>
            <div className="py-2">
                <span className="font-bold">Товар №{props.item.id}</span>
                <div className="flex flex-wrap flex-row justify-start gap-x-5 gap-y-3">
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>GTIN</span>
                        <input
                            className={styleInput + "w-72"}
                            onChange={e => assignGtin(e)}
                            value={props.item?.gtin || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Наименование товара</span>
                        <input
                            className={styleInput + "w-72"}
                            onChange={e => assignName(e)}
                            value={props.item?.name || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Ед. измерения</span>
                        <input
                            className={styleInput + "w-24"}
                            onChange={e => assignUnits(e)}
                            value={props.item?.units || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>№ и дата ТТН</span>
                        <input
                            className={styleInput + "w-52"}
                            onChange={e => assignNumberAndDate(e)}
                            value={props.item?.numberAndDate || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Кол-во брака</span>
                        <input
                            className={styleInput + "w-24"}
                            onChange={e => assignQuantityDefects(e)}
                            value={props.item?.quantityDefects || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Вид брака</span>
                        <input
                            className={styleInput + "w-64"}
                            onChange={e => assignTypeDefects(e)}
                            value={props.item?.typeDefects || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Цена руб.</span>
                        <input
                            className={styleInput + "w-24"}
                            onChange={e => assignPrice(e)}
                            value={props.item?.price || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Кол-во по ТТН</span>
                        <input
                            className={styleInput + "w-24"}
                            onChange={e => assignQuantityTTN(e)}
                            value={props.item?.quantityTTN || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Кол-во факт.</span>
                        <input
                            className={styleInput + "w-24"}
                            onChange={e => assignQuantityActual(e)}
                            value={props.item?.quantityActual || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Кол-во недостачи</span>
                        <input
                            className={styleInput + "w-24"}
                            onChange={e => assignQuantityShortage(e)}
                            value={props.item?.quantityShortage || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Сумма недостачи</span>
                        <input
                            className={styleInput + "w-24"}
                            onChange={e => assignSumShortage(e)}
                            value={props.item?.sumShortage || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Кол-во излишков</span>
                        <input
                            className={styleInput + "w-24"}
                            onChange={e => assignQuantitySurplus(e)}
                            value={props.item?.quantitySurplus || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Сумма излишков</span>
                        <input
                            className={styleInput + "w-24"}
                            onChange={e => assignSumSurplus(e)}
                            value={props.item?.sumSurplus || ''}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={styleLabelInput}>Код товара</span>
                        <input
                            className={styleInput + "w-36"}
                            onChange={e => assignProductCode(e)}
                            value={props.item?.productCode || ''}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}