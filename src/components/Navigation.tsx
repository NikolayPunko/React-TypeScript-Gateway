import React, {useContext} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../index";


export function Navigation() {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    return (

        <nav className="h-[50px] flex justify-between bg-blue-800 item-center ">
            <div className="flex justify-between items-center">
                <div className="w-60  text-center">
                    <span className="font-bold text-xs text-white px-3">Сервис объединенных провайдеров</span>
                </div>
                <div className="text-sm font-bold w-full px-3 space-x-4 text-white">
                    <button disabled={true}>Документы</button>
                    <button disabled={true}>Статистика</button>
                    <button disabled={true}>Настройки</button>
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