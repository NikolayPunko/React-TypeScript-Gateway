import React, {useEffect, useState} from 'react';
import {DateRange} from "../DateRange";
import Select from "react-select";
import {CustomStyle} from "../../data/styleForSelect";
import {optionsPricatStatus, optionsStatus} from "../../data/optionsForSelect";


interface FilterPanelPricatProps {
    fetchPricatsByFilter: (pricatNDE:any, pricatStatus:any, pricatDate:any, page:any) => void
    fetchPricatsPaginated: (pricatNDE:any, pricatStatus:any, pricatDate:any, page:any) => void
    fetching: boolean
    currentPage: any
    setFetching: (bool: boolean) => void
    updateFlag: boolean
}

export function FilterPanelPricat(props: FilterPanelPricatProps) {

    const [pricatNDE, setPricatNDE] = useState(sessionStorage.getItem('pricatNDE') || "");
    const [pricatStatus, setPricatStatus] = useState<any>(optionsPricatStatus[sessionStorage.getItem('pricatStatus') || 2]);
    const [pricatDate, setPricatDate] = useState({startDate: new Date(sessionStorage.getItem('pricatDateStart') || new Date()),
        endDate: new Date(sessionStorage.getItem('pricatDateEnd') || new Date())});

    const handleChangeNDE = (event: any) => {
        setPricatNDE(event.target.value);
    };

    const handleChangeStatus = (event: any) => {
        if (event != null) {
            setPricatStatus(event);
        } else {
            setPricatStatus(optionsPricatStatus[1]);
        }
    };


    useEffect(() => {
        props.fetchPricatsByFilter(
            pricatNDE,
            pricatStatus,
            pricatDate,
            props.currentPage
        )
    }, [pricatNDE, pricatStatus, pricatDate, props.updateFlag]);


    useEffect(() => {
        if(props.fetching){
            props.fetchPricatsPaginated(
                pricatNDE,
                pricatStatus,
                pricatDate,
                props.currentPage
            )
        }
    }, [props.fetching]);

    function resetFilter() {
        setPricatNDE("");
        setPricatStatus(optionsPricatStatus[2]);
        setPricatDate({
            startDate: new Date(),
            endDate: new Date()
        });
    }



    useEffect(() => {
        sessionStorage.setItem('pricatNDE', pricatNDE);
    }, [pricatNDE]);

    useEffect(() => {
        sessionStorage.setItem('pricatStatus', pricatStatus.id);
    }, [pricatStatus]);

    useEffect(() => {
        sessionStorage.setItem('pricatDateStart', pricatDate.startDate.toString());
        sessionStorage.setItem('pricatDateEnd', pricatDate.endDate.toString());
    }, [pricatDate]);

    return (
        <div className="inline-flex w-full pb-3 border-b-2 bg-gray-50">
            <div className="flex flex-col px-2 w-2/12">
                <span className="text-xs font-medium py-1">Номер сообщения</span>
                <input className="border rounded border-slate-400 px-2 text-xs font-medium
                 h-[28px] outline-blue-700 focus-visible:outline-1  hover:border-blue-700 " placeholder="Все сообщения"
                       onChange={handleChangeNDE} value={pricatNDE}
                />
            </div>
            <div className="flex flex-col px-2 w-2/12">
                <span className="text-xs font-medium py-1">Период</span>
                <DateRange onChangeDate={e => {setPricatDate(e)}} value={pricatDate} setValue={setPricatDate}/>
            </div>

            <div className="flex flex-col px-2 w-2/12">
                <span className="text-xs font-medium py-1">Статус</span>
                <Select className="text-xs font-medium"
                        placeholder={"Все статусы"}
                        value={pricatStatus}
                        onChange={handleChangeStatus}
                        styles={CustomStyle}
                        options={optionsPricatStatus} isClearable={false} isSearchable={false}/>
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