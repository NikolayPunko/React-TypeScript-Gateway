import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {OrdersPage} from "./pages/OrdersPage";
import {Order} from "./pages/Order";
import {Authorization} from "./pages/Authorization";


function App() {
    return (
        <>

            <Routes>
                {/*<Route path="/" element={<OrdersPage/>}/>*/}
                <Route path="/" element={<OrdersPage/>}>
                    {/*<Route path=":id" element={<Order/>} />*/}
                </Route>
                <Route path="/:id" element={<Order/>}/>
                <Route path="/login" element={<Authorization/>}/>

                <Route path="*" element={<h2>Ресурс не найден</h2>} />



            </Routes>
        </>
    );
}

export default App;
