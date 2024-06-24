import React, {useEffect, useState} from 'react'
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {ModalError} from "../components/error/ModalError";
import {observer} from "mobx-react-lite";
import PricatService from "../services/PricatService";
import XMLViewer from "react-xml-viewer";
import {XMLBuilder, XMLParser} from "fast-xml-parser";
import {RowTablePricat} from "../components/pricat/RowTablePricat";
import ParseDate from "../utils/ParseDate";
import {findLabelByGln} from "../data/directory";
import {RowTableShops} from "../components/pricat/RowTableShops";


function PricatPage() {

    const navigate = useNavigate();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [xml, setXml] = useState('');
    const [xmlObj, setXmlObj] = useState<any>({});

    const [xmlPage, setXmlPage] = useState<boolean>(false);

    const [activeItem, setActiveItem] = useState<any>(0);

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
            setXmlObj(new XMLParser().parse(response.data));
            // console.log(new XMLParser().parse(response.data))

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


    // const customTheme = {
    //     "attributeKeyColor": "#000000",
    //     "attributeValueColor": "#000000",
    //     "cdataColor": "#000000",
    //     "commentColor": "#000000",
    //     "separatorColor": "#000000",
    //     "tagColor": "#000000",
    //     "textColor": "#000000",
    // }


    function findBYOrSU(str: string) {
        let result = '';
        for (let i = 0; i < xmlObj.PRICAT?.SG2?.length; i++) {
            if (xmlObj.PRICAT.SG2[i].NAD.E3035 == str) {
                result = xmlObj.PRICAT.SG2[i].NAD.C082.E3039
            }
        }
        return result;
    }

    function selectItem(index: number) {
        setActiveItem(index);
    }

    function isPriceList(): boolean {
        return xmlObj.PRICAT?.BGM?.E1225 != "2";
    }

    return (
        <>
            {error != '' && <h2><ModalError title={error}/></h2>}

            <div className="flex flex-col">
                <div className="bg-gray-100 h-14 flex flex-row items-center justify-center border-b-2 ">
                    <span className="font-semibold text-xl">Прайс-лист</span>
                </div>

                <button
                    className="px-2 h-7  absolute top-16 z-5 right-5  rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 inline-flex items-center"
                    onClick={() => setXmlPage(!xmlPage)}>XML | Таблица
                </button>

                {isLoading && <div className="py-5 text-center ">Загрузка...</div>}

                {!isLoading && <>

                    {xmlPage &&
                        <div className="flex flex-col px-10 text-sm py-3">
                            <XMLViewer xml={xml} indentSize={5}/>
                            {/*{xml}*/}
                        </div>
                    }

                    {!xmlPage && <>

                        <div className="flex flex-col px-3 lg:px-10 py-3">
                            <div className="flex flex-col w-full lg:w-1/2 py-1">
                                <span className="font-bold pb-1">Общая информация</span>

                                <div className={propertyStyle}>
                                    <div className="w-1/2">Номер сообщения:</div>
                                    <div className="w-1/2 px-1">{xmlObj.PRICAT?.BGM?.C106?.E1004}</div>
                                </div>

                                <div className={propertyStyle}>
                                    <div className="w-1/2">Дата:</div>
                                    <div
                                        className="w-1/2 px-1">{ParseDate.parseXMLToDateToFormatYYYY_MM_dd(String(xmlObj.PRICAT?.DTM?.C507?.E2380))}</div>
                                </div>

                                {/*<div className={propertyStyle}>*/}
                                {/*    <div className="w-1/2">Статус:</div>*/}
                                {/*    <div*/}
                                {/*        className="w-1/2 px-1"></div>*/}
                                {/*</div>*/}

                            </div>

                            <div className="flex flex-col w-full lg:w-1/2 py-1">
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

                            <div className="flex flex-col w-full lg:w-1/2 py-1">
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

                        <div className="bg-gray-100 w-full px-3 lg:px-10">
                            <div className="flex flex-row py-2 justify-between">
                                <div className="font-bold">
                                    Товарный раздел
                                </div>
                            </div>

                            {!isPriceList() &&
                                <>
                                    <div className="w-full overflow-x-auto">
                                        <table>
                                            <thead>
                                            <tr className="border-b table w-auto table-auto lg:table-fixed  align-top"
                                                style={{width: 'calc( 100% - 0.5em )'}}>
                                                <th className="px-2 pb-10 text-xs font-medium text-left min-w-[40px]"
                                                    style={{width: '4%'}}>№
                                                </th>

                                                <th className=" text-xs font-medium text-left min-w-[100px]"
                                                    style={{width: '10%'}}>GTIN
                                                </th>
                                                <th className="text-xs font-medium text-left min-w-[200px]"
                                                    style={{width: '28%'}}>Наименование
                                                    товара
                                                </th>
                                                <th className="text-xs font-medium text-left min-w-[100px]"
                                                    style={{width: '8%'}}>Грамматура
                                                </th>
                                                <th className="text-xs font-medium text-left min-w-[70px]"
                                                    style={{width: '5%'}}>Отпускная цена
                                                    без НДС
                                                </th>

                                                <th className="text-xs font-medium text-left min-w-[70px]"
                                                    style={{width: '5%'}}>Цена со
                                                    скидкой
                                                </th>

                                                <th className="text-xs font-medium text-left min-w-[140px]"
                                                    style={{width: '12%'}}>
                                                    <div className="flex flex-row w-full justify-center">Период скидки
                                                    </div>
                                                    <div className="flex flex-row w-full ">
                                                        <div className="text-xs font-medium text-left w-1/2">С</div>
                                                        <div className="text-xs font-medium text-left w-1/2">По</div>
                                                    </div>
                                                </th>

                                                {/*<th className="text-xs font-medium text-left " style={{width: '8%'}}>Ставка НДС, %</th>*/}
                                                <th className="text-xs font-medium text-left min-w-[60px]"
                                                    style={{width: '5%'}}>Срок
                                                    годности
                                                </th>
                                                <th className="text-xs font-medium text-left min-w-[50px]"
                                                    style={{width: '5%'}}>Кол-во
                                                    в 1тм.
                                                    шт
                                                </th>
                                                <th className="text-xs font-medium  text-left min-w-[50px]"
                                                    style={{width: '4%'}}>Длина
                                                </th>
                                                <th className="text-xs font-medium  text-left min-w-[50px]"
                                                    style={{width: '4%'}}>Ширина
                                                </th>
                                                <th className="text-xs font-medium  text-left min-w-[50px]"
                                                    style={{width: '4%'}}>Высота
                                                </th>
                                                <th className="text-xs font-medium  text-left min-w-[100px]"
                                                    style={{width: '8%'}}>Код
                                                    товара
                                                </th>

                                            </tr>

                                            </thead>

                                            <tbody
                                                className="block table-auto lg:table-fixed overflow-y-scroll overflow-x-hidden bg-white"
                                                style={{maxHeight: 'calc( 55vh)'}}>

                                            {xmlObj.PRICAT?.SG17?.SG36?.map((product, index) => <RowTablePricat
                                                selectItem={selectItem} index={index} product={product}
                                                isPriceList={isPriceList()} activeItem={activeItem}
                                                key={index}/>)}

                                            </tbody>
                                        </table>


                                    </div>
                                    <div>
                                        <div className="flex flex-row py-2 justify-between">
                                            <div>
                                                <span className="font-bold">Список магазинов</span> для товара
                                                №{activeItem + 1}
                                            </div>
                                        </div>

                                        <table>
                                            <thead>
                                            <tr className="border-b table w-full table-fixed align-top"
                                                style={{width: 'calc( 100% - 0.5em )'}}>
                                                <th className="px-2 pb-2 text-xs font-medium text-left"
                                                    style={{width: '10%'}}>№
                                                </th>

                                                <th className=" text-xs font-medium text-left "
                                                    style={{width: '40%'}}>GLN
                                                </th>
                                                <th className="text-xs font-medium text-left "
                                                    style={{width: '50%'}}>Наименование магазина
                                                </th>

                                            </tr>

                                            </thead>

                                            <tbody className="block overflow-y-scroll bg-white"
                                                   style={{maxHeight: 'calc( 25vh)'}}>

                                            {xmlObj.PRICAT?.SG17?.SG36[activeItem]?.SG52?.map((item, index) =>
                                                <RowTableShops item={item} index={index} key={index}/>)}

                                            </tbody>
                                        </table>
                                    </div>

                                </>
                            }


                            {isPriceList() && //протокол к прейскуранту
                                <div className="w-full overflow-x-auto">
                                    <table className="">
                                        <thead>
                                        <tr className="border-b table w-auto table-auto lg:table-fixed  align-top"
                                            style={{width: 'calc( 100% - 0.5em )'}}>
                                            <th className="px-2 pb-10 text-xs font-medium text-left min-w-[40px]"
                                                style={{width: '4%'}}>№
                                            </th>

                                            <th className=" text-xs font-medium text-left min-w-[100px]"
                                                style={{width: '10%'}}>GTIN
                                            </th>
                                            <th className="text-xs font-medium text-left min-w-[200px]"
                                                style={{width: '28%'}}>Наименование
                                                товара
                                            </th>
                                            <th className="text-xs font-medium text-left min-w-[100px]"
                                                style={{width: '8%'}}>Грамматура
                                            </th>
                                            <th className="text-xs font-medium text-left min-w-[100px]"
                                                style={{width: '8%'}}>Отпускная цена
                                                без НДС
                                            </th>
                                            {/*<th className="text-xs font-medium text-left " style={{width: '8%'}}>Ставка НДС, %</th>*/}
                                            <th className="text-xs font-medium  text-left min-w-[70px]"
                                                style={{width: '8%'}}>Срок
                                                годности
                                            </th>
                                            <th className="text-xs font-medium  text-left min-w-[70px]"
                                                style={{width: '8%'}}>Кол-во
                                                в 1тм.
                                                шт
                                            </th>
                                            <th className="text-xs font-medium  text-left min-w-[50px]"
                                                style={{width: '6%'}}>Длина
                                            </th>
                                            <th className="text-xs font-medium  text-left min-w-[50px]"
                                                style={{width: '6%'}}>Ширина
                                            </th>
                                            <th className="text-xs font-medium  text-left min-w-[50px]"
                                                style={{width: '6%'}}>Высота
                                            </th>
                                            <th className="text-xs font-medium  text-left min-w-[100px]"
                                                style={{width: '8%'}}>Код
                                                товара
                                            </th>

                                        </tr>

                                        </thead>

                                        <tbody
                                            className="block table-auto lg:table-fixed overflow-y-scroll overflow-x-hidden bg-white"
                                            style={{maxHeight: 'calc( 100vh - 135px )'}}>

                                        {xmlObj.PRICAT?.SG17?.SG36?.map((product, index) => <RowTablePricat
                                            selectItem={selectItem} index={index} product={product}
                                            isPriceList={isPriceList()} activeItem={activeItem}
                                            key={index}/>)}

                                        </tbody>
                                    </table>

                                </div>
                            }


                        </div>

                    </>
                    }


                    <div className="h-16 border-t-2 flex flex-row items-center px-10">
                        <button
                            className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 "
                            onClick={() => navigate("/pricats")}>Закрыть
                        </button>
                        {/*<button*/}
                        {/*    className="px-3 mr-3 h-7 rounded text-xs text-white font-medium shadow-sm border border-slate-400 bg-blue-700 hover:bg-blue-800 "*/}
                        {/*    >Отправить*/}
                        {/*</button>*/}
                    </div>
                </>}


            </div>
        </>

    )
}

export default observer(PricatPage)