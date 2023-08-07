import React from 'react'
import {StringLeftNavigation} from "./StringLeftNavigation";

export function LeftNavigation() {
    return (
        <div className="flex flex-col w-full  ">
            <StringLeftNavigation title="Заказы"/>
            <StringLeftNavigation title="Уведомления об отгрузке"/>
            <StringLeftNavigation title="Электронные накладные"/>
            <StringLeftNavigation title="Электронные акты"/>
            <StringLeftNavigation title="Электронные документы"/>
        </div>
    )
}