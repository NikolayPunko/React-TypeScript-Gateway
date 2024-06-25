import React, {useEffect, useState} from 'react';
import {DateRange} from "../DateRange";
import Select from "react-select";
import {CustomStyle} from "../../data/styleForSelect";
import {optionsPricatStatus, optionsStatus} from "../../data/optionsForSelect";


interface FilterPanelRecadvProps {
    fetchRecadvs: (NDE:any, Status:any, DateObj:any, page:any) => void
    fetchRecadvsPaginated: (NDE:any, Status:any, DateObj:any, page:any) => void
    fetching: boolean
    currentPage: any
    updateFlag: boolean
}

export function FilterPanelRecadv(props: FilterPanelRecadvProps) {

    const [NDE, setNDE] = useState(sessionStorage.getItem('recadvtNDE') || "");
    const [Status, setStatus] = useState<any>(optionsPricatStatus[sessionStorage.getItem('recadvStatus') || 2]);
    const [DateObj, setDateObj] = useState({startDate: new Date(sessionStorage.getItem('recadvDateStart') || new Date()),
        endDate: new Date(sessionStorage.getItem('recadvDateEnd') || new Date())});

    const handleChangeNDE = (event: any) => {
        setNDE(event.target.value);
    };

    const handleChangeStatus = (event: any) => {
        if (event != null) {
            setStatus(event);
        } else {
            setStatus(optionsPricatStatus[1]);
        }
    };


    useEffect(() => {
        props.fetchRecadvs(NDE, Status,DateObj, 1);
    }, [NDE, Status, DateObj, props.updateFlag]);


    useEffect(() => {
        if(props.fetching){
            props.fetchRecadvsPaginated(NDE, Status, DateObj, props.currentPage)
        }
    }, [props.fetching]);

    function resetFilter() {
        setNDE("");
        setStatus(optionsPricatStatus[2]);
        setDateObj({
            startDate: new Date(),
            endDate: new Date()
        });
    }


    useEffect(() => {
        sessionStorage.setItem('recadvNDE', NDE);
    }, [NDE]);

    useEffect(() => {
        sessionStorage.setItem('recadvStatus', Status.id);
    }, [Status]);

    useEffect(() => {
        sessionStorage.setItem('recadvDateStart', DateObj.startDate.toString());
        sessionStorage.setItem('recadvDateEnd', DateObj.endDate.toString());
    }, [DateObj]);

    return (
        <div className="flex flex-wrap w-full pb-3 border-b-2 bg-gray-50">
            <div className="flex flex-col px-2 w-52">
                <span className="text-xs font-medium py-1">Номер сообщения</span>
                <input className="border rounded border-slate-400 px-2 text-xs font-medium
                 h-[28px] outline-blue-700 focus-visible:outline-1  hover:border-blue-700 " placeholder="Все сообщения"
                       onChange={handleChangeNDE} value={NDE}
                />
            </div>
            <div className="flex flex-col px-2 w-52">
                <span className="text-xs font-medium py-1">Период</span>
                <DateRange onChangeDate={e => {setDateObj(e)}} value={DateObj} setValue={setDateObj}/>
            </div>

            <div className="flex flex-col px-2 w-52">
                <span className="text-xs font-medium py-1">Статус</span>
                <Select className="text-xs font-medium"
                        placeholder={"Все статусы"}
                        value={Status}
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