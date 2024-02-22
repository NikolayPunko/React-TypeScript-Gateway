import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ProductEditorJSON} from "./pages/ProductEditorJSON";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Authorization from "./pages/Authorization";
import OrdersPage from "./pages/OrdersPage";
import Order from "./pages/Order";
import PrivateRoute from "./components/PrivateRoute";
import PricatsPage from "./pages/PricatsPage";
import PricatPage from "./pages/PricatPage";
import ProfilePage from "./pages/settings/ProfilePage";
import RecadvsPage from "./pages/RecadvsPage";
import NotFound from "./pages/NotFound";



function App() {

    const {store} = useContext(Context);

    const [isCheckAuth, setIsCheckAuth] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
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
                        {/*<Route path="/" element={<OrdersPage/>}/>*/}
                        {/*<Route path="/:id" element={<Order/>} />*/}
                        {/*<Route path="/:id/edit" element={<ProductEditorJSON/>} />*/}

                        <Route path="/" element={<Authorization/>} />
                        <Route path="/pricats" element={<PricatsPage/>} />
                        <Route path="/pricats/:id" element={<PricatPage/>} />

                        <Route path="/recadvs" element={<RecadvsPage/>} />

                        <Route path="/settings/profile" element={<ProfilePage/>} />
                    </Route>


                    <Route path="/login" element={<Authorization/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>

            </>
        );
    } else {
        return <h1>Загрузка...</h1>
    }

}

export default observer(App);
