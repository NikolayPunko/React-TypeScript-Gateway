import {observer} from "mobx-react-lite";
import {ModalError} from "../components/error/ModalError";
import ParseDate from "../utils/ParseDate";
import {findLabelByGln} from "../data/directory";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {XMLParser} from "fast-xml-parser";
import {AxiosError} from "axios/index";
import RecadvService from "../services/RecadvService";
import XMLViewer from "react-xml-viewer";
import {RowTableRecadv} from "../components/recadv/RowTableRecadv";


function RecadvPage() {

    const navigate = useNavigate();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [xml, setXml] = useState('');
    const [xmlObj, setXmlObj] = useState<any>({});

    const [xmlPage, setXmlPage] = useState<boolean>(false);

    const propertyStyle = "flex flex-row items-center py-1 text-xs font-medium"


    async function fetchOrder() {
        try {
            const ID = Number(params.id);

            setError('');
            setIsLoading(true);
            const response = await RecadvService.getRecadvById(ID);
            setXml(response.data);
            setXmlObj(new XMLParser().parse(response.data));
            // console.log(new XMLParser().parse(response.data));
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



    function findBYOrSU(str: string){
        let result = '';
        for (let i = 0; i < xmlObj.RECADV?.SG4?.length; i++) {
            if(xmlObj.RECADV?.SG4[i].NAD.E3035 == str){
                result = xmlObj.RECADV?.SG4[i].NAD.C082.E3039
            }
        }
        return result;
    }

    return (
        <>
            {error != '' && <h2><ModalError title={error}/></h2>}

            <div className="flex flex-col">
                <div className="bg-gray-100 h-14 flex flex-row items-center justify-center border-b-2 ">
                    <span className="font-semibold text-xl">Акты расхождений</span>
                </div>

                <button className="px-2 h-7  absolute top-16 z-5 right-5  rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 inline-flex items-center"
                        onClick={() => setXmlPage(!xmlPage)}>XML | Таблица</button>

                {isLoading && <div className="py-5 text-center ">Загрузка...</div>}

                {!isLoading && <>

                    {xmlPage &&
                        <div className="flex flex-col px-10 text-sm py-3">
                            <XMLViewer xml={xml} indentSize={5} />
                            {/*{xml}*/}
                        </div>
                    }

                    {!xmlPage && <>

                        <div className="flex flex-col px-10 py-3">
                            <div className="flex flex-col w-1/2 py-1">
                                <span className="font-bold pb-1">Общая информация</span>

                                <div className={propertyStyle}>
                                    <div className="w-1/2">Номер сообщения:</div>
                                    <div className="w-1/2 px-1">{xmlObj.RECADV?.BGM?.C106?.E1004}</div>
                                </div>

                                <div className={propertyStyle}>
                                    <div className="w-1/2">Дата:</div>
                                    <div className="w-1/2 px-1">{ParseDate.parseXMLToDateToFormatYYYY_MM_dd(String(xmlObj.RECADV?.DTM?.C507?.E2380))}</div>
                                </div>

                            </div>

                            <div className="flex flex-col w-1/2 py-1">
                                <span className="font-bold pb-1">Покупатель</span>
                                <div className={propertyStyle}>
                                    <div className="w-1/2">Наименование:</div>
                                    <div className="w-1/2 px-1">{findLabelByGln(findBYOrSU("BY"))}</div>
                                </div>
                                <div className={propertyStyle}>
                                    <div className="w-1/2">GLN:</div>
                                    <div className="w-1/2 px-1">{findBYOrSU("BY")}</div>
                                </div>
                            </div>

                            <div className="flex flex-col w-1/2 py-1">
                                <span className="font-bold pb-1">Поставщик</span>
                                <div className={propertyStyle}>
                                    <div className="w-1/2">Наименование:</div>
                                    <div className="w-1/2 px-1">{findLabelByGln(findBYOrSU("SU"))}</div>
                                </div>
                                <div className={propertyStyle}>
                                    <div className="w-1/2">GLN:</div>
                                    <div className="w-1/2 px-1">{findBYOrSU("SU")}</div>
                                </div>
                            </div>



                        </div>

                        <div className="bg-gray-100 w-full px-10">
                            <div className="flex flex-row py-2 justify-between">
                                <div className="font-bold">
                                    Товарный раздел
                                </div>
                            </div>


                            <table>
                                <thead>
                                <tr className="border-b table w-full table-fixed align-top" style={{width: 'calc( 100% - 1.1em )'}}>
                                    <th className="px-2 text-xs font-medium text-left" style={{width: '4%'}}>№</th>
                                    <th className=" text-xs font-medium text-left " style={{width: '10%'}}>GTIN</th>
                                    <th className="text-xs font-medium text-left " style={{width: '28%'}}>Наименование товара</th>

                                    <th className="text-xs font-medium text-left " style={{width: '8%'}}>Ед. изм</th>
                                    <th className="text-xs font-medium text-left " style={{width: '8%'}}>№ и дата ТТН</th>
                                    <th className="text-xs font-medium  text-left " style={{width: '8%'}}>Кол-во брака</th>
                                    <th className="text-xs font-medium  text-left " style={{width: '8%'}}>Вид брака</th>
                                    <th className="text-xs font-medium  text-left " style={{width: '8%'}}>Цена руб.</th>

                                    <th className="text-xs font-medium  text-left  bg-amber-300" style={{width: '10%'}}>
                                        <div className="flex flex-row w-full justify-center">Количество</div>
                                        <div className="flex flex-row w-full ">
                                            <div className="text-xs font-medium  text-left w-1/2 flex justify-center" >по ТТН</div>
                                            <div className="text-xs font-medium  text-left w-1/2 flex justify-center" >Факт.</div>
                                        </div>
                                    </th>

                                    <th className="text-xs font-medium text-left bg-blue-300" style={{width: '20%'}}>
                                        <div className="flex flex-row w-full justify-center">Разница</div>
                                        <div className="flex flex-row w-full">
                                            <div className="w-1/2 flex flex-col bg-amber-50" >
                                                <div className="flex justify-center" >Недостача</div>
                                                <div className="flex flex-row" >
                                                    <div className="w-1/2 flex justify-center" >Кол-во</div>
                                                    <div className="w-1/2 flex justify-center" >Сумма руб.</div>
                                                </div>
                                            </div>
                                            <div className="w-1/2 flex flex-col bg-green-200" >
                                                <div className="flex justify-center" >Излишки</div>
                                                <div className="flex flex-row" >
                                                    <div className="w-1/2 flex justify-center" >Кол-во</div>
                                                    <div className="w-1/2 flex justify-center" >Сумма руб.</div>
                                                </div>
                                            </div>
                                        </div>

                                    </th>
                                    <th className="text-xs font-medium  text-left " style={{width: '8%'}}>Код товара</th>

                                </tr>

                                </thead>

                                <tbody className="block overflow-y-scroll bg-white" style={{maxHeight: 'calc( 100vh - 212px )'}}>

                                {xmlObj.RECADV?.SG16?.map((product, index) => <RowTableRecadv product={product} key={index}/>)}

                                </tbody>
                            </table>

                        </div>

                    </>
                    }


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

export default observer(RecadvPage)