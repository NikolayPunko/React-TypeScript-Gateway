import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {LanguageEditor} from "../components/editor/LanguageEditor";
import {ModalError} from "../components/error/ModalError";


export function ProductEditorJSON() {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const params = useParams();

    const [originalProducts, setOriginalProducts] = useState("");
    const [modifiedProducts, setModifiedProducts] = useState("");


    async function fetchOrder() {
        try {

            const TP = "ORDERS"
            const ID = params.id

            setError('');
            setIsLoading(true);
            const response = await axios.get<any>(`http://restdisp.savushkin.by:5040/document/${TP}/${ID}/`);

            // console.log(response.data.msgOrdersItems)
            setOriginalProducts(JSON.stringify(response.data.msgOrdersItems, null, '\t'));
            // setModifiedProducts(JSON.stringify(response.data.msgOrdersItems, null, '\t'));
            setIsLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setIsLoading(false);
            setError(error.message)
        }
    }

    function sendChanges(e) {
        console.log("Send!")
        console.log(JSON.parse(e))

    }

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <>
            {error!='' && <h2><ModalError title={error}/></h2>}

            <div className="flex flex-col">
                <div className="bg-gray-100 h-14 flex flex-row items-center justify-center border-b-2 ">
                    <span className="font-semibold text-xl">Редактор товаров JSON</span>
                </div>

                {isLoading && <div className="py-5 text-center ">Загрузка...</div>}


                {!isLoading && error=='' && <LanguageEditor originalData={originalProducts} sendChanges={(e) => sendChanges(e)} mode="json"/>}


                {/*<LanguageEditor originalData={originalProducts} sendChanges={(e) => sendChanges(e)} mode="json"/>*/}
            </div>


        </>
    )
}