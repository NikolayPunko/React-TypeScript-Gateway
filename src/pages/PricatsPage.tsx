import React, {useEffect, useState} from 'react'
import {LeftNavigation} from "../components/leftNavigation/LeftNavigation";
import {Navigation} from "../components/Navigation";
import {AxiosError} from "axios";
import {ModalError} from "../components/error/ModalError";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import PriceListTable from "../components/pricats/PriceListTable";
import PricatService from "../services/PricatService";
import {FilterPanelPricat} from "../components/pricats/FilterPanelPricat";
import {ModalFormUploadFile} from "../components/modal/ModalFormUploadFile";
import {ModalNotify} from "../components/modal/ModalNotify";
import {PricatsResponse} from "../models/response/PricatsResponse";
import {ModalSelect} from "../components/modal/ModalSelect";


function PricatsPage() {

    const navigate = useNavigate();

    const [pricats, setPricats] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [isMaxPage, setIsMaxPage] = useState<boolean>(false);


    const [isModalImport, setIsModalImport] = useState(false);

    const [isModalNotify, setIsModalNotif] = useState(false);
    const [isModalSelect, setIsModalSelect] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    const [updateFlag, setUpdateFlag] = useState<boolean>(false);

    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    const [pricatForSend, setPricatForSend] = useState<any>(null);
    function isFetching(bool: boolean) {
        setFetching(bool);
    }


    async function importFile(file: any){
        try {
            setIsLoading(true);
            const response = await PricatService.importPricat(file); //response id
            setModalMsg("Файл успешно импортирован!");
            setUpdateFlag(!updateFlag);
        } catch (e: unknown) {
            setModalMsg("Ошибка импорта! Проверьте импортируемый файл и попробуйте еще раз.")
        } finally {
            setIsLoading(false);
            showModalImport();
            showModalNotif();
        }
    }

    async function sendPricat(pricat: PricatsResponse){ //переделать отправку
        try {
            setIsLoading(true);
            const response = await PricatService.sendPricat(pricat.documentId);
            setModalMsg("Документ успешно отправлен!");
            setUpdateFlag(!updateFlag);
        } catch (e: unknown) {
            setModalMsg("Ошибка отправки! Попробуйте еще раз.")
        } finally {
            setIsLoading(false);
            showModalNotif();
        }

    }

    function pressButSend(pricat: PricatsResponse){
        setPricatForSend(pricat);
        setModalMsg("Вы уверены что хотите отправить документ?");
        showModalSelect();
    }

    async function agreeToSend(){
        showModalSelect();
        await sendPricat(pricatForSend);
        setPricatForSend(null);
    }


    async function fetchPricatsByFilter(pricatNDE: any, pricatStatus:any, pricatDate: any, page: any, replace: boolean) {
        try {
            setError('');
            setIsLoading(true);
            const response = await PricatService.getPricats(pricatNDE, pricatStatus, pricatDate, page)
            if(!replace){
                response.data.length === 0 ? setIsMaxPage(true) : setPricats([...pricats, ...response.data])
            } else {
                setPricats(response.data)
            }
            setIsLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setIsLoading(false);
            setError(error.message)
        }
    }

    async function fetchPricats(pricatNDE: any, pricatStatus:any, pricatDate: any, page: any) {
        setIsMaxPage(false);
        setFetching(false);
        setCurrentPage(1);
        await fetchPricatsByFilter(pricatNDE, pricatStatus, pricatDate, 1, true);
    }

    async function fetchPricatsPaginated(pricatNDE: any, pricatStatus:any, pricatDate: any, page: any) {
        if(!isMaxPage){
            await fetchPricatsByFilter(pricatNDE, pricatStatus, pricatDate, page+1, false).then(() => {
                setFetching(false)
                setCurrentPage(prevState => prevState + 1)
            })
        }
    }

    function showModalImport(){
        setIsModalImport(!isModalImport)
    }

    function showModalNotif(){
        setIsModalNotif(!isModalNotify)
    }

    function showModalSelect(){
        setIsModalSelect(!isModalSelect)
    }

    return (
        <div className="" >
            {error != '' && <h2><ModalError title={error}/></h2>}

            <Navigation isHiddenMenu={false} isOpenMenu={isOpenMenu} setOpenMenu={setIsOpenMenu}/>
            <div className="flex flex-row lg:window-height">
                <div className="w-0 lg:w-44 py-2 border-r-2 bg-gray-50 justify-stretch">
                    <LeftNavigation/>
                </div>
                <div className="flex flex-col w-full">

                    {isOpenMenu &&
                    <div className="w-full lg:hidden text-xs py-2 border-r-2 bg-gray-50 justify-stretch">
                        <LeftNavigation/>
                    </div>
                    }

                    <div className="flex flex-row items-center w-full py-3 border-b-2 bg-gray-50">
                        <div className="inline-flex w-1/2">
                            <span className="font-bold px-5 text-xl">Прайс-листы</span>
                        </div>
                        <div className="inline-flex w-1/2 justify-end">

                            {/*<span onClick={() => {*/}
                            {/*    console.log(fetching)*/}
                            {/*}}>тест</span>*/}
                            <button
                                className="px-2 mx-5 h-7 w-20 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 inline-flex items-center"
                                onClick={() => showModalImport()}>
                                <svg className="h-4 w-4 text-black" width="24" height="24" viewBox="0 0 24 24"
                                     stroke="currentColor" fill="none" >
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <line x1="12" y1="5" x2="12" y2="19"/>
                                    <line x1="18" y1="13" x2="12" y2="19"/>
                                    <line x1="6" y1="13" x2="12" y2="19"/>
                                </svg>
                                <span>Импорт</span>
                            </button>
                        </div>
                    </div>

                    <FilterPanelPricat fetchPricats={fetchPricats} fetchPricatsPaginated={fetchPricatsPaginated}
                                 fetching={fetching} currentPage={currentPage} updateFlag={updateFlag} />


                    {error == '' && <PriceListTable pricats={pricats} isLoading={isLoading} setFetching={isFetching} sendPricat={pressButSend}/>}


                </div>

            </div>



            {isModalImport && <ModalFormUploadFile importFile={importFile} onClose={showModalImport}></ModalFormUploadFile>}

            {isModalNotify && <ModalNotify title={"Результат операции"} message={modalMsg} onClose={showModalNotif}/>}

            {isModalSelect && <ModalSelect title={"Отправка документа"} message={modalMsg} onClose={showModalSelect} onAgreement={agreeToSend}/>}
        </div>


    )
}

export default observer(PricatsPage)