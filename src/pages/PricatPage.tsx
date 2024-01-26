import React, {useEffect, useState} from 'react'
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {ModalError} from "../components/error/ModalError";
import {observer} from "mobx-react-lite";
import PricatService from "../services/PricatService";
import XMLViewer from "react-xml-viewer";


function PricatPage() {

    const navigate = useNavigate();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [xml, setXml] = useState('');

    const propertyStyle = "flex flex-row items-center py-1 text-xs font-medium"


    const sample = <div className={propertyStyle}>
        <div className="w-1/2">Поле #:</div>
        <div className="w-1/2 px-1">Информация #</div>
    </div>

    async function fetchOrder() {
        try {
            const ID = Number(params.id);

            setError('');
            setIsLoading(true);
            const response = await PricatService.getPricatById(ID);
            setXml(response.data);
            setIsLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setIsLoading(false);
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchOrder();
    }, []);


    return (
        <>
            {error != '' && <h2><ModalError title={error}/></h2>}

            <div className="flex flex-col">
                <div className="bg-gray-100 h-14 flex flex-row items-center justify-center border-b-2 ">
                    <span className="font-semibold text-xl">Прайс-лист</span>
                </div>

                {isLoading && <div className="py-5 text-center ">Загрузка...</div>}

                {!isLoading && <>
                    <div className="flex flex-col px-10 text-sm py-3">
                        <XMLViewer xml={xml} indentSize={5} />
                    </div>

                    <div className="h-16 border-t-2 flex flex-row items-center px-10">
                        <button
                            className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 "
                            onClick={() => navigate("/pricats")}>Закрыть
                        </button>
                    </div>
                </>}


            </div>
        </>

    )
}

export default observer(PricatPage)