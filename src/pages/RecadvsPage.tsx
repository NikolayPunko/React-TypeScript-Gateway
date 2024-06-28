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
import {useNavigate} from "react-router-dom";


function RecadvsPage() {

    const navigate = useNavigate();

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

    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

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
                            <span className="font-bold px-5 text-xl">Акты расхождений</span>
                        </div>
                        <div className="inline-flex w-1/2 justify-end">

                            <button className="px-2 mr-5 h-7 w-auto rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 inline-flex items-center"
                                    onClick={() => navigate("/recadvs/create")}>
                                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H14C14.5523 23 15 22.5523 15 22C15 21.4477 14.5523 21 14 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V8C19 8.55228 19.4477 9 20 9C20.5523 9 21 8.55228 21 8V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12V15H15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17H18V20C18 20.5523 18.4477 21 19 21C19.5523 21 20 20.5523 20 20V17H23C23.5523 17 24 16.5523 24 16C24 15.4477 23.5523 15 23 15H20V12Z" fill="#000000"></path> </g></svg>
                                <span className="pl-1">Создать</span>
                            </button>
                            <button
                                className="px-2 mr-5 h-7 w-20 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 inline-flex items-center"
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