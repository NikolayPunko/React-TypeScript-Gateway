import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ProductEditorJSON} from "./pages/ProductEditorJSON";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Authorization from "./pages/Authorization";
import OrdersPage from "./pages/OrdersPage";
import Order from "./pages/Order";
import PrivateRoute from "./components/PrivateRoute";
import PriceLists from "./pages/PriceListsPage";
import PriceListPage from "./pages/PriceListPage";


function App() {

    const {store} = useContext(Context);

    const [isCheckAuth, setIsCheckAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth().then(() => setIsCheckAuth(true));
        } else {
            setIsCheckAuth(true)
        }
    }, [])


    if (isCheckAuth) {
        return (
            <>
                <Routes>

                    <Route path="/" element={<PrivateRoute  />}>
                        <Route path="/" element={<OrdersPage/>}/>
                        <Route path="/:id" element={<Order/>} />
                        <Route path="/:id/edit" element={<ProductEditorJSON/>} />

                        <Route path="/price" element={<PriceLists/>} />
                        <Route path="/price/:id" element={<PriceListPage/>} />
                    </Route>


                    <Route path="/login" element={<Authorization/>}/>
                    <Route path="*" element={<h2>Ресурс не найден</h2>}/>
                </Routes>

            </>
        );
    } else {
        return <h1>Загрузка...</h1>
    }

}

export default observer(App);
