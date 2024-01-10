import React, {useState} from 'react'
import {LeftNavigation} from "../components/leftNavigation/LeftNavigation";
import {Navigation} from "../components/Navigation";
import {AxiosError} from "axios";
import {ModalError} from "../components/error/ModalError";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import PriceListTable from "../components/priceLists/PriceListTable";
import PricatService from "../services/PricatService";
import {FilterPanelPricat} from "../components/Pricat/FilterPanelPricat";
import {ModalFormUploadFile} from "../components/priceLists/ModalFormUploadFile";
import {Modal} from "../components/modal/Modal";


function PriceListsPage() {

    const navigate = useNavigate();

    const [pricats, setPricats] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);


    const [isModalImport, setIsModalImport] = useState(false);

    const [isModalNotif, setIsModalNotif] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    function isFetching(bool: boolean) {
        // setFetching(bool); //поправить пагинацию
    }

    async function importFile(file: any){
        try {
            setIsLoading(true);
            const response = await PricatService.importPricat(file); //response id
            setModalMsg("Файл успешно импортирован!");
        } catch (e: unknown) {
            setModalMsg("Ошибка импорта! Проверьте импортируемый файл и попробуйте еще раз.")
        } finally {
            setIsLoading(false);
            showModalImport();
            showModalNotif();
        }
    }

    function resetPricats(){
        setPricats([]);
    }

    async function fetchPricatsByFilter(pricatNDE: any, pricatStatus:any, pricatDate: any, page: any) {
        try {
            setError('');
            setIsLoading(true);
            const response = await PricatService.getPricats(pricatNDE, pricatStatus, pricatDate, page)
            // console.log(page)
            setPricats(response.data);
            // setPricats([...pricats, ...response.data]);

            setIsLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setIsLoading(false);
            setError(error.message)
        }
    }

    async function fetchOrdersPaginated(pricatNDE: any, pricatStatus:any, pricatDate: any, page: any) {
        await fetchPricatsByFilter(pricatNDE, pricatStatus, pricatDate, page+1)
        setCurrentPage(prevState => prevState + 1)
        setFetching(false)
    }

    function showModalImport(){
        setIsModalImport(!isModalImport)
    }

    function showModalNotif(){
        setIsModalNotif(!isModalNotif)
    }

    return (
        <>
            {error != '' && <h2><ModalError title={error}/></h2>}

            <Navigation/>
            <div className="flex flex-row window-height">
                <div className="w-44 py-2 border-r-2 bg-gray-50 justify-stretch">
                    <LeftNavigation/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row items-center w-full py-3 border-b-2 bg-gray-50">
                        <div className="inline-flex w-1/2">
                            <span className="font-bold px-5 text-xl">Прайс-листы</span>
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

                    <FilterPanelPricat fetchPricatsByFilter={fetchPricatsByFilter} fetchPricatsPaginated={fetchOrdersPaginated}
                                 fetching={fetching} currentPage={currentPage} setFetching={isFetching} resetPricats={resetPricats}/>


                    {error == '' && <PriceListTable pricats={pricats} isLoading={isLoading} setFetching={isFetching}/>}


                </div>

            </div>

            {isModalImport && <ModalFormUploadFile importFile={importFile} onClose={showModalImport}></ModalFormUploadFile>}

            {isModalNotif && <Modal title={"Результат операции"} message={modalMsg} onClose={showModalNotif}/>}
        </>


    )
}

export default observer(PriceListsPage)