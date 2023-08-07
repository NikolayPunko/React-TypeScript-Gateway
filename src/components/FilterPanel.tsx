import React, {useEffect, useRef, useState} from 'react';
import AsyncSelect from "react-select/async";
import axios, {AxiosError} from "axios";
import Select from "react-select";
import {optionsProvider, optionsStatus} from "../data/optionsForSelect";
import {CustomStyle} from "../data/styleForSelect";
import {DateRange, RefType} from "./DateRange";



interface FilterPanelProps {
    onFilter: (orderNumMessage:any, orderAgent:any, orderStatus:any, orderProvider:any, orderDate:any) => void
}

export function FilterPanel(props: FilterPanelProps) {

    const [orderNumMessage, setOrderNumMessage] = useState("");
    // const [orderAgent, setOrderAgent] = useState<any>([]);
    const [orderAgent, setOrderAgent] = useState("");
    const [orderStatus, setOrderStatus] = useState<any>([]);
    const [orderProvider, setOrderProvider] = useState<any>([]);
    const [orderDate, setOrderDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    });


    const handleChangeNumMessage = (event: any) => {
        setOrderNumMessage(event.target.value);
    };

    const handleChangeAgentInput = (event: any) => {
        setOrderAgent(event.target.value);
    };

    // const handleChangeAgent = (event: any) => {
    //     if (event != null) {
    //         setOrderAgent(event);
    //     } else {
    //         setOrderAgent([]);
    //     }
    // };

    const handleChangeStatus = (event: any) => {
        if (event != null) {
            setOrderStatus(event);
        } else {
            setOrderStatus([]);
        }
    };

    const handleChangeProvider = (event: any) => {
        if (event != null) {
            setOrderProvider( event);
        } else {
            setOrderProvider([]);
        }
    };

    async function fetchAgents(inputValue: string) { //Селект с контрагентами
        try {
            // console.log(inputValue) //набранный текст
            const response = await axios.get<any>('https://fakestoreapi.com/products?limit=15');
            // return response.data
            return response.data.map((x: any) => ({
                "value": x.description,
                "label": x.title
            }))
        } catch (e: unknown) {
            const error = e as AxiosError;
            return []
        }
    }

    useEffect(() => {

        props.onFilter(
            orderNumMessage,
            orderAgent,
            validationSelectParameters(orderStatus),
            orderProvider,
            orderDate
        )

    }, [orderNumMessage, orderAgent, orderStatus, orderProvider, orderDate]);


    const styles = {
        control: (state:any) =>
            state.isFocused ? 'border-red-600' : 'border-grey-300',
        singleValue: (state:any) =>
            state.me ? '' : 'border-grey-200',
    };

    function resetFilter() {

        setOrderNumMessage("");
        // setOrderAgent([]);
        setOrderAgent("");
        setOrderStatus([]);
        setOrderProvider([])

    }

    function validationSelectParameters(e:any) {
        if (e.value != undefined){
            return e.value
        } else {
            return ""
        }
    }


    return (
        <div className="inline-flex w-full pb-3 border-b-2 bg-gray-50">
            <div className="flex flex-col px-2 w-2/12">
                <span className="text-xs font-medium py-1">Номер сообщения</span>
                <input className="border rounded border-slate-400 px-2 text-xs font-medium
                 h-[28px] outline-blue-700 focus-visible:outline-1  hover:border-blue-700 " placeholder="Все сообщения"
                       onChange={handleChangeNumMessage} value={orderNumMessage}
                />
            </div>
            <div className="flex flex-col px-2 w-2/12">
                <span className="text-xs font-medium py-1">Период</span>
                <DateRange onChangeDate={e => {setOrderDate(e)}} />
            </div>
            <div className="flex flex-col px-2 w-2/12">
                <span className="text-xs font-medium py-1">Контрагент</span>

                {/*<AsyncSelect className="text-xs font-medium"*/}
                {/*             noOptionsMessage={() => "Нет результатов"}*/}
                {/*             loadingMessage={() => "Загрузка..."}*/}
                {/*             placeholder={"Все организации"}*/}
                {/*             value={orderAgent}*/}
                {/*             onChange={handleChangeAgent}*/}
                {/*             styles={CustomStyle}*/}
                {/*              isClearable={true} loadOptions={fetchAgents}/>*/}

                <input className="border rounded border-slate-400 px-2 text-xs font-medium
                 h-[28px] outline-blue-700 focus-visible:outline-1  hover:border-blue-700 " placeholder="Все сообщения"
                       onChange={handleChangeAgentInput} value={orderAgent}
                />
            </div>
            <div className="flex flex-col px-2 w-2/12">
                <span className="text-xs font-medium py-1">Статус</span>
                <Select className="text-xs font-medium"
                        placeholder={"Все статусы"}
                        value={orderStatus}
                        onChange={handleChangeStatus}
                        styles={CustomStyle}
                        options={optionsStatus} isClearable={true} isSearchable={false}/>
            </div>
            <div className="flex flex-col px-2 w-2/12">
                <span className="text-xs font-medium py-1">Провайдер</span>
                <Select className="text-xs font-medium"
                        placeholder={"Все провайдеры"}
                        value={orderProvider}
                        onChange={handleChangeProvider}
                        styles={CustomStyle}
                        options={optionsProvider} isClearable={true} isSearchable={false}/>
            </div>
            <div className="flex flex-col px-2 justify-end">
                <button onClick={resetFilter}
                        className="px-2 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 ">
                    Сбросить
                </button>
            </div>

        </div>
    )
}