import React, {useContext, useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {arrowDown, arrowUp} from "../data/icons";


export function Navigation() {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const [dropdownSettings, setDropdownSettings] = useState<boolean>(false);


    const container = useRef<any>();

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setDropdownSettings(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown",  handleClickOutside);
    }, []);

    return (

        <nav className="h-[50px] flex justify-between bg-blue-800 item-center ">
            <div className="flex justify-between items-center">
                <div className="w-60  text-center">
                        <span className="font-medium text-lg text-white px-3">Сервис EDI</span>
                </div>
                <div className="flex flex-row text-sm font-medium w-full px-3 space-x-4 text-white">
                    <button disabled={false} onClick={() => navigate("/pricats")}>Документы</button>
                    <div>
                        <div className="flex flex-row items-center">
                            <button disabled={true}>Статистика</button>
                            <div className="pl-1 pt-1">
                                {arrowUp}
                            </div>
                        </div>
                    </div>

                    <div ref={container}>
                        <div className="flex flex-row items-center" >
                            <button disabled={false} onClick={() => setDropdownSettings(prev => !prev)}>Настройки</button>
                            <div className="pl-1 pt-1" onClick={() => setDropdownSettings(prev => !prev)}>
                                {dropdownSettings && arrowDown}
                                {!dropdownSettings && arrowUp}
                            </div>
                        </div>

                        {dropdownSettings &&
                            <div className="absolute z-50 text-xs py-3 mt-2 border-1 rounded shadow bg-white text-black">
                                <ul className="">
                                    <li className="px-3 py-1 hover:bg-gray-200 hover:text-white ">Моя организация</li>
                                    <li className="px-3 py-1 hover:bg-blue-700 hover:text-white " onClick={() => navigate("/settings/profile")}>Мой профиль</li>
                                    <li className="px-3 py-1 hover:bg-gray-200 hover:text-white ">Контрагенты</li>
                                    <li className="px-3 py-1 hover:bg-gray-200 hover:text-white ">Управление пользователями</li>
                                    <li className="px-3 py-1 hover:bg-gray-200 hover:text-white ">Уведомления</li>
                                </ul>
                            </div>
                        }
                    </div>

                </div>
            </div>

            <div className="flex w-auto justify-end items-center">
                <div className="flex flex-col m-4 text-white">
                    <span className="text-lg text-center">{store.user.username}</span>
                    {/*<span className="text-sm text-center"></span>*/}
                </div>

                <div>
                    {store.isAuth &&
                        <button className="mr-2 text-white my-2" onClick={()=>store.logout()}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="#ffffff"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"></path> </g> </g></svg>
                        </button>
                    }
                </div>

            </div>

        </nav>
    )
}