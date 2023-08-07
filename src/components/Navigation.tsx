import React from 'react'
import {Link} from "react-router-dom";

export function Navigation() {
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
                 <div>
                     <Link to="/login" className="mr-2 text-white">Авторизоваться</Link>
                 </div>
            </div>

        </nav>
    )
}