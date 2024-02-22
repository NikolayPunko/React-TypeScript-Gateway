import React from 'react'
import {StringLeftNavigation} from "./StringLeftNavigation";

export function LeftNavigation() {

    return (
        <div className="flex flex-col w-full">
            <StringLeftNavigation disabled={false} title="Прайс-листы" navigationPath={"/pricats"}/>
            <StringLeftNavigation disabled={false} title="Акты расхождений" navigationPath={"/recadvs"}/>

            {/*<StringLeftNavigation disabled={true} title="Уведомления об отгрузке" navigationPath={"/"}/>*/}
            {/*<StringLeftNavigation disabled={true} title="Электронные накладные" navigationPath={"/"}/>*/}
            {/*<StringLeftNavigation disabled={true} title="Электронные акты" navigationPath={"/"}/>*/}
            {/*<StringLeftNavigation disabled={true} title="Электронные документы" navigationPath={"/"}/>*/}
        </div>
    )
}