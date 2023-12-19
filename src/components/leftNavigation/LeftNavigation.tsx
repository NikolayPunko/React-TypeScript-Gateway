import React from 'react'
import {StringLeftNavigation} from "./StringLeftNavigation";

export function LeftNavigation() {



    return (
        <div className="flex flex-col w-full  ">
            <StringLeftNavigation title="Прайс-листы" navigationPath={"/price"}/>
            <StringLeftNavigation title="Заказы" navigationPath={"/"}/>
            <StringLeftNavigation title="Уведомления об отгрузке" navigationPath={"/"}/>
            <StringLeftNavigation title="Электронные накладные" navigationPath={"/"}/>
            <StringLeftNavigation title="Электронные акты" navigationPath={"/"}/>
            <StringLeftNavigation title="Электронные документы" navigationPath={"/"}/>
        </div>
    )
}