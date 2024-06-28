import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Navigation} from "../components/Navigation";
import {LeftNavigation} from "../components/leftNavigation/LeftNavigation";
import {useNavigate} from "react-router-dom";
import {styleInput, styleLabelInput} from "../data/styles";
import {SingleForm} from "../components/createRecadv/SingleForm";
import RecadvTableRow from "../components/recadvs/RecadvTableRow";
import {RecadvsResponse} from "../models/response/RecadvsResponse";
import RecadvService from "../services/RecadvService";
import {XMLBuilder, XMLParser} from "fast-xml-parser";
import ParseDate from "../utils/ParseDate";
import {ModalError} from "../components/error/ModalError";
import {ModalNotify} from "../components/modal/ModalNotify";
import {ModalSelect} from "../components/modal/ModalSelect";

let nextId = 1;

function CreateRecadvPage() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    const [isModalNotify, setIsModalNotif] = useState(false);
    const [isModalSelect, setIsModalSelect] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    const [doc, setDoc] = useState<any>({nde: '', date: '', glnSender: '', glnReceiver: '', items: []});


    useEffect(() => {
        nextId = 1;
        pressButAddItem();
    }, []);

    function generateXML() {
        return "<BLRADF>\n" +
            // "    <MessageHeader>\n" +
            // "        <MessageID>65131177518375</MessageID>\n" +
            // "        <MsgDateTime>20240426150256</MsgDateTime>\n" +
            // "        <MessageType>BLRADF</MessageType>\n" +
            // "        <MsgSenderID>4810268900198</MsgSenderID>\n" +
            // "        <MsgReceiverID>2948845999999</MsgReceiverID>\n" +
            // "    </MessageHeader>\n" +
            "    <Actdif>\n" +
            "        <ID>" + doc.nde + "</ID>\n" +
            "        <CreationDateTime>" + ParseDate.ParseDateToFormatYYYY_MM_dd_HH_mm_ssWithoutDivision(new Date()) + "</CreationDateTime>\n" +
            // "        <FunctionCode>9</FunctionCode>\n" +
            // "        <ActDifNumber>001-4810268900198-12604240002-01</ActDifNumber>\n" +
            "        <ActDifDate>" + doc.date + "</ActDifDate>\n" +
            // "        <ContractNumber>666</ContractNumber>\n" +
            // "        <ContractDate>20240411</ContractDate>\n" +
            // "        <ReferenceDocument>\n" +
            // "            <Type>700</Type>\n" +
            // "            <ID>001-4810268900198-12604240002</ID>\n" +
            // "            <Date>20240426</Date>\n" +
            // "        </ReferenceDocument>\n" +
            "        <Shipper>\n" +
            // "            <VATRegistrationNumber>200030514</VATRegistrationNumber>\n" +
            // "            <Name>ОАО \"UserTest\"</Name>\n" +
            // "            <Address>224028, г. Брест, ул. Янки Купалы, д. 118</Address>\n" +
            "            <GLN>" + doc.glnSender + "</GLN>\n" +
            "        </Shipper>\n" +
            "        <Receiver>\n" +
            // "            <VATRegistrationNumber>200030514</VATRegistrationNumber>\n" +
            // "            <Name>ОАО \"UserTest2\"</Name>\n" +
            // "            <Address>г. Минск</Address>\n" +
            "            <GLN>" + doc.glnReceiver + "</GLN>\n" +
            "        </Receiver>\n" +
            // "        <ShipTo>\n" +
            // "            <GLN>2948845999999</GLN>\n" +
            // "            <Address>Беларусь, г. Минск</Address>\n" +
            // "        </ShipTo>\n" +
            // "        <ShipperContact>\n" +
            // "            <Contact>ЖУК</Contact>\n" +
            // "        </ShipperContact>\n" +
            // "        <ReceiverContact>\n" +
            // "            <Contact>666</Contact>\n" +
            // "        </ReceiverContact>\n" +
            "        <Currency>BYN</Currency>\n" +
            doc.items.map((item) => generateItemsXML(item)).join('') + //генерируем товары
            "        <Total>\n" +
            // "            <TotalLineItem>-</TotalLineItem>\n" +
            // "            <TotalLineItemQuantity>-</TotalLineItemQuantity>\n" +
            // "            <TotalAmountWithoutCharges>-</TotalAmountWithoutCharges>\n" +
            // "            <TotalLineItemAmountCharges>-</TotalLineItemAmountCharges>\n" +
            // "            <TotalLineItemAmountOrdered>-</TotalLineItemAmountOrdered>\n" +
            // "            <TotalQuantityReceivedFact>-</TotalQuantityReceivedFact>\n" +
            // "            <TotalAmountReceivedWithoutCharges>-</TotalAmountReceivedWithoutCharges>\n" +
            // "            <TotalLineItemAmountChargesReceived>-</TotalLineItemAmountChargesReceived>\n" +
            // "            <TotalAmountReceived>-</TotalAmountReceived>\n" +
            // "            <TotalQuantityAccepted>-</TotalQuantityAccepted>\n" +
            // "            <TotalAmountAcceptedWithoutCharges>-</TotalAmountAcceptedWithoutCharges>\n" +
            // "            <TotalLineItemAmountChargesAccepted>-</TotalLineItemAmountChargesAccepted>\n" +
            // "            <TotalAmountAccepted>-</TotalAmountAccepted>\n" +
            // "            <TotalAmountNotAcceptedWithoutCharges>-</TotalAmountNotAcceptedWithoutCharges>\n" +
            // "            <TotalLineItemAmountChargesDeliveredNotAccepted>-</TotalLineItemAmountChargesDeliveredNotAccepted>\n" +
            // "            <TotalAmountNotAccepted>-</TotalAmountNotAccepted>\n" +
            "        </Total>\n" +
            "    </Actdif>\n" +
            "    <SpecialPart>\n" +
            // "        <Signature>\n" +
            // "            <SecurityID>1</SecurityID>\n" +
            // "            <CertificateID>40E5F4AC783078ED001C2C1E</CertificateID>\n" +
            // "            <CertificateSubject>Шпендик Кристина Андреевна</CertificateSubject>\n" +
            // "            <CertificateSubjectSide>0</CertificateSubjectSide>\n" +
            // "            <SecurityPartyID>40E5B2368E3E728300000004</SecurityPartyID>\n" +
            // "            <SecurityPartyName>Республиканский удостоверяющий центр ГосСУОК</SecurityPartyName>\n" +
            // "            <SigningTime>20240426150258</SigningTime>\n" +
            // "            <SignatureValue>\n" +
            // "                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\n" +
            // "            </SignatureValue>\n" +
            // "        </Signature>\n" +
            // "        <Signature>\n" +
            // "            <SecurityID>2</SecurityID>\n" +
            // "            <CertificateSubjectSide>1</CertificateSubjectSide>\n" +
            // "            <SignatureValue>\n" +
            // "                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\n" +
            // "            </SignatureValue>\n" +
            // "        </Signature>\n" +
            "    </SpecialPart>\n" +
            "</BLRADF>";
    }

    function generateItemsXML(item: any) {
        return "<LineItem>\n" +
            " <LineItemNumber>" + item.id + "</LineItemNumber>\n" +
            "<LineItemID>" + item.gtin + "</LineItemID>\n" +
            "<LineItemReceiverID>" + item.productCode + "</LineItemReceiverID>\n" +
            "<LineItemName>" + item.name + "</LineItemName>\n" +
            // "<QuantityDespatched>20.00000</QuantityDespatched>\n" +
            "<LineItemQuantityUOM>" + item.units + "</LineItemQuantityUOM>\n" +
            "<LineItemPriceWithoutCharges>" + item.price + "</LineItemPriceWithoutCharges>\n" +
            // "<LineItemAmountWithoutCharges>59.40</LineItemAmountWithoutCharges>\n" +
            "<TaxRate>10.00</TaxRate>\n" +
            "<LineItemAmountOrdered>" + item.quantityTTN + "</LineItemAmountOrdered>\n" +
            "<QuantityReceivedFact>" + item.quantityActual + "</QuantityReceivedFact>\n" +
            // "<LineItemFactPrice>2.97</LineItemFactPrice>\n" +
            // "<LineItemAmountWithoutChargesReceivedFact>0.00</LineItemAmountWithoutChargesReceivedFact>\n" +
            // "<LineItemAmountReceivedFact>0.00</LineItemAmountReceivedFact>\n" +
            // "<QuantityAccepted>0.00000</QuantityAccepted>\n" +
            // "<LineItemPriceAccepted>2.97</LineItemPriceAccepted>\n" +
            // "<LineItemAmountAcceptedWithoutCharges>0.00</LineItemAmountAcceptedWithoutCharges>\n" +
            // "<AmountAccepted>0.00</AmountAccepted>\n" +
            // "<QuantityNotAccepted>20.00000</QuantityNotAccepted>\n" +
            // "<LineItemPriceDeliveredNotAccepted>2.97</LineItemPriceDeliveredNotAccepted>\n" +
            // "<AmountReceivedDeliveredNotAcceptedWithoutCharges>59.40</AmountReceivedDeliveredNotAcceptedWithoutCharges>\n" +
            // "<AmountNotAccepted>65.34</AmountNotAccepted>" +

            "<QuantityReceivedShortage>" + item.quantityShortage + "</QuantityReceivedShortage>" +
            "<AmountReceivedShortageWithoutCharge>" + item.sumShortage + "</AmountReceivedSurplusWithoutCharge>" +

            "<QuantityReceivedSurplus>" + item.quantitySurplus + "</QuantityReceivedSurplus>" +
            "<AmountReceivedSurplusWithoutCharge>" + item.sumSurplus + "</AmountReceivedSurplusWithoutCharge>" +
            " </LineItem>";
    }


    async function createRecadv() {

        const parser = new XMLParser({
            alwaysCreateTextNode: true,
        });
        let result = parser.parse(generateXML());

        const builder = new XMLBuilder({format: true});
        const output = builder.build(result);


        const file = new Blob([output], {type: 'application/xml'});

        console.log(doc)
        try {
            setIsLoading(true);
            const response = await RecadvService.importRecadv(file);
            setModalMsg("Файл успешно создан!");
        } catch (e: unknown) {
            setModalMsg("Ошибка создание файла! Проверьте корректность полей и попробуйте еще раз.")
        } finally {
            setIsLoading(false);
            showModalNotif();
        }

    }

    async function agreeToCreate(){
        showModalSelect();
        await createRecadv();
    }

    function pressButAddItem() {
        setDoc({
            ...doc, items: [...doc.items, {
                id: nextId++,
                gtin: "",
                name: "",
                units: "",
                numberAndDate: "",
                quantityDefects: "",
                typeDefects: "",
                price: "",
                quantityTTN: "",
                quantityActual: "",
                quantityShortage: "",
                sumShortage: "",
                quantitySurplus: "",
                sumSurplus: "",
                productCode: "",
            }]
        })
    }

    function pressButRemoveItem() {
        setDoc({...doc, items: doc.items.filter(x => x.id !== nextId - 1)});
        nextId--;
    }


    function pressButCreate(){
        setModalMsg("Вы уверены что хотите создать документ?");
        showModalSelect();
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
            <div className="flex flex-row lg:min-h-screen">
                <div className="w-0 invisible lg:visible lg:w-44 py-2 border-r-2 bg-gray-50 justify-stretch">
                    <LeftNavigation/>
                </div>
                <div className="flex flex-col w-full">

                    {isOpenMenu &&
                        <div className="w-full visible lg:invisible text-xs py-2 border-r-2 bg-gray-50 justify-stretch">
                            <LeftNavigation/>
                        </div>
                    }

                    <div className="flex flex-row items-center w-full py-3 border-b-2 bg-gray-50">
                        <div className="inline-flex w-1/2">
                            <span className="font-bold px-5 text-xl">Создание акта расхождений</span>
                        </div>
                        <div className="inline-flex w-1/2 justify-end">

                            <button
                                className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 bg-blue-700 text-white hover:bg-blue-800"
                                onClick={() => pressButCreate()}>
                                <span>Сохранить</span>
                            </button>

                        </div>
                    </div>

                    <div className="px-10 py-5">
                        <div className="pb-2">
                            <span className="font-bold">Общая информация</span>
                            <div className="flex flex-wrap flex-row justify-start gap-x-5 gap-y-3">
                                <div className="flex flex-col">
                                    <span className={styleLabelInput}>Номер документа <span
                                        className="text-red-500 font-bold">*</span></span>
                                    <input
                                        className={styleInput + "w-52"}
                                        onChange={e => setDoc({...doc, nde: e.target.value})}
                                        value={doc?.nde || ''}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className={styleLabelInput}>Дата документа <span
                                        className="text-red-500 font-bold">*</span></span>
                                    <input
                                        className={styleInput + "w-52"}
                                        onChange={e => setDoc({...doc, date: e.target.value})}
                                        value={doc?.date || ''}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className={styleLabelInput}>GLN получателя <span
                                        className="text-red-500 font-bold">*</span></span>
                                    <input
                                        className={styleInput + "w-52"}
                                        onChange={e => setDoc({...doc, glnReceiver: e.target.value})}
                                        value={doc?.glnReceiver || ''}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className={styleLabelInput}>GLN отправителя <span
                                        className="text-red-500 font-bold">*</span></span>
                                    <input
                                        className={styleInput + "w-52"}
                                        onChange={e => setDoc({...doc, glnSender: e.target.value})}
                                        value={doc?.glnSender || ''}
                                    />
                                </div>
                            </div>
                        </div>


                        {doc.items.map((item, index) => <SingleForm key={index} items={doc.items} item={item}
                                                                    setItems={(e) => {
                                                                        setDoc({...doc, items: e})
                                                                    }}/>)}

                        <div className="py-2">
                            <button
                                className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 bg-blue-700 text-white hover:bg-blue-800"
                                onClick={pressButAddItem}>
                                Добавить позицию
                            </button>

                            {nextId > 2 &&
                                <button
                                    className="px-3 mr-3 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 bg-blue-700 text-white hover:bg-blue-800"
                                    onClick={pressButRemoveItem}>
                                    Удалить позицию
                                </button>
                            }

                        </div>
                    </div>


                </div>

            </div>

            {isModalNotify && <ModalNotify title={"Результат операции"} message={modalMsg} onClose={showModalNotif}/>}

            {isModalSelect && <ModalSelect title={"Создание документа"} message={modalMsg} onClose={showModalSelect} onAgreement={agreeToCreate}/>}
        </>
    )
}

export default observer(CreateRecadvPage)