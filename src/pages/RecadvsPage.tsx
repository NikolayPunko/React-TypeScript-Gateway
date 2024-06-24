import {observer} from "mobx-react-lite";
import {ModalError} from "../components/error/ModalError";
import {Navigation} from "../components/Navigation";
import {LeftNavigation} from "../components/leftNavigation/LeftNavigation";
import React, {useState} from "react";
import {FilterPanelRecadv} from "../components/recadvs/FilterPanelRecadv";
import {AxiosError} from "axios";
import RecadvTable from "../components/recadvs/RecadvTable";
import RecadvService from "../services/RecadvService";
import {ModalFormUploadFile} from "../components/modal/ModalFormUploadFile";
import {ModalNotify} from "../components/modal/ModalNotify";
import {ModalSelect} from "../components/modal/ModalSelect";
import {RecadvsResponse} from "../models/response/RecadvsResponse";


function RecadvsPage() {

    const [recadvs, setRecadvs] = useState<any>([]);
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

    const [recadvForSend, setRecadvForSend] = useState<any>(null);


    function isFetching(bool: boolean) {
        setFetching(bool);
    }

    async function importFile(file: any){
        try {
            setIsLoading(true);
            const response = await RecadvService.importRecadv(file); //response id
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

    async function sendRecadv(recadv: RecadvsResponse){
        try {
            setIsLoading(true);
            const response = await RecadvService.sendRecadv(recadv.documentId);
            setModalMsg("Документ успешно отправлен!");
            setUpdateFlag(!updateFlag);
        } catch (e: unknown) {
            setModalMsg("Ошибка отправки! Попробуйте еще раз.")
        } finally {
            setIsLoading(false);
            showModalNotif();
        }

    }

    function pressButSend(recadv: RecadvsResponse){
        setRecadvForSend(recadv);
        setModalMsg("Вы уверены что хотите отправить документ?");
        showModalSelect();
    }

    async function agreeToSend(){
        showModalSelect();
        await sendRecadv(recadvForSend);
        setRecadvForSend(null);
    }


    async function fetchRecadvsByFilter(NDE: any, Status:any, Date: any, page: any, replace: boolean) {
        try {
            setError('');
            setIsLoading(true);
            const response = await RecadvService.getRecadvs(NDE, Status, Date, page)
            if(!replace){
                response.data.length === 0 ? setIsMaxPage(true) : setRecadvs([...recadvs, ...response.data])
            } else {
                setRecadvs(response.data)
            }
            setIsLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setIsLoading(false);
            setError(error.message)
        }
    }

    async function fetchRecadvs(NDE: any, Status:any, Date: any, page: any) {
        setIsMaxPage(false);
        setFetching(false);
        setCurrentPage(1);
        await fetchRecadvsByFilter(NDE, Status, Date, 1, true);
    }

    async function fetchRecadvsPaginated(NDE: any, Status:any, Date: any, page: any) {
        if(!isMaxPage){
            await fetchRecadvsByFilter(NDE, Status, Date, page+1, false).then(() => {
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
        <>
            {error != '' && <h2><ModalError title={error}/></h2>}

            <Navigation isHiddenMenu={true} isOpenMenu={false} setOpenMenu={() => {}}/>
            <div className="flex flex-row window-height">
                <div className="w-44 py-2 border-r-2 bg-gray-50 justify-stretch">
                    <LeftNavigation/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row items-center w-full py-3 border-b-2 bg-gray-50">
                        <div className="inline-flex w-1/2">
                            <span className="font-bold px-5 text-xl">Акты расхождений</span>
                        </div>
                        <div className="inline-flex w-1/2 justify-end">


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

                    <FilterPanelRecadv fetchRecadvs={fetchRecadvs} fetchRecadvsPaginated={fetchRecadvsPaginated}
                                       fetching={fetching} currentPage={currentPage} updateFlag={updateFlag} />



                    {error == '' && <RecadvTable recadvs={recadvs} isLoading={isLoading} setFetching={isFetching} sendRecadv={pressButSend}/>}


                </div>

            </div>

            {isModalImport && <ModalFormUploadFile importFile={importFile} onClose={showModalImport}></ModalFormUploadFile>}

            {isModalNotify && <ModalNotify title={"Результат операции"} message={modalMsg} onClose={showModalNotif}/>}

            {isModalSelect && <ModalSelect title={"Отправка документа"} message={modalMsg} onClose={showModalSelect} onAgreement={agreeToSend}/>}
        </>
    )
}

export default observer(RecadvsPage)