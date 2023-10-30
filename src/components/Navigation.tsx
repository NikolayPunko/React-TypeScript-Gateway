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
                    <button>Документы</button>
                    <button>Статистика</button>
                    <button>Настройки</button>
                </div>
            </div>

            <div className="flex w-auto justify-end items-center">
                <div className="flex flex-col m-4 text-white">
                    <span className="text-lg text-center">{store.user.username}</span>
                    <span className="text-sm text-center">{store.user.email}</span>
                </div>

                <div>
                    {store.isAuth && <button className="mr-2 text-white" onClick={()=>store.logout()}>Выйти</button>}
                    {/*{!store.isAuth &&  <Link to="/login" className="mr-2 text-white">Авторизоваться</Link>}*/}
                </div>

            </div>

        </nav>
    )
}