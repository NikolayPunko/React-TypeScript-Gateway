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
import {RowTableRecadvNew} from "../components/recadv/RowTableRecadvNew";


function RecadvPage() {

    const navigate = useNavigate();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [xml, setXml] = useState('');
    const [xmlObj, setXmlObj] = useState<any>({});
    const [products, setProducts] = useState<any>([]);

    const [xmlPage, setXmlPage] = useState<boolean>(false);

    const propertyStyle = "flex flex-row items-center py-1 text-xs font-medium"

    //const [fields, setFields] = React.useState<any>({numbMsg:'', date:'', sender:'', receiver:'' });
    const [numbMsg, setNumbMsg] = React.useState<any>('');
    const [date, setDate] = React.useState<any>('');
    const [sender, setSender] = React.useState<any>('');
    const [receiver, setReceiver] = React.useState<any>('');

    async function fetchRecadv() {
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

    function parseFields(){

        if(xmlObj.RECADV?.BGM){
            setNumbMsg(xmlObj.RECADV?.BGM?.C106?.E1004)
            setDate(xmlObj.RECADV?.DTM?.C507?.E2380)
            setSender(findBYOrSU("SU"))
            setReceiver(findBYOrSU("BY"))
        }

        if(xmlObj.BLRADF?.Actdif){
            setNumbMsg(xmlObj.BLRADF?.Actdif.ID)
            setDate(xmlObj.BLRADF?.Actdif.ActDifDate)
            setSender(xmlObj.BLRADF?.Actdif.Shipper.GLN)
            setReceiver(xmlObj.BLRADF?.Actdif.Receiver.GLN)
            setProducts(xmlObj.BLRADF?.Actdif?.LineItem)
        }
    }

    useEffect(() => {
        fetchRecadv();
    }, []);

    useEffect(() => {
        parseFields();
    }, [xmlObj]);



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

                        <div className="flex flex-col px-3 lg:px-10 py-3">
                            <div className="flex flex-col w-full lg:w-1/2 py-1">
                                <span className="font-bold pb-1">Общая информация</span>

                                <div className={propertyStyle}>
                                    <div className="w-1/2">Номер сообщения:</div>
                                    <div className="w-1/2 px-1">{numbMsg}</div>
                                </div>

                                <div className={propertyStyle}>
                                    <div className="w-1/2">Дата:</div>
                                    <div className="w-1/2 px-1">{ParseDate.parseXMLToDateToFormatYYYY_MM_dd(String(date))}</div>
                                </div>

                            </div>

                            <div className="flex flex-col w-full lg:w-1/2 py-1">
                                <span className="font-bold pb-1">Покупатель</span>
                                <div className={propertyStyle}>
                                    <div className="w-1/2">Наименование:</div>
                                    <div className="w-1/2 px-1">{findLabelByGln(receiver)}</div>
                                </div>
                                <div className={propertyStyle}>
                                    <div className="w-1/2">GLN:</div>
                                    <div className="w-1/2 px-1">{receiver}</div>
                                </div>
                            </div>

                            <div className="flex flex-col w-full lg:w-1/2 py-1">
                                <span className="font-bold pb-1">Поставщик</span>
                                <div className={propertyStyle}>
                                    <div className="w-1/2">Наименование:</div>
                                    <div className="w-1/2 px-1">{findLabelByGln(sender)}</div>
                                </div>
                                <div className={propertyStyle}>
                                    <div className="w-1/2">GLN:</div>
                                    <div className="w-1/2 px-1">{sender}</div>
                                </div>
                            </div>



                        </div>

                        <div className="bg-gray-100 w-full px-3 lg:px-10">
                            <div className="flex flex-row py-2 justify-between">
                                <div className="font-bold">
                                    Товарный раздел
                                </div>
                            </div>

                            <div className="w-full overflow-x-auto">
                            <table>
                                <thead>
                                <tr className="border-b table w-auto table-auto lg:table-fixed  align-top" style={{width: 'calc( 100% - 0.5em )'}}>
                                    <th className="px-2 text-xs font-medium text-left min-w-[40px]" style={{width: '4%'}}>№</th>
                                    <th className=" text-xs font-medium text-left min-w-[100px]" style={{width: '10%'}}>GTIN</th>
                                    <th className="text-xs font-medium text-left min-w-[200px]" style={{width: '25%'}}>Наименование товара</th>

                                    <th className="text-xs font-medium text-left min-w-[100px]" style={{width: '5%'}}>Ед. изм</th>
                                    <th className="text-xs font-medium text-left min-w-[100px]" style={{width: '5%'}}>№ и дата ТТН</th>
                                    <th className="text-xs font-medium  text-left min-w-[100px]" style={{width: '5%'}}>Кол-во брака</th>
                                    <th className="text-xs font-medium  text-left min-w-[100px]" style={{width: '5%'}}>Вид брака</th>
                                    <th className="text-xs font-medium  text-left min-w-[100px]" style={{width: '5%'}}>Цена руб.</th>

                                    <th className="text-xs font-medium text-left min-w-[100px]" style={{width: '10%'}}>
                                        <div className="flex flex-row w-full justify-center">Количество</div>
                                        <div className="flex flex-row w-full ">
                                            <div className="text-xs font-medium text-left w-1/2">по ТТН</div>
                                            <div className="text-xs font-medium text-left w-1/2">Факт.</div>
                                        </div>
                                    </th>

                                    <th className="text-xs font-medium text-left min-w-[200px]" style={{width: '20%'}}>
                                        <div className="flex flex-row w-full justify-center">Разница</div>
                                        <div className="flex flex-row w-full">
                                            <div className="w-1/2 flex flex-col" >
                                                <div className="flex justify-center" >Недостача</div>
                                                <div className="flex flex-row" >
                                                    <div className="w-1/2" >Кол-во</div>
                                                    <div className="w-1/2" >Сумма руб.</div>
                                                </div>
                                            </div>
                                            <div className="w-1/2 flex flex-col">
                                                <div className="flex justify-center">Излишки</div>
                                                <div className="flex flex-row">
                                                    <div className="w-1/2">Кол-во</div>
                                                    <div className="w-1/2">Сумма руб.</div>
                                                </div>
                                            </div>
                                        </div>

                                    </th>
                                    <th className="text-xs font-medium text-left min-w-[100px]" style={{width: '6%'}}>Код товара</th>

                                </tr>

                                </thead>

                                <tbody className="block table-auto lg:table-fixed overflow-y-scroll overflow-x-hidden bg-white"
                                       style={{maxHeight: 'calc( 55vh)'}}>

                                {xmlObj.RECADV?.SG16?.SG22?.map((product, index) => <RowTableRecadv product={product} key={index}/>)}


                                {products.length > 1 && xmlObj.BLRADF?.Actdif
                                    && xmlObj.BLRADF?.Actdif?.LineItem?.map((product, index) => <RowTableRecadvNew product={product} key={index}/>)}

                                {products.length == undefined && xmlObj.BLRADF?.Actdif
                                    && <RowTableRecadvNew product={xmlObj.BLRADF?.Actdif?.LineItem} key={0}/>}



                                </tbody>
                            </table>
                            </div>

                        </div>

                    </>
                    }


                    <div className="h-16 border-t-2 flex flex-row items-center px-10">
                        <button
                            className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 "
                            onClick={() => navigate("/recadvs")}>Закрыть
                        </button>
                    </div>
                </>}


            </div>
        </>
    )
}

export default observer(RecadvPage)