import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {PricatsResponse} from "../../models/response/PricatsResponse";
import {ParseDateToFormatYYYY_MM_dd_HH_mm_ss} from "../../utils/ParseDate";
import {Context} from "../../index";
import {findLabelByGln} from "../../data/directory";


interface RowTableProps {
    pricat: PricatsResponse
    sendPricat: (pricat: PricatsResponse) => void
}
function PriceListTableRow(props: RowTableProps) {

    const navigate = useNavigate();
    const {store} = useContext(Context);

    function displaySubmit(){
        if(props.pricat.documentStatus == 'IMPORTED' && props.pricat.senderId === store.user.gln){
            return true;
        }
        return false;
    }

    function navigateToPricat(){
        navigate(`/pricats/${props.pricat.documentId}`);
    }

    return (
        <>
            <tr className="border-b table w-full h-auto table-fixed hover:bg-gray-100" >
                <td onClick={navigateToPricat} className="px-2" style={{width: '2%'}}>#</td>
                <td className="px-1 py-2 " style={{width: '2%'}}><input type="checkbox"/></td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '7%'}}>{props.pricat.documentId}</td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '10%'}}>{props.pricat.documentStatus}</td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '7%'}}>{ParseDateToFormatYYYY_MM_dd_HH_mm_ss(new Date(props.pricat.dateTime))}</td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '10%'}}>{props.pricat.documentNumber}</td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '8%'}}>{ParseDateToFormatYYYY_MM_dd_HH_mm_ss(new Date(props.pricat.documentDate))}</td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '10%'}}>{findLabelByGln(props.pricat.receiverId) + " "}<span className="text-gray-400">{props.pricat.receiverId}</span></td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '10%'}}>{findLabelByGln(props.pricat.senderId) + " " }<span className="text-gray-400">{props.pricat.senderId}</span></td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '7%'}}>{props.pricat.edi}</td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '8%'}}>{props.pricat.documentType}</td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '8%'}}>{ParseDateToFormatYYYY_MM_dd_HH_mm_ss(new Date(props.pricat.dateTimeInsert))}</td>
                <td onClick={navigateToPricat} className="text-xs" style={{width: '8%'}}>{ParseDateToFormatYYYY_MM_dd_HH_mm_ss(new Date(props.pricat.dateTimeUpdate))}</td>
                <td className="text-xs" style={{width: '3%'}} >
                    <button disabled={!displaySubmit()}
                        className="disabled:hidden"
                        onClick={() => props.sendPricat(props.pricat)}>
                        <svg width="34px" height="34px" viewBox="-10 -10 40.00 40.00" version="1.1" fill="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.36"></g><g id="SVGRepo_iconCarrier"> <title>send_round [#1569]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" strokeWidth="0.0002" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -959.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M15.732,809.137 L21.547,803.322 C21.859,803.01 22.393,803.222 22.406,803.663 L22.444,805.029 C22.46,805.581 22.92,806 23.472,806 L23.25,806 C23.802,806 24,805.524 24,804.972 L24,801 C24,799.9 23.1,799 22,799 L18.483,799 C17.93,799 17,799.425 17,799.977 L17,799.98 C17,800.532 17.647,800.994 18.199,801.009 L19.733,801.05 C20.174,801.061 20.387,801.595 20.076,801.907 L14.289,807.723 C13.899,808.113 13.913,808.746 14.304,809.137 C14.694,809.527 15.341,809.528 15.732,809.137 M24,812.011 L24,817.015 C24,818.117 23.55,819 22.448,819 L6.44,819 C5.338,819 4,818.117 4,817.015 L4,801.007 C4,799.904 5.338,799 6.44,799 L11.444,799 C11.996,799 12.444,799.448 12.444,800 C12.444,800.553 11.996,801 11.444,801 L7.444,801 C6.892,801 6,801.458 6,802.011 L6,815.015 C6,816.117 7.338,817 8.44,817 L21.444,817 C21.996,817 22,816.563 22,816.011 L22,812.011 C22,811.458 22.447,811.011 23,811.011 C23.552,811.011 24,811.458 24,812.011" id="send_round-[#1569]"> </path> </g> </g> </g> </g></svg>
                    </button>
                </td>

            </tr>
        </>
    )
}

export default observer(PriceListTableRow)